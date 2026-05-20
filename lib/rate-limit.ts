// Rate limiter in-memory dạng sliding window.
// Lưu ý: bộ đếm nằm trong RAM của từng instance serverless — sẽ reset khi
// cold-start và không chia sẻ giữa các instance. Đủ chặn spam ở quy mô phường;
// nếu cần chính xác tuyệt đối phải chuyển sang Redis (xem SECURITY.md).

const WINDOW_MS = 60_000;

const store = new Map<string, number[]>();
let lastSweep = Date.now();

function sweep(now: number) {
  for (const [ip, hits] of store) {
    const recent = hits.filter((t) => now - t < WINDOW_MS);
    if (recent.length === 0) store.delete(ip);
    else store.set(ip, recent);
  }
  lastSweep = now;
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

export function checkRateLimit(ip: string, limit = 5): boolean {
  const now = Date.now();
  if (now - lastSweep > WINDOW_MS) sweep(now);

  const recent = (store.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= limit) {
    store.set(ip, recent);
    return false;
  }
  recent.push(now);
  store.set(ip, recent);
  return true;
}
