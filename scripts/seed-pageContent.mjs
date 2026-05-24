// Run: node --env-file=.env.local scripts/seed-pageContent.mjs
import { createClient } from '@sanity/client'

if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.SANITY_API_TOKEN) {
  console.error('Missing required env vars')
  process.exit(1)
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

// Schema is a single singleton doc with 13 text fields (one per page).
const doc = {
  _id: 'pageContent',
  _type: 'pageContent',
  gioi_thieu:
    'Tìm hiểu về đơn vị, chức năng nhiệm vụ và ban lãnh đạo Công an phường Bình Dương.',
  tin_tuc:
    'Cập nhật tình hình an ninh trật tự và thông báo chính thức từ Công an phường Bình Dương.',
  van_ban_phap_luat:
    'Thư viện văn bản pháp luật — Nghị quyết, Quyết định, Kế hoạch, Thông tư đang có hiệu lực.',
  thu_tuc_hanh_chinh:
    'Hướng dẫn chi tiết các thủ tục thuộc thẩm quyền Công an phường — minh bạch, công khai, thực hiện trực tuyến.',
  hoi_dap:
    'Tổng hợp câu hỏi thường gặp và giải đáp của cán bộ Công an phường Bình Dương.',
  thu_vien_anh:
    'Album ảnh hoạt động và sự kiện của Công an phường Bình Dương.',
  video:
    'Video, phim tài liệu hoạt động của Công an phường Bình Dương.', // TODO: UPDATE WITH REAL DATA
  lich_tiep_cong_dan:
    'Lịch tiếp công dân định kỳ của Ban lãnh đạo và cán bộ Công an phường Bình Dương.',
  truy_na:
    'Danh sách các đối tượng đang bị truy nã theo thông báo của cơ quan điều tra.',
  nguoi_tot_viec_tot:
    'Vinh danh cán bộ, chiến sĩ và quần chúng nhân dân có thành tích xuất sắc trong phong trào Toàn dân bảo vệ an ninh Tổ quốc.',
  chinh_sach_phap_luat:
    'Dự thảo văn bản đang lấy ý kiến và chính sách pháp luật mới ban hành',
  search:
    'Tìm kiếm trong tin tức, thủ tục hành chính và văn bản pháp luật',
  so_do_trang:
    'Danh mục toàn bộ các trang trên cổng thông tin',
}

async function run() {
  const res = await client.createOrReplace(doc)
  const fields = [
    'gioi_thieu', 'tin_tuc', 'van_ban_phap_luat', 'thu_tuc_hanh_chinh',
    'hoi_dap', 'thu_vien_anh', 'video', 'lich_tiep_cong_dan', 'truy_na',
    'nguoi_tot_viec_tot', 'chinh_sach_phap_luat', 'search', 'so_do_trang',
  ]
  console.log('Seeded pageContent:')
  console.log('  _id:', res._id)
  console.log('  fields populated:', fields.filter((f) => res[f]).length, '/', fields.length)
  for (const f of fields) {
    console.log(`    ${f}: ${res[f] ? 'ok' : 'MISSING'}`)
  }
}

run().catch((err) => {
  console.error('Seed failed:', err.message)
  process.exit(1)
})
