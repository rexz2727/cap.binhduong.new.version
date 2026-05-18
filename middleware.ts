import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const user = process.env.STUDIO_BASIC_USER;
  const pass = process.env.STUDIO_BASIC_PASS;

  // Bỏ qua nếu chưa cấu hình env (môi trường dev local)
  if (!user || !pass) return NextResponse.next();

  const auth = req.headers.get("authorization");
  if (auth?.startsWith("Basic ")) {
    const decoded = Buffer.from(auth.slice(6), "base64").toString();
    const colon = decoded.indexOf(":");
    if (colon !== -1 && decoded.slice(0, colon) === user && decoded.slice(colon + 1) === pass) {
      return NextResponse.next();
    }
  }

  return new NextResponse("Unauthorized", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Sanity Studio"' },
  });
}

export const config = {
  matcher: ["/studio/:path*"],
};
