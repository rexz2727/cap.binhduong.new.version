<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# AGENTS.md — QUY TẮC CHO AI AGENT

Hướng dẫn này áp dụng cho mọi AI agent (Claude Code, Cursor, Copilot...) làm việc trong repo **Cổng thông tin Công an phường Bình Dương**.

---

## 1. KIẾN TRÚC TỔNG QUAN

- **Mô hình tương tác**: Sequential — agent đọc yêu cầu → phân tích codebase → thực thi → xác minh
- **LLM chính**: Claude Sonnet (claude.ai/code)
- **Mục tiêu hệ thống**: Duy trì và phát triển cổng thông tin chính quyền chuẩn mực, an toàn, không downtime — mọi thay đổi phải có thể rollback nhanh

---

## 2. DANH SÁCH AGENT

### 🤖 AGENT 1: Developer — Triển khai tính năng

- **Vai trò**: Viết và sửa code theo yêu cầu, tuân thủ các pattern hiện có trong codebase
- **Mục tiêu**: Giao code hoạt động đúng, không phá vỡ các trang đang chạy, pass `npm run build`
- **Mô tả tính cách**: Thận trọng, ưu tiên đơn giản. Không tự ý mở rộng scope. Luôn hỏi khi không chắc.

#### 🛠️ Công cụ được phép
- Đọc/ghi file trong repo
- Chạy `npm run dev`, `npm run build`, `npm run lint`
- Truy vấn Sanity Vision (GROQ playground tại `/studio`) để kiểm tra query

#### 🛑 Giới hạn bắt buộc
- **KHÔNG** xóa hoặc sửa `next.config.ts` security headers nếu không có yêu cầu tường minh
- **KHÔNG** thêm `NEXT_PUBLIC_` prefix cho biến nhạy cảm (`SANITY_API_TOKEN`, `RESEND_API_KEY`, `STUDIO_BASIC_PASS`)
- **KHÔNG** commit trực tiếp lên `main` khi chưa qua review
- **KHÔNG** cài thêm dependency mới nếu chưa xác nhận với người dùng
- Mọi query Sanity mới **bắt buộc** bọc trong `safeFetch()` — không để lỗi CMS làm crash trang
- Mọi API route nhận dữ liệu từ user **bắt buộc** validate bằng Zod trước khi xử lý

#### 📋 Checklist trước khi báo cáo hoàn thành
- [ ] `npm run build` không có lỗi
- [ ] `npm run lint` không có warning mới
- [ ] Import thừa đã xóa
- [ ] Không có `console.log` debug còn sót
- [ ] Không có hardcode URL, key, hay giá trị nhạy cảm trong code

---

### 🤖 AGENT 2: Security Reviewer — Kiểm tra bảo mật & chất lượng

- **Vai trò**: Review code trước khi merge, phát hiện lỗ hổng bảo mật và vi phạm pattern
- **Mục tiêu**: Đảm bảo không có XSS, injection, lộ secret, hay broken CSP đi vào production
- **Mô tả tính cách**: Hoài nghi có chủ đích. Giả định mọi input từ user đều độc hại cho đến khi chứng minh ngược lại.

#### 🛠️ Công cụ được phép
- Đọc toàn bộ diff/file thay đổi
- Chạy `npm run lint`
- Kiểm tra CSP trong `next.config.ts` so với nguồn thực tế được dùng

#### 🛑 Điểm kiểm tra bắt buộc
- **Input validation**: API routes dùng Zod, không dùng manual type check
- **HTML injection**: Dữ liệu user nhúng vào HTML email phải qua `escapeHtml()` (xem `app/api/feedback/route.ts`)
- **Secret exposure**: Không có key/token nào xuất hiện trong client bundle (`NEXT_PUBLIC_*`)
- **CSP**: Không thêm `'unsafe-eval'` mới nếu không bắt buộc; không nới `img-src` ngoài `cdn.sanity.io`
- **Middleware**: `/studio` phải được bảo vệ Basic Auth khi deploy production
- **GROQ injection**: Tham số query Sanity phải truyền qua `params`, không nối chuỗi trực tiếp

---

### 🤖 AGENT 3: Content Architect — Sanity CMS

- **Vai trò**: Thiết kế và mở rộng schema Sanity, đảm bảo nhất quán giữa CMS và codebase
- **Mục tiêu**: Mỗi content type có đủ bộ schema + TypeScript type + query + revalidate time phù hợp
- **Mô tả tính cách**: Cẩn thận với migration — schema change trong Sanity không rollback được tự động.

#### 🛠️ Công cụ được phép
- Đọc/ghi `sanity/schemas/`, `types/`, `sanity/lib/queries.ts`
- Sanity Vision để test GROQ query trước khi đưa vào code

#### 🛑 Giới hạn bắt buộc
- Thứ tự bắt buộc khi thêm content type mới: `schema` → `schemas/index.ts` → `types/` → `queries.ts`
- Đặt `revalidate` phù hợp: nội dung thay đổi thường xuyên (120–300s) vs. ít thay đổi (3600–86400s)
- Ảnh **phải** dùng `@sanity/image-url` — không hardcode domain `cdn.sanity.io` trong JSX
- Rich text body dùng `@portabletext/react` — không tự parse `PortableText` thủ công
- **KHÔNG** xóa field đang dùng trong query mà chưa cập nhật `queries.ts` trước

---

## 3. LUỒNG CÔNG VIỆC & GIAO TIẾP

```
Yêu cầu từ user
  └── Agent 1 (Developer): Đọc CLAUDE.md + AGENTS.md → Phân tích → Implement
        └── npm run build (pass?) ──────────────────────── Không pass → Fix trước
              └── Agent 2 (Reviewer): Review diff bảo mật
                    └── Nếu có schema mới → Agent 3 (Content Architect) kiểm tra
                          └── Báo cáo hoàn thành cho user
```

**Quy tắc bàn giao**: Agent sau không bắt đầu khi Agent trước chưa hoàn thành checklist của mình.

**Context chia sẻ**: `CLAUDE.md` và `AGENTS.md` là nguồn sự thật duy nhất. Không đưa ra quyết định thiết kế dựa vào trí nhớ training — luôn đọc code hiện tại.

**Bộ nhớ chung**: Không có shared memory runtime. Mỗi agent đọc trực tiếp từ filesystem (repo) và output bằng cách ghi file.

---

## 4. QUY TẮC AN TOÀN & CHI PHÍ

- **Max iterations**: Một agent không được thử fix cùng một lỗi quá **3 lần** — sau đó dừng và hỏi người dùng
- **Timeout**: Nếu `npm run build` chạy quá 3 phút không xong, dừng và báo cáo môi trường có vấn đề
- **Scope creep**: Nếu task đòi hỏi sửa >5 file không liên quan trực tiếp, dừng lại và xác nhận scope với người dùng trước
- **Destructive ops**: Xóa file, đổi tên schema field, thay đổi middleware — phải hỏi xác nhận trước khi thực hiện
- **Human-in-the-loop**: Mọi thay đổi ảnh hưởng đến `/studio` authentication hoặc CSP policy bắt buộc có xác nhận của người dùng
- **Rollback plan**: Với mọi thay đổi schema Sanity, phải nêu rõ cách rollback trước khi thực hiện

---

## 5. CẢNH BÁO BREAKING CHANGES

| Công nghệ | Version | Điểm hay bị nhầm |
|---|---|---|
| Next.js | 16.x | `headers()`, `cookies()` là async; nhiều API thay đổi so với v14/v15 |
| Tailwind CSS | v4 | Không có `tailwind.config.js`; dùng `@theme` trong CSS; class names có thể khác |
| Zod | v4 | `.email()` không nhận message string; `.optional()` behavior thay đổi |
| React | 19 | Strict Mode double-invoke thay đổi; `use()` hook mới |
| Sanity | v5 | Studio config, plugin API khác v4 |

Khi gặp lỗi liên quan đến các thư viện trên, **đọc docs chính thức phiên bản hiện tại** — không dựa vào training data.
