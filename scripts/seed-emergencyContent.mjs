// Run: node --env-file=.env.local scripts/seed-emergencyContent.mjs
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
  _id: 'emergencyContent',
  _type: 'emergencyContent',
  title: 'Trường hợp khẩn cấp gọi ngay',
  emergencyNumbers: [
    {
      _key: 'num-113',
      number: '113',
      label: 'Cảnh sát',
      href: 'tel:113',
    },
    {
      _key: 'num-114',
      number: '114',
      label: 'Cứu hỏa',
      href: 'tel:114',
    },
    {
      _key: 'num-115',
      number: '115',
      label: 'Cấp cứu y tế',
      href: 'tel:115',
    },
  ],
  externalLinks: [
    {
      _key: 'link-dvc',
      label: 'Cổng dịch vụ công Quốc gia',
      href: 'https://dichvucong.gov.vn',
    },
  ],
}

async function run() {
  const res = await client.createOrReplace(doc)
  console.log('Seeded emergencyContent:')
  console.log('  _id:', res._id)
  console.log('  title:', res.title)
  console.log('  emergencyNumbers:', res.emergencyNumbers?.length, 'items')
  console.log('  externalLinks:', res.externalLinks?.length, 'items')
}

run().catch((err) => {
  console.error('Seed failed:', err.message)
  process.exit(1)
})
