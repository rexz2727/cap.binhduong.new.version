# KẾ HOẠCH XÂY DỰNG CỔNG THÔNG TIN ĐIỆN TỬ
## Công an phường Bình Dương

**Ngày lập:** 18/05/2026
**Người thực hiện:** Rex Nguyen
**Mục tiêu hoàn thành:** Quý III/2026

---

## I. MỤC TIÊU DỰ ÁN

Xây dựng cổng thông tin điện tử chính thức cho Công an phường Bình Dương nhằm:
- Công khai minh bạch thông tin, thủ tục hành chính cho người dân
- Tiếp nhận phản ánh, kiến nghị trực tuyến 24/7
- Đăng tải tin tức, văn bản pháp luật kịp thời
- Hỗ trợ tra cứu thủ tục hành chính trực tuyến
- Xây dựng kênh tương tác hiện đại giữa đơn vị và nhân dân

---

## II. CÔNG NGHỆ SỬ DỤNG

| Hạng mục | Công nghệ | Ghi chú |
|---|---|---|
| Nền tảng web | Next.js 16 | Chuẩn quốc tế, tốc độ cao |
| Giao diện | React 19, Tailwind CSS v4 | Responsive, tương thích mọi thiết bị |
| Hệ thống quản trị nội dung | Sanity v5 | Dễ dùng, không cần kỹ thuật |
| Gửi email thông báo | Resend | Tin cậy, có log |
| Hosting | Vercel | Miễn phí, uptime 99.9%, CDN toàn cầu |
| Bảo mật | Security headers, Basic Auth | Theo chuẩn OWASP |

---

## III. PHẠM VI CHỨC NĂNG

### Giai đoạn 1 — Nền tảng cốt lõi (ĐÃ HOÀN THÀNH)
1. Trang chủ với thông tin tổng quan
2. Giới thiệu đơn vị, lãnh đạo
3. Tin tức — đăng, tìm kiếm, lọc danh mục
4. Văn bản pháp luật — tra cứu, tải về
5. Thủ tục hành chính — hướng dẫn chi tiết
6. Form phản ánh trực tuyến (gửi qua email)
7. Bảo mật: Basic Auth bảo vệ khu vực quản trị
8. Tối ưu tốc độ: CDN, font tối ưu, loading skeleton

### Giai đoạn 2 — Mở rộng tính năng (ĐANG THỰC HIỆN)
9. Thư viện ảnh — album theo sự kiện
10. Thư viện video — YouTube tích hợp
11. Hỏi đáp trực tuyến — người dân gửi câu hỏi, cán bộ trả lời
12. Chính sách pháp luật — văn bản dự thảo, góp ý
13. Lịch tiếp công dân — theo tháng
14. Trang truy nã — thông tin đối tượng cần truy tìm
15. Sơ đồ trang — tra cứu nhanh toàn bộ nội dung

---

## IV. PHÂN CÔNG THỰC HIỆN

### Đơn vị cần chuẩn bị (không cần kỹ thuật)

| Mã | Nội dung | Ghi chú |
|---|---|---|
| A1 | Tạo tài khoản Sanity (hệ thống quản trị nội dung) | Miễn phí tại sanity.io |
| A2 | Tạo tài khoản Resend (dịch vụ gửi email) | Miễn phí tại resend.com |
| A3 | Nhập nội dung mẫu: tin tức, văn bản, cán bộ, thủ tục | Sau khi có A1 |
| A4 | Cung cấp logo đơn vị chính thức (file PNG hoặc SVG) | — |
| A5 | Xác nhận địa chỉ, số điện thoại, email chính xác | — |
| A6 | Phê duyệt để đưa lên môi trường thật | Sau khi có A1–A5 |

### Lập trình viên thực hiện

| Mã | Nội dung | Trạng thái |
|---|---|---|
| B1 | Bảo mật khu vực quản trị /studio | ✅ Hoàn thành |
| B2 | Nâng cấp 3 cấu trúc dữ liệu hiện có | ✅ Hoàn thành |
| B3 | Xây dựng 7 cấu trúc dữ liệu mới | ✅ Hoàn thành |
| B4 | Định nghĩa kiểu dữ liệu tương ứng | ✅ Hoàn thành |
| B5 | Viết câu truy vấn dữ liệu | 🔄 Một phần |
| B6–B13 | Giao diện, trang, API Giai đoạn 2 | ⏳ Chờ thực hiện |

---

## V. TIẾN ĐỘ ĐỀ XUẤT

```
Tuần 1–2:  Hoàn thiện câu truy vấn + cài thư viện + components mới
Tuần 3–4:  Cập nhật giao diện + xây dựng 9 trang Giai đoạn 2
Tuần 5:    Tích hợp API + hoàn thiện trang chủ + menu
Tuần 6:    Kiểm thử tổng thể + deploy chính thức

Song song: Đơn vị chuẩn bị A1 → A2 → A3 → A4 → A5 → A6
```

---

## VI. CHI PHÍ HẠ TẦNG ĐỀ XUẤT

| Dịch vụ | Gói | Chi phí |
|---|---|---|
| Sanity CMS | Free (đủ cho quy mô phường) | 0 đ/tháng |
| Resend email | Free (100 email/ngày) | 0 đ/tháng |
| Vercel hosting | Free (1 project) | 0 đ/tháng |
| Tên miền (tùy chọn) | .vn hoặc .gov.vn | ~300.000 đ/năm |

---

*Tài liệu kế hoạch — Cổng thông tin Công an phường Bình Dương — Cập nhật 18/05/2026*
