// Run: node --env-file=.env.local scripts/seed-feedbackProcess.mjs
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

const doc = {
  _id: 'feedbackProcess',
  _type: 'feedbackProcess',
  pageDescription:
    'Gửi tin báo tội phạm, kiến nghị, phản ánh đến Công an phường Bình Dương. Mọi thông tin được bảo mật theo Luật Tố cáo 2018.',
  warningNotice:
    'Đây là kênh tiếp nhận thông tin phi khẩn cấp. Trong trường hợp nguy hiểm tính mạng hoặc đang xảy ra tội phạm, hãy gọi ngay 113.',
  emergencyDesc:
    'Gọi ngay khi có sự việc đang xảy ra hoặc cần can thiệp trực tiếp.',
  processSteps: [
    {
      _key: 'step-1',
      title: 'Tiếp nhận',
      body: 'Ngay khi gửi, hệ thống cấp mã hồ sơ. Trong 4 giờ làm việc cán bộ trực sẽ xem xét.',
    },
    {
      _key: 'step-2',
      title: 'Phân loại',
      body: 'Hồ sơ được chuyển đến bộ phận nghiệp vụ phù hợp xử lý theo thẩm quyền.',
    },
    {
      _key: 'step-3',
      title: 'Phản hồi',
      body: 'Trong 24 giờ làm việc, người phản ánh sẽ nhận tin nhắn/email phản hồi tiến độ.',
    },
    {
      _key: 'step-4',
      title: 'Xử lý',
      body: 'Lực lượng chức năng kiểm tra, xác minh và xử lý theo đúng quy định pháp luật.',
    },
  ],
}

async function run() {
  const res = await client.createOrReplace(doc)
  console.log('Seeded feedbackProcess:')
  console.log('  _id:', res._id)
  console.log('  pageDescription:', res.pageDescription?.slice(0, 60) + '...')
  console.log('  warningNotice:', res.warningNotice?.slice(0, 60) + '...')
  console.log('  emergencyDesc:', res.emergencyDesc?.slice(0, 60) + '...')
  console.log('  processSteps:', res.processSteps?.length, 'items')
}

run().catch((err) => {
  console.error('Seed failed:', err.message)
  process.exit(1)
})
