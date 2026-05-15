# Website Công an Phường Bình Dương — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Xây dựng hoàn chỉnh cổng thông tin công khai cho Công an phường Bình Dương gồm trang chủ, tin tức, văn bản pháp luật, thủ tục hành chính, giới thiệu đơn vị, form phản ánh trực tuyến và Admin Studio cho cán bộ quản lý nội dung.

**Architecture:** Next.js 14 App Router với Sanity.io làm Headless CMS, toàn bộ nội dung động lấy qua GROQ queries, không có SQL database. Form phản ánh người dân xử lý qua Serverless API Route và chuyển tiếp email bằng Resend API. Deploy tự động lên Vercel khi push lên `main`.

**Tech Stack:** Next.js 14+, TypeScript, Tailwind CSS, Sanity.io v3, Resend API, Vercel

---

## Bản đồ File

```
/ (root)
├── package.json                          [CREATE] — dependencies & scripts
├── next.config.ts                        [CREATE] — Next.js config + Sanity image domains
├── tailwind.config.ts                    [CREATE] — theme, colors nhận diện Công an nhân dân
├── tsconfig.json                         [CREATE] — TypeScript config
├── .env.local.example                    [CREATE] — template biến môi trường
├── .gitignore                            [CREATE]
│
├── types/
│   ├── sanity.ts                         [CREATE] — SanityImage, SanitySlug types
│   ├── news.ts                           [CREATE] — NewsPost type
│   ├── legalDocument.ts                  [CREATE] — LegalDocument type
│   ├── personnel.ts                      [CREATE] — Personnel type
│   └── procedure.ts                      [CREATE] — Procedure type
│
├── constants/
│   ├── site.ts                           [CREATE] — tên đơn vị, địa chỉ, metadata mặc định
│   └── nav.ts                            [CREATE] — cấu trúc menu navigation
│
├── sanity/
│   ├── sanity.config.ts                  [CREATE] — Sanity Studio config
│   ├── schemas/
│   │   ├── index.ts                      [CREATE] — export tất cả schemas
│   │   ├── news.ts                       [CREATE] — schema tin tức
│   │   ├── legalDocument.ts              [CREATE] — schema văn bản pháp luật
│   │   ├── personnel.ts                  [CREATE] — schema cán bộ
│   │   └── procedure.ts                  [CREATE] — schema thủ tục hành chính
│   └── lib/
│       ├── client.ts                     [CREATE] — Sanity client (read + write)
│       └── queries.ts                    [CREATE] — tất cả GROQ queries
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx                    [CREATE] — navbar responsive
│   │   ├── Footer.tsx                    [CREATE] — footer với thông tin đơn vị
│   │   └── MobileMenu.tsx                [CREATE] — menu mobile drawer
│   ├── ui/
│   │   ├── NewsCard.tsx                  [CREATE] — card hiển thị tin tức
│   │   ├── LegalDocCard.tsx              [CREATE] — card văn bản pháp luật
│   │   ├── Badge.tsx                     [CREATE] — tag/label tái sử dụng
│   │   ├── Button.tsx                    [CREATE] — button tái sử dụng
│   │   └── PageHeader.tsx                [CREATE] — tiêu đề trang với breadcrumb
│   └── sections/
│       ├── HeroSection.tsx               [CREATE] — banner trang chủ
│       ├── LatestNews.tsx                [CREATE] — section tin tức mới nhất
│       ├── QuickLinks.tsx                [CREATE] — section liên kết nhanh
│       └── ContactInfo.tsx               [CREATE] — section thông tin liên hệ
│
├── app/
│   ├── layout.tsx                        [CREATE] — root layout (font, metadata mặc định)
│   ├── (web)/
│   │   ├── layout.tsx                    [CREATE] — layout công khai (Header + Footer)
│   │   ├── page.tsx                      [CREATE] — trang chủ
│   │   ├── tin-tuc/
│   │   │   ├── page.tsx                  [CREATE] — danh sách tin tức
│   │   │   └── [slug]/page.tsx           [CREATE] — chi tiết bài viết
│   │   ├── van-ban-phap-luat/
│   │   │   ├── page.tsx                  [CREATE] — danh sách văn bản
│   │   │   └── [slug]/page.tsx           [CREATE] — chi tiết văn bản
│   │   ├── thu-tuc-hanh-chinh/
│   │   │   └── page.tsx                  [CREATE] — danh sách thủ tục
│   │   ├── gioi-thieu/
│   │   │   └── page.tsx                  [CREATE] — giới thiệu đơn vị + lãnh đạo
│   │   └── phan-anh/
│   │       └── page.tsx                  [CREATE] — form phản ánh trực tuyến
│   ├── (admin)/
│   │   └── studio/
│   │       └── [[...tool]]/page.tsx      [CREATE] — Sanity Studio embedded
│   └── api/
│       └── feedback/
│           └── route.ts                  [CREATE] — nhận form → validate → Resend email
│
└── public/
    └── logo/
        └── .gitkeep                      [CREATE] — placeholder cho logo
```

---

## Task 1: Khởi tạo Dự án Next.js + Sanity

**Files:**
- Create: `package.json`
- Create: `next.config.ts`
- Create: `tsconfig.json`
- Create: `.gitignore`
- Create: `.env.local.example`

- [ ] **Bước 1.1: Khởi tạo Next.js project**

```bash
npx create-next-app@latest . \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --no-src-dir \
  --import-alias "@/*"
```

Khi được hỏi:
- Would you like to use Turbopack? → **No** (Sanity Studio chưa ổn định với Turbopack)

- [ ] **Bước 1.2: Cài thêm dependencies**

```bash
npm install \
  @sanity/vision \
  next-sanity \
  sanity \
  @portabletext/react \
  @sanity/image-url \
  resend \
  zod
```

```bash
npm install -D @types/node
```

- [ ] **Bước 1.3: Cập nhật `next.config.ts`**

```typescript
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;
```

- [ ] **Bước 1.4: Tạo `.env.local.example`**

```bash
# .env.local.example
NEXT_PUBLIC_SANITY_PROJECT_ID="your_project_id_here"
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_API_VERSION="2024-01-01"
SANITY_API_READ_TOKEN="your_read_token_here"
RESEND_API_KEY="re_your_key_here"
CONTACT_EMAIL="cong-an-phuong-binh-duong@mail.gov.vn"
```

- [ ] **Bước 1.5: Tạo `.env.local` thực tế** (KHÔNG commit file này)

Sao chép từ `.env.local.example` và điền giá trị thật từ dashboard Sanity và Resend.

- [ ] **Bước 1.6: Kiểm tra dev server khởi động**

```bash
npm run dev
```

Mở `http://localhost:3000` — phải thấy trang Next.js mặc định không lỗi.

- [ ] **Bước 1.7: Commit**

```bash
git init
git add package.json next.config.ts tsconfig.json .gitignore .env.local.example
git commit -m "chore: init Next.js 14 project with TypeScript, Tailwind, Sanity deps"
```

---

## Task 2: Thiết lập Tailwind Theme (Nhận diện Công an nhân dân)

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `app/globals.css`

- [ ] **Bước 2.1: Cập nhật `tailwind.config.ts` với color palette**

Màu chủ đạo: đỏ (Công an nhân dân), vàng sao, xanh navy.

```typescript
// tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        police: {
          red: "#C8102E",       // đỏ Công an nhân dân
          "red-dark": "#A00D25",
          gold: "#FFD700",      // vàng sao
          navy: "#003087",      // xanh navy
          "navy-dark": "#001F5C",
        },
      },
      fontFamily: {
        sans: ["Be Vietnam Pro", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
```

- [ ] **Bước 2.2: Cập nhật `app/globals.css`**

```css
/* app/globals.css */
@import url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply text-gray-800 bg-white;
  }
  h1, h2, h3, h4 {
    @apply font-semibold;
  }
}
```

- [ ] **Bước 2.3: Kiểm tra màu hoạt động**

```bash
npm run dev
```

Thêm tạm thời `<div className="bg-police-red text-white p-4">Test</div>` vào `app/page.tsx`, mở browser, xác nhận màu đỏ hiển thị đúng, rồi xóa đi.

- [ ] **Bước 2.4: Commit**

```bash
git add tailwind.config.ts app/globals.css
git commit -m "style: add police brand colors and typography to Tailwind theme"
```

---

## Task 3: Cấu hình Sanity Studio

**Files:**
- Create: `sanity/sanity.config.ts`
- Create: `sanity/schemas/index.ts`
- Create: `sanity/lib/client.ts`
- Create: `app/(admin)/studio/[[...tool]]/page.tsx`

- [ ] **Bước 3.1: Khởi tạo Sanity project trên cloud** (nếu chưa có)

Truy cập `https://sanity.io/manage` → tạo project mới → đặt tên "cong-an-binh-duong" → chọn dataset "production". Lưu lại `projectId`.

- [ ] **Bước 3.2: Tạo `sanity/lib/client.ts`**

```typescript
// sanity/lib/client.ts
import { createClient } from "next-sanity";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-01-01",
  useCdn: process.env.NODE_ENV === "production",
  token: process.env.SANITY_API_READ_TOKEN,
});
```

- [ ] **Bước 3.3: Tạo `sanity/schemas/index.ts` (placeholder)**

```typescript
// sanity/schemas/index.ts
import type { SchemaTypeDefinition } from "sanity";

// Schemas sẽ được import vào đây ở các Task tiếp theo
export const schemaTypes: SchemaTypeDefinition[] = [];
```

- [ ] **Bước 3.4: Tạo `sanity/sanity.config.ts`**

```typescript
// sanity/sanity.config.ts
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";

export default defineConfig({
  name: "cong-an-binh-duong",
  title: "Công an phường Bình Dương",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
  basePath: "/studio",
});
```

- [ ] **Bước 3.5: Tạo `app/(admin)/studio/[[...tool]]/page.tsx`**

```typescript
// app/(admin)/studio/[[...tool]]/page.tsx
"use client";

import { NextStudio } from "next-sanity/studio";
import config from "@/sanity/sanity.config";

export const dynamic = "force-dynamic";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
```

- [ ] **Bước 3.6: Kiểm tra Studio**

```bash
npm run dev
```

Mở `http://localhost:3000/studio` — phải thấy Sanity Studio không lỗi.

- [ ] **Bước 3.7: Commit**

```bash
git add sanity/ app/\(admin\)/
git commit -m "feat: add embedded Sanity Studio at /studio"
```

---

## Task 4: TypeScript Types + Constants

**Files:**
- Create: `types/sanity.ts`
- Create: `types/news.ts`
- Create: `types/legalDocument.ts`
- Create: `types/personnel.ts`
- Create: `types/procedure.ts`
- Create: `constants/site.ts`
- Create: `constants/nav.ts`

- [ ] **Bước 4.1: Tạo `types/sanity.ts`**

```typescript
// types/sanity.ts
export interface SanitySlug {
  current: string;
}

export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
}
```

- [ ] **Bước 4.2: Tạo `types/news.ts`**

```typescript
// types/news.ts
import type { PortableTextBlock } from "@portabletext/types";
import type { SanityImage, SanitySlug } from "./sanity";

export interface NewsPost {
  _id: string;
  _createdAt: string;
  title: string;
  slug: SanitySlug;
  publishedAt: string;
  excerpt: string;
  mainImage?: SanityImage;
  category: "tin-tuc" | "thong-bao" | "canh-bao";
  body: PortableTextBlock[];
}

export type NewsPostPreview = Pick<
  NewsPost,
  "_id" | "title" | "slug" | "publishedAt" | "excerpt" | "mainImage" | "category"
>;
```

- [ ] **Bước 4.3: Tạo `types/legalDocument.ts`**

```typescript
// types/legalDocument.ts
import type { SanitySlug } from "./sanity";

export interface LegalDocument {
  _id: string;
  title: string;
  slug: SanitySlug;
  documentNumber: string;
  issuedDate: string;
  issuingBody: string;
  category: "nghi-quyet" | "ke-hoach" | "quyet-dinh" | "thong-tu" | "khac";
  summary: string;
  fileUrl?: string;
}

export type LegalDocumentPreview = Pick<
  LegalDocument,
  "_id" | "title" | "slug" | "documentNumber" | "issuedDate" | "category" | "issuingBody"
>;
```

- [ ] **Bước 4.4: Tạo `types/personnel.ts`**

```typescript
// types/personnel.ts
import type { SanityImage } from "./sanity";

export interface Personnel {
  _id: string;
  fullName: string;
  rank: string;
  position: string;
  unit: string;
  photo?: SanityImage;
  order: number;
}
```

- [ ] **Bước 4.5: Tạo `types/procedure.ts`**

```typescript
// types/procedure.ts
import type { PortableTextBlock } from "@portabletext/types";
import type { SanitySlug } from "./sanity";

export interface Procedure {
  _id: string;
  title: string;
  slug: SanitySlug;
  category: "cu-tru" | "cmnd-cccd" | "xe-co" | "khac";
  processingTime: string;
  fee: string;
  requirements: PortableTextBlock[];
  steps: PortableTextBlock[];
}
```

- [ ] **Bước 4.6: Tạo `constants/site.ts`**

```typescript
// constants/site.ts
export const SITE = {
  name: "Công an phường Bình Dương",
  shortName: "CA Phường Bình Dương",
  address: "Phường Bình Dương, tỉnh Bình Dương",
  phone: "0274 xxx xxxx",
  email: "cong-an-phuong-binh-duong@mail.gov.vn",
  hotline: "113",
  workingHours: "Thứ Hai – Thứ Sáu: 7:00 – 11:30, 13:30 – 17:00",
  description:
    "Cổng thông tin chính thống của Công an phường Bình Dương — phục vụ nhân dân, đảm bảo an ninh trật tự.",
  url: "https://cong-an-binh-duong.vercel.app",
} as const;
```

- [ ] **Bước 4.7: Tạo `constants/nav.ts`**

```typescript
// constants/nav.ts
export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Trang chủ", href: "/" },
  { label: "Giới thiệu", href: "/gioi-thieu" },
  {
    label: "Tin tức",
    href: "/tin-tuc",
    children: [
      { label: "Tất cả tin tức", href: "/tin-tuc" },
      { label: "Thông báo", href: "/tin-tuc?category=thong-bao" },
      { label: "Cảnh báo", href: "/tin-tuc?category=canh-bao" },
    ],
  },
  { label: "Văn bản pháp luật", href: "/van-ban-phap-luat" },
  { label: "Thủ tục hành chính", href: "/thu-tuc-hanh-chinh" },
  { label: "Phản ánh", href: "/phan-anh" },
];
```

- [ ] **Bước 4.8: Commit**

```bash
git add types/ constants/
git commit -m "feat: add TypeScript types for all Sanity content types and site constants"
```

---

## Task 5: Sanity Content Schemas

**Files:**
- Create: `sanity/schemas/news.ts`
- Create: `sanity/schemas/legalDocument.ts`
- Create: `sanity/schemas/personnel.ts`
- Create: `sanity/schemas/procedure.ts`
- Modify: `sanity/schemas/index.ts`

- [ ] **Bước 5.1: Tạo `sanity/schemas/news.ts`**

```typescript
// sanity/schemas/news.ts
import { defineField, defineType } from "sanity";

export const newsSchema = defineType({
  name: "newsPost",
  title: "Tin tức",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Tiêu đề",
      type: "string",
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: "slug",
      title: "Đường dẫn (slug)",
      type: "slug",
      options: { source: "title", maxLength: 100 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Ngày đăng",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Phân loại",
      type: "string",
      options: {
        list: [
          { title: "Tin tức", value: "tin-tuc" },
          { title: "Thông báo", value: "thong-bao" },
          { title: "Cảnh báo", value: "canh-bao" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Tóm tắt",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(300),
    }),
    defineField({
      name: "mainImage",
      title: "Ảnh đại diện",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Mô tả ảnh (alt text)",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "body",
      title: "Nội dung",
      type: "array",
      of: [{ type: "block" }, { type: "image" }],
    }),
  ],
  orderings: [
    {
      title: "Mới nhất",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "publishedAt", media: "mainImage" },
  },
});
```

- [ ] **Bước 5.2: Tạo `sanity/schemas/legalDocument.ts`**

```typescript
// sanity/schemas/legalDocument.ts
import { defineField, defineType } from "sanity";

export const legalDocumentSchema = defineType({
  name: "legalDocument",
  title: "Văn bản pháp luật",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Tên văn bản",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Đường dẫn",
      type: "slug",
      options: { source: "title", maxLength: 120 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "documentNumber",
      title: "Số hiệu văn bản",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "issuedDate",
      title: "Ngày ban hành",
      type: "date",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "issuingBody",
      title: "Cơ quan ban hành",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Loại văn bản",
      type: "string",
      options: {
        list: [
          { title: "Nghị quyết", value: "nghi-quyet" },
          { title: "Kế hoạch", value: "ke-hoach" },
          { title: "Quyết định", value: "quyet-dinh" },
          { title: "Thông tư", value: "thong-tu" },
          { title: "Khác", value: "khac" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Tóm tắt nội dung",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "fileUrl",
      title: "Link tải file (PDF)",
      type: "url",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "documentNumber" },
  },
});
```

- [ ] **Bước 5.3: Tạo `sanity/schemas/personnel.ts`**

```typescript
// sanity/schemas/personnel.ts
import { defineField, defineType } from "sanity";

export const personnelSchema = defineType({
  name: "personnel",
  title: "Cán bộ lãnh đạo",
  type: "document",
  fields: [
    defineField({
      name: "fullName",
      title: "Họ và tên",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "rank",
      title: "Cấp bậc",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "position",
      title: "Chức vụ",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "unit",
      title: "Đơn vị",
      type: "string",
      initialValue: "Công an phường Bình Dương",
    }),
    defineField({
      name: "photo",
      title: "Ảnh",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "order",
      title: "Thứ tự hiển thị",
      type: "number",
      initialValue: 99,
    }),
  ],
  orderings: [
    {
      title: "Thứ tự hiển thị",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "fullName", subtitle: "position", media: "photo" },
  },
});
```

- [ ] **Bước 5.4: Tạo `sanity/schemas/procedure.ts`**

```typescript
// sanity/schemas/procedure.ts
import { defineField, defineType } from "sanity";

export const procedureSchema = defineType({
  name: "procedure",
  title: "Thủ tục hành chính",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Tên thủ tục",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Đường dẫn",
      type: "slug",
      options: { source: "title", maxLength: 120 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Lĩnh vực",
      type: "string",
      options: {
        list: [
          { title: "Cư trú", value: "cu-tru" },
          { title: "CMND/CCCD", value: "cmnd-cccd" },
          { title: "Phương tiện", value: "xe-co" },
          { title: "Khác", value: "khac" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "processingTime",
      title: "Thời gian giải quyết",
      type: "string",
      placeholder: "Ví dụ: 3 ngày làm việc",
    }),
    defineField({
      name: "fee",
      title: "Lệ phí",
      type: "string",
      placeholder: "Ví dụ: Miễn phí",
    }),
    defineField({
      name: "requirements",
      title: "Thành phần hồ sơ",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "steps",
      title: "Các bước thực hiện",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "category" },
  },
});
```

- [ ] **Bước 5.5: Cập nhật `sanity/schemas/index.ts`**

```typescript
// sanity/schemas/index.ts
import type { SchemaTypeDefinition } from "sanity";
import { newsSchema } from "./news";
import { legalDocumentSchema } from "./legalDocument";
import { personnelSchema } from "./personnel";
import { procedureSchema } from "./procedure";

export const schemaTypes: SchemaTypeDefinition[] = [
  newsSchema,
  legalDocumentSchema,
  personnelSchema,
  procedureSchema,
];
```

- [ ] **Bước 5.6: Kiểm tra Schema trong Studio**

```bash
npm run dev
```

Mở `http://localhost:3000/studio`, kiểm tra bên trái thấy đủ 4 document types: **Tin tức, Văn bản pháp luật, Cán bộ lãnh đạo, Thủ tục hành chính**. Thử tạo 1 bản ghi test để xác nhận form không lỗi.

- [ ] **Bước 5.7: Commit**

```bash
git add sanity/schemas/ sanity/sanity.config.ts
git commit -m "feat: add Sanity schemas for news, legalDoc, personnel, procedure"
```

---

## Task 6: GROQ Queries

**Files:**
- Create: `sanity/lib/queries.ts`

- [ ] **Bước 6.1: Tạo `sanity/lib/queries.ts`**

```typescript
// sanity/lib/queries.ts
import { groq } from "next-sanity";
import { client } from "./client";
import type { NewsPost, NewsPostPreview } from "@/types/news";
import type { LegalDocument, LegalDocumentPreview } from "@/types/legalDocument";
import type { Personnel } from "@/types/personnel";
import type { Procedure } from "@/types/procedure";

// ─── News ────────────────────────────────────────────────────────────────────

const newsPreviewFields = groq`
  _id, title, slug, publishedAt, excerpt, mainImage, category
`;

export async function getLatestNews(limit = 6): Promise<NewsPostPreview[]> {
  return client.fetch(
    groq`*[_type == "newsPost"] | order(publishedAt desc) [0...$limit] {
      ${newsPreviewFields}
    }`,
    { limit },
    { next: { revalidate: 300 } }
  );
}

export async function getNewsByCategory(
  category: string,
  limit = 20
): Promise<NewsPostPreview[]> {
  return client.fetch(
    groq`*[_type == "newsPost" && category == $category] | order(publishedAt desc) [0...$limit] {
      ${newsPreviewFields}
    }`,
    { category, limit },
    { next: { revalidate: 300 } }
  );
}

export async function getNewsBySlug(slug: string): Promise<NewsPost | null> {
  return client.fetch(
    groq`*[_type == "newsPost" && slug.current == $slug][0] {
      _id, title, slug, publishedAt, excerpt, mainImage, category, body
    }`,
    { slug },
    { next: { revalidate: 600 } }
  );
}

// ─── Legal Documents ─────────────────────────────────────────────────────────

export async function getLegalDocuments(
  category?: string
): Promise<LegalDocumentPreview[]> {
  const filter = category
    ? groq`*[_type == "legalDocument" && category == $category]`
    : groq`*[_type == "legalDocument"]`;

  return client.fetch(
    groq`${filter} | order(issuedDate desc) {
      _id, title, slug, documentNumber, issuedDate, category, issuingBody
    }`,
    { category: category ?? "" },
    { next: { revalidate: 3600 } }
  );
}

export async function getLegalDocBySlug(
  slug: string
): Promise<LegalDocument | null> {
  return client.fetch(
    groq`*[_type == "legalDocument" && slug.current == $slug][0]`,
    { slug },
    { next: { revalidate: 3600 } }
  );
}

// ─── Personnel ────────────────────────────────────────────────────────────────

export async function getPersonnel(): Promise<Personnel[]> {
  return client.fetch(
    groq`*[_type == "personnel"] | order(order asc) {
      _id, fullName, rank, position, unit, photo, order
    }`,
    {},
    { next: { revalidate: 86400 } }
  );
}

// ─── Procedures ──────────────────────────────────────────────────────────────

export async function getProcedures(category?: string): Promise<Procedure[]> {
  const filter = category
    ? groq`*[_type == "procedure" && category == $category]`
    : groq`*[_type == "procedure"]`;

  return client.fetch(
    groq`${filter} | order(title asc) {
      _id, title, slug, category, processingTime, fee
    }`,
    { category: category ?? "" },
    { next: { revalidate: 3600 } }
  );
}

export async function getProcedureBySlug(
  slug: string
): Promise<Procedure | null> {
  return client.fetch(
    groq`*[_type == "procedure" && slug.current == $slug][0]`,
    { slug },
    { next: { revalidate: 3600 } }
  );
}
```

- [ ] **Bước 6.2: Commit**

```bash
git add sanity/lib/queries.ts
git commit -m "feat: add GROQ query helpers for all content types"
```

---

## Task 7: Layout Components (Header, Footer)

**Files:**
- Create: `components/layout/Header.tsx`
- Create: `components/layout/MobileMenu.tsx`
- Create: `components/layout/Footer.tsx`
- Create: `app/(web)/layout.tsx`
- Create: `app/layout.tsx`

- [ ] **Bước 7.1: Tạo `components/layout/Header.tsx`**

```tsx
// components/layout/Header.tsx
import Link from "next/link";
import { NAV_ITEMS } from "@/constants/nav";
import { SITE } from "@/constants/site";
import MobileMenu from "./MobileMenu";

export default function Header() {
  return (
    <header className="bg-police-red text-white shadow-md sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-police-red-dark py-1 px-4 text-xs text-center">
        Đường dây nóng: <strong>{SITE.hotline}</strong> &nbsp;|&nbsp; {SITE.phone}
      </div>

      {/* Main nav */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-police-gold rounded-full flex items-center justify-center font-bold text-police-red text-sm">
            CA
          </div>
          <div className="hidden sm:block">
            <p className="font-bold text-sm leading-tight">{SITE.name}</p>
            <p className="text-xs opacity-80">{SITE.address}</p>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-2 text-sm rounded hover:bg-police-red-dark transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile menu button */}
        <MobileMenu />
      </div>
    </header>
  );
}
```

- [ ] **Bước 7.2: Tạo `components/layout/MobileMenu.tsx`**

```tsx
// components/layout/MobileMenu.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { NAV_ITEMS } from "@/constants/nav";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded hover:bg-police-red-dark transition-colors"
        aria-label="Mở menu"
      >
        <div className="w-5 h-0.5 bg-white mb-1" />
        <div className="w-5 h-0.5 bg-white mb-1" />
        <div className="w-5 h-0.5 bg-white" />
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 bg-police-red shadow-lg py-2 z-50">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block px-6 py-3 text-white hover:bg-police-red-dark transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Bước 7.3: Tạo `components/layout/Footer.tsx`**

```tsx
// components/layout/Footer.tsx
import Link from "next/link";
import { SITE } from "@/constants/site";
import { NAV_ITEMS } from "@/constants/nav";

export default function Footer() {
  return (
    <footer className="bg-police-navy text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Cột 1: Thông tin đơn vị */}
        <div>
          <h3 className="font-bold text-police-gold mb-3">{SITE.name}</h3>
          <p className="text-sm text-gray-300">{SITE.address}</p>
          <p className="text-sm text-gray-300 mt-1">ĐT: {SITE.phone}</p>
          <p className="text-sm text-gray-300">Email: {SITE.email}</p>
          <p className="text-sm text-gray-300 mt-1">{SITE.workingHours}</p>
        </div>

        {/* Cột 2: Liên kết nhanh */}
        <div>
          <h3 className="font-bold text-police-gold mb-3">Liên kết nhanh</h3>
          <ul className="space-y-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Cột 3: Khẩn cấp */}
        <div>
          <h3 className="font-bold text-police-gold mb-3">Đường dây khẩn cấp</h3>
          <p className="text-4xl font-bold text-police-gold">{SITE.hotline}</p>
          <p className="text-sm text-gray-300 mt-1">Phản ánh tội phạm 24/7</p>
          <Link
            href="/phan-anh"
            className="inline-block mt-3 bg-police-red hover:bg-police-red-dark text-white text-sm font-medium px-4 py-2 rounded transition-colors"
          >
            Gửi phản ánh trực tuyến →
          </Link>
        </div>
      </div>

      <div className="border-t border-white/10 text-center text-xs text-gray-400 py-4">
        © {new Date().getFullYear()} {SITE.name} — Phát triển bởi Rex Nguyen
      </div>
    </footer>
  );
}
```

- [ ] **Bước 7.4: Tạo `app/layout.tsx` (root layout)**

```tsx
// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { SITE } from "@/constants/site";

export const metadata: Metadata = {
  title: {
    default: SITE.name,
    template: `%s | ${SITE.shortName}`,
  },
  description: SITE.description,
  keywords: ["công an", "phường Bình Dương", "an ninh trật tự", "thủ tục hành chính"],
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: SITE.url,
    siteName: SITE.name,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
```

- [ ] **Bước 7.5: Tạo `app/(web)/layout.tsx`**

```tsx
// app/(web)/layout.tsx
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function WebLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
```

- [ ] **Bước 7.6: Kiểm tra layout**

```bash
npm run dev
```

Mở `http://localhost:3000` — thấy header đỏ với tên đơn vị, footer navy với đường dây nóng 113. Resize về mobile — kiểm tra menu hamburger hoạt động.

- [ ] **Bước 7.7: Commit**

```bash
git add components/layout/ app/layout.tsx "app/(web)/layout.tsx"
git commit -m "feat: add Header, Footer, MobileMenu layout components"
```

---

## Task 8: UI Components Tái sử dụng

**Files:**
- Create: `components/ui/Badge.tsx`
- Create: `components/ui/Button.tsx`
- Create: `components/ui/PageHeader.tsx`
- Create: `components/ui/NewsCard.tsx`
- Create: `components/ui/LegalDocCard.tsx`

- [ ] **Bước 8.1: Tạo `components/ui/Badge.tsx`**

```tsx
// components/ui/Badge.tsx
const CATEGORY_LABELS: Record<string, { label: string; className: string }> = {
  "tin-tuc":    { label: "Tin tức",   className: "bg-blue-100 text-blue-800" },
  "thong-bao":  { label: "Thông báo", className: "bg-yellow-100 text-yellow-800" },
  "canh-bao":   { label: "Cảnh báo",  className: "bg-red-100 text-red-800" },
  "nghi-quyet": { label: "Nghị quyết", className: "bg-purple-100 text-purple-800" },
  "ke-hoach":   { label: "Kế hoạch",  className: "bg-green-100 text-green-800" },
  "quyet-dinh": { label: "Quyết định", className: "bg-orange-100 text-orange-800" },
  "thong-tu":   { label: "Thông tư",  className: "bg-teal-100 text-teal-800" },
  "khac":       { label: "Khác",      className: "bg-gray-100 text-gray-800" },
};

export default function Badge({ category }: { category: string }) {
  const config = CATEGORY_LABELS[category] ?? CATEGORY_LABELS["khac"];
  return (
    <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${config.className}`}>
      {config.label}
    </span>
  );
}
```

- [ ] **Bước 8.2: Tạo `components/ui/Button.tsx`**

```tsx
// components/ui/Button.tsx
import Link from "next/link";

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "outline";
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export default function Button({
  href,
  onClick,
  variant = "primary",
  children,
  className = "",
  type = "button",
  disabled,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center px-5 py-2.5 rounded font-medium text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-police-red focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-police-red hover:bg-police-red-dark text-white",
    outline: "border-2 border-police-red text-police-red hover:bg-police-red hover:text-white",
  };
  const cls = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={cls} disabled={disabled}>
      {children}
    </button>
  );
}
```

- [ ] **Bước 8.3: Tạo `components/ui/PageHeader.tsx`**

```tsx
// components/ui/PageHeader.tsx
import Link from "next/link";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  breadcrumbs?: Breadcrumb[];
  description?: string;
}

export default function PageHeader({ title, breadcrumbs, description }: PageHeaderProps) {
  return (
    <div className="bg-gray-50 border-b py-6 px-4">
      <div className="max-w-7xl mx-auto">
        {breadcrumbs && (
          <nav className="text-sm text-gray-500 mb-2 flex items-center gap-1">
            <Link href="/" className="hover:text-police-red">Trang chủ</Link>
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-1">
                <span>/</span>
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-police-red">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-gray-800">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        <h1 className="text-2xl md:text-3xl font-bold text-police-navy">{title}</h1>
        {description && <p className="mt-2 text-gray-600">{description}</p>}
      </div>
    </div>
  );
}
```

- [ ] **Bước 8.4: Tạo `components/ui/NewsCard.tsx`**

```tsx
// components/ui/NewsCard.tsx
import Link from "next/link";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/lib/client";
import type { NewsPostPreview } from "@/types/news";
import Badge from "./Badge";

const builder = imageUrlBuilder(client);

export default function NewsCard({ post }: { post: NewsPostPreview }) {
  const imgUrl = post.mainImage
    ? builder.image(post.mainImage).width(400).height(250).url()
    : null;

  const formattedDate = new Date(post.publishedAt).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <article className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      {imgUrl && (
        <div className="relative h-48">
          <Image
            src={imgUrl}
            alt={post.mainImage?.alt ?? post.title}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <Badge category={post.category} />
          <time className="text-xs text-gray-400">{formattedDate}</time>
        </div>
        <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2">
          <Link href={`/tin-tuc/${post.slug.current}`} className="hover:text-police-red">
            {post.title}
          </Link>
        </h3>
        <p className="text-sm text-gray-500 line-clamp-3">{post.excerpt}</p>
      </div>
    </article>
  );
}
```

- [ ] **Bước 8.5: Tạo `components/ui/LegalDocCard.tsx`**

```tsx
// components/ui/LegalDocCard.tsx
import Link from "next/link";
import type { LegalDocumentPreview } from "@/types/legalDocument";
import Badge from "./Badge";

export default function LegalDocCard({ doc }: { doc: LegalDocumentPreview }) {
  const formattedDate = new Date(doc.issuedDate).toLocaleDateString("vi-VN");

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:border-police-red hover:shadow-sm transition-all">
      <div className="flex items-start justify-between gap-2 mb-2">
        <Badge category={doc.category} />
        <time className="text-xs text-gray-400 whitespace-nowrap">{formattedDate}</time>
      </div>
      <Link href={`/van-ban-phap-luat/${doc.slug.current}`}>
        <h3 className="font-semibold text-gray-900 hover:text-police-red line-clamp-2 mb-1">
          {doc.title}
        </h3>
      </Link>
      <p className="text-sm text-gray-500">Số: {doc.documentNumber}</p>
      <p className="text-xs text-gray-400">{doc.issuingBody}</p>
    </div>
  );
}
```

- [ ] **Bước 8.6: Commit**

```bash
git add components/ui/
git commit -m "feat: add reusable UI components (Badge, Button, PageHeader, NewsCard, LegalDocCard)"
```

---

## Task 9: Trang chủ (Home Page)

**Files:**
- Create: `components/sections/HeroSection.tsx`
- Create: `components/sections/LatestNews.tsx`
- Create: `components/sections/QuickLinks.tsx`
- Create: `app/(web)/page.tsx`

- [ ] **Bước 9.1: Tạo `components/sections/HeroSection.tsx`**

```tsx
// components/sections/HeroSection.tsx
import Link from "next/link";
import { SITE } from "@/constants/site";

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-police-navy to-police-navy-dark text-white py-16 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1 text-sm mb-6">
          <span className="w-2 h-2 bg-police-gold rounded-full animate-pulse" />
          Cổng thông tin chính thống
        </div>
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          {SITE.name}
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
          {SITE.description}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/phan-anh"
            className="bg-police-red hover:bg-police-red-dark text-white font-medium px-6 py-3 rounded-lg transition-colors"
          >
            Gửi phản ánh trực tuyến
          </Link>
          <Link
            href="/thu-tuc-hanh-chinh"
            className="border border-white/40 hover:bg-white/10 text-white font-medium px-6 py-3 rounded-lg transition-colors"
          >
            Thủ tục hành chính
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
          {[
            { label: "Tin tức cập nhật", value: "Hàng tuần" },
            { label: "Văn bản pháp luật", value: "Đầy đủ" },
            { label: "Thủ tục hành chính", value: "Minh bạch" },
            { label: "Đường dây nóng", value: "113" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-bold text-police-gold">{stat.value}</p>
              <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Bước 9.2: Tạo `components/sections/LatestNews.tsx`**

```tsx
// components/sections/LatestNews.tsx
import Link from "next/link";
import NewsCard from "@/components/ui/NewsCard";
import type { NewsPostPreview } from "@/types/news";

export default function LatestNews({ posts }: { posts: NewsPostPreview[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-police-navy">Tin tức mới nhất</h2>
          <Link
            href="/tin-tuc"
            className="text-police-red hover:underline text-sm font-medium"
          >
            Xem tất cả →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <NewsCard key={post._id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Bước 9.3: Tạo `components/sections/QuickLinks.tsx`**

```tsx
// components/sections/QuickLinks.tsx
import Link from "next/link";

const LINKS = [
  {
    icon: "📋",
    title: "Thủ tục hành chính",
    desc: "Cư trú, CCCD, phương tiện",
    href: "/thu-tuc-hanh-chinh",
  },
  {
    icon: "📄",
    title: "Văn bản pháp luật",
    desc: "Nghị quyết, kế hoạch, quyết định",
    href: "/van-ban-phap-luat",
  },
  {
    icon: "📢",
    title: "Phản ánh trực tuyến",
    desc: "Gửi tin báo tội phạm, kiến nghị",
    href: "/phan-anh",
  },
  {
    icon: "🏛️",
    title: "Giới thiệu đơn vị",
    desc: "Lãnh đạo, lịch sử, nhiệm vụ",
    href: "/gioi-thieu",
  },
];

export default function QuickLinks() {
  return (
    <section className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-police-navy text-center mb-8">
          Dịch vụ trực tuyến
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group bg-white rounded-xl border border-gray-200 p-6 text-center hover:border-police-red hover:shadow-md transition-all"
            >
              <span className="text-4xl mb-3 block">{link.icon}</span>
              <h3 className="font-semibold text-gray-900 group-hover:text-police-red mb-1">
                {link.title}
              </h3>
              <p className="text-sm text-gray-500">{link.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Bước 9.4: Tạo `app/(web)/page.tsx`**

```tsx
// app/(web)/page.tsx
import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import LatestNews from "@/components/sections/LatestNews";
import QuickLinks from "@/components/sections/QuickLinks";
import { getLatestNews } from "@/sanity/lib/queries";
import { SITE } from "@/constants/site";

export const metadata: Metadata = {
  title: SITE.name,
  description: SITE.description,
};

export default async function HomePage() {
  const latestNews = await getLatestNews(6);

  return (
    <>
      <HeroSection />
      <QuickLinks />
      <LatestNews posts={latestNews} />
    </>
  );
}
```

- [ ] **Bước 9.5: Kiểm tra trang chủ**

```bash
npm run dev
```

Mở `http://localhost:3000` — phải thấy hero section màu navy, 4 quick links, và section tin tức (trống nếu Sanity chưa có dữ liệu). Kiểm tra responsive trên mobile.

- [ ] **Bước 9.6: Commit**

```bash
git add components/sections/ "app/(web)/page.tsx"
git commit -m "feat: add homepage with hero, quick links, and latest news sections"
```

---

## Task 10: Trang Tin tức

**Files:**
- Create: `app/(web)/tin-tuc/page.tsx`
- Create: `app/(web)/tin-tuc/[slug]/page.tsx`

- [ ] **Bước 10.1: Tạo `app/(web)/tin-tuc/page.tsx`**

```tsx
// app/(web)/tin-tuc/page.tsx
import type { Metadata } from "next";
import { getLatestNews, getNewsByCategory } from "@/sanity/lib/queries";
import NewsCard from "@/components/ui/NewsCard";
import PageHeader from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Tin tức",
  description: "Tin tức, thông báo và cảnh báo từ Công an phường Bình Dương",
};

const CATEGORIES = [
  { value: "", label: "Tất cả" },
  { value: "tin-tuc", label: "Tin tức" },
  { value: "thong-bao", label: "Thông báo" },
  { value: "canh-bao", label: "Cảnh báo" },
];

export default async function NewsPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const category = searchParams.category;
  const posts = category
    ? await getNewsByCategory(category, 20)
    : await getLatestNews(20);

  return (
    <>
      <PageHeader
        title="Tin tức & Thông báo"
        breadcrumbs={[{ label: "Tin tức" }]}
        description="Cập nhật tình hình an ninh trật tự và thông báo từ đơn vị"
      />
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((cat) => {
            const isActive = (cat.value === "" && !category) || cat.value === category;
            return (
              <a
                key={cat.value}
                href={cat.value ? `/tin-tuc?category=${cat.value}` : "/tin-tuc"}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                  isActive
                    ? "bg-police-red text-white border-police-red"
                    : "text-gray-600 border-gray-300 hover:border-police-red hover:text-police-red"
                }`}
              >
                {cat.label}
              </a>
            );
          })}
        </div>

        {posts.length === 0 ? (
          <p className="text-center text-gray-500 py-16">Chưa có tin tức nào.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <NewsCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
```

- [ ] **Bước 10.2: Tạo `app/(web)/tin-tuc/[slug]/page.tsx`**

```tsx
// app/(web)/tin-tuc/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/lib/client";
import { getNewsBySlug } from "@/sanity/lib/queries";
import PageHeader from "@/components/ui/PageHeader";
import Badge from "@/components/ui/Badge";

const builder = imageUrlBuilder(client);

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getNewsBySlug(params.slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function NewsDetailPage({ params }: Props) {
  const post = await getNewsBySlug(params.slug);
  if (!post) notFound();

  const imgUrl = post.mainImage
    ? builder.image(post.mainImage).width(900).height(500).url()
    : null;

  const formattedDate = new Date(post.publishedAt).toLocaleDateString("vi-VN", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <>
      <PageHeader
        title={post.title}
        breadcrumbs={[{ label: "Tin tức", href: "/tin-tuc" }, { label: post.title }]}
      />
      <article className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-4">
          <Badge category={post.category} />
          <time className="text-sm text-gray-500">{formattedDate}</time>
        </div>

        {imgUrl && (
          <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden mb-6">
            <Image
              src={imgUrl}
              alt={post.mainImage?.alt ?? post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <p className="text-lg text-gray-600 font-medium border-l-4 border-police-red pl-4 mb-6">
          {post.excerpt}
        </p>

        <div className="prose prose-gray max-w-none prose-headings:text-police-navy prose-a:text-police-red">
          <PortableText value={post.body} />
        </div>
      </article>
    </>
  );
}
```

- [ ] **Bước 10.3: Cài `@tailwindcss/typography`**

```bash
npm install -D @tailwindcss/typography
```

Thêm vào `tailwind.config.ts`:

```typescript
plugins: [require("@tailwindcss/typography")],
```

- [ ] **Bước 10.4: Kiểm tra**

Vào Sanity Studio, tạo 1 bài viết mẫu có đủ: tiêu đề, slug, ngày đăng, category, excerpt, ảnh đại diện, nội dung. Mở `http://localhost:3000/tin-tuc` — thấy card. Bấm vào — thấy trang chi tiết.

- [ ] **Bước 10.5: Commit**

```bash
git add "app/(web)/tin-tuc/"
git commit -m "feat: add news list and detail pages with Sanity data"
```

---

## Task 11: Trang Văn bản Pháp luật

**Files:**
- Create: `app/(web)/van-ban-phap-luat/page.tsx`
- Create: `app/(web)/van-ban-phap-luat/[slug]/page.tsx`

- [ ] **Bước 11.1: Tạo `app/(web)/van-ban-phap-luat/page.tsx`**

```tsx
// app/(web)/van-ban-phap-luat/page.tsx
import type { Metadata } from "next";
import { getLegalDocuments } from "@/sanity/lib/queries";
import LegalDocCard from "@/components/ui/LegalDocCard";
import PageHeader from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Văn bản pháp luật",
  description: "Thư viện văn bản pháp luật, nghị quyết và kế hoạch triển khai",
};

const CATEGORIES = [
  { value: "", label: "Tất cả" },
  { value: "nghi-quyet", label: "Nghị quyết" },
  { value: "ke-hoach", label: "Kế hoạch" },
  { value: "quyet-dinh", label: "Quyết định" },
  { value: "thong-tu", label: "Thông tư" },
];

export default async function LegalDocsPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const category = searchParams.category;
  const docs = await getLegalDocuments(category);

  return (
    <>
      <PageHeader
        title="Văn bản Pháp luật"
        breadcrumbs={[{ label: "Văn bản pháp luật" }]}
        description="Nghị quyết 57, Đề án 06 và các văn bản pháp lý liên quan"
      />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((cat) => {
            const isActive = (cat.value === "" && !category) || cat.value === category;
            return (
              <a
                key={cat.value}
                href={cat.value ? `/van-ban-phap-luat?category=${cat.value}` : "/van-ban-phap-luat"}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                  isActive
                    ? "bg-police-red text-white border-police-red"
                    : "text-gray-600 border-gray-300 hover:border-police-red hover:text-police-red"
                }`}
              >
                {cat.label}
              </a>
            );
          })}
        </div>

        {docs.length === 0 ? (
          <p className="text-center text-gray-500 py-16">Chưa có văn bản nào.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {docs.map((doc) => (
              <LegalDocCard key={doc._id} doc={doc} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
```

- [ ] **Bước 11.2: Tạo `app/(web)/van-ban-phap-luat/[slug]/page.tsx`**

```tsx
// app/(web)/van-ban-phap-luat/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLegalDocBySlug } from "@/sanity/lib/queries";
import PageHeader from "@/components/ui/PageHeader";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const doc = await getLegalDocBySlug(params.slug);
  if (!doc) return {};
  return { title: doc.title, description: doc.summary };
}

export default async function LegalDocDetailPage({ params }: Props) {
  const doc = await getLegalDocBySlug(params.slug);
  if (!doc) notFound();

  return (
    <>
      <PageHeader
        title={doc.title}
        breadcrumbs={[
          { label: "Văn bản pháp luật", href: "/van-ban-phap-luat" },
          { label: doc.documentNumber },
        ]}
      />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Badge category={doc.category} />
          </div>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="font-medium text-gray-500">Số hiệu</dt>
              <dd className="text-gray-900">{doc.documentNumber}</dd>
            </div>
            <div>
              <dt className="font-medium text-gray-500">Ngày ban hành</dt>
              <dd className="text-gray-900">
                {new Date(doc.issuedDate).toLocaleDateString("vi-VN")}
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="font-medium text-gray-500">Cơ quan ban hành</dt>
              <dd className="text-gray-900">{doc.issuingBody}</dd>
            </div>
          </dl>
        </div>

        {doc.summary && (
          <div className="prose prose-gray max-w-none mb-6">
            <h2 className="text-lg font-semibold text-police-navy">Tóm tắt nội dung</h2>
            <p>{doc.summary}</p>
          </div>
        )}

        {doc.fileUrl && (
          <Button href={doc.fileUrl} variant="primary">
            Tải văn bản (PDF) →
          </Button>
        )}
      </div>
    </>
  );
}
```

- [ ] **Bước 11.3: Kiểm tra**

Tạo 1 văn bản mẫu trong Sanity Studio. Mở `/van-ban-phap-luat` và `/van-ban-phap-luat/[slug]` xác nhận hiển thị đúng.

- [ ] **Bước 11.4: Commit**

```bash
git add "app/(web)/van-ban-phap-luat/"
git commit -m "feat: add legal document list and detail pages"
```

---

## Task 12: Trang Thủ tục Hành chính

**Files:**
- Create: `app/(web)/thu-tuc-hanh-chinh/page.tsx`

- [ ] **Bước 12.1: Tạo `app/(web)/thu-tuc-hanh-chinh/page.tsx`**

```tsx
// app/(web)/thu-tuc-hanh-chinh/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { getProcedures, getProcedureBySlug } from "@/sanity/lib/queries";
import PageHeader from "@/components/ui/PageHeader";
import Badge from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Thủ tục hành chính",
  description: "Hướng dẫn thủ tục hành chính về cư trú, CCCD và phương tiện",
};

const CATEGORIES = [
  { value: "", label: "Tất cả" },
  { value: "cu-tru", label: "Cư trú" },
  { value: "cmnd-cccd", label: "CMND/CCCD" },
  { value: "xe-co", label: "Phương tiện" },
  { value: "khac", label: "Khác" },
];

export default async function ProceduresPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const category = searchParams.category;
  const procedures = await getProcedures(category);

  return (
    <>
      <PageHeader
        title="Thủ tục Hành chính"
        breadcrumbs={[{ label: "Thủ tục hành chính" }]}
        description="Hướng dẫn chi tiết các thủ tục hành chính tại Công an phường"
      />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((cat) => {
            const isActive = (cat.value === "" && !category) || cat.value === category;
            return (
              <a
                key={cat.value}
                href={
                  cat.value
                    ? `/thu-tuc-hanh-chinh?category=${cat.value}`
                    : "/thu-tuc-hanh-chinh"
                }
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                  isActive
                    ? "bg-police-red text-white border-police-red"
                    : "text-gray-600 border-gray-300 hover:border-police-red hover:text-police-red"
                }`}
              >
                {cat.label}
              </a>
            );
          })}
        </div>

        {procedures.length === 0 ? (
          <p className="text-center text-gray-500 py-16">Chưa có thủ tục nào.</p>
        ) : (
          <div className="space-y-4">
            {procedures.map((proc) => (
              <div
                key={proc._id}
                className="bg-white rounded-lg border border-gray-200 p-5 hover:border-police-red hover:shadow-sm transition-all"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge category={proc.category} />
                    </div>
                    <Link href={`/thu-tuc-hanh-chinh/${proc.slug.current}`}>
                      <h3 className="font-semibold text-gray-900 hover:text-police-red">
                        {proc.title}
                      </h3>
                    </Link>
                  </div>
                  <div className="text-sm text-right text-gray-500">
                    <p>Thời gian: <strong>{proc.processingTime}</strong></p>
                    <p>Lệ phí: <strong>{proc.fee}</strong></p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
```

- [ ] **Bước 12.2: Tạo `app/(web)/thu-tuc-hanh-chinh/[slug]/page.tsx`**

```tsx
// app/(web)/thu-tuc-hanh-chinh/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { getProcedureBySlug } from "@/sanity/lib/queries";
import PageHeader from "@/components/ui/PageHeader";
import Badge from "@/components/ui/Badge";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const proc = await getProcedureBySlug(params.slug);
  if (!proc) return {};
  return { title: proc.title };
}

export default async function ProcedureDetailPage({ params }: Props) {
  const proc = await getProcedureBySlug(params.slug);
  if (!proc) notFound();

  return (
    <>
      <PageHeader
        title={proc.title}
        breadcrumbs={[
          { label: "Thủ tục hành chính", href: "/thu-tuc-hanh-chinh" },
          { label: proc.title },
        ]}
      />
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        <div className="bg-blue-50 rounded-lg p-4 grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-600">Lĩnh vực: </span>
            <Badge category={proc.category} />
          </div>
          <div>
            <span className="font-medium text-gray-600">Thời gian: </span>
            <span>{proc.processingTime}</span>
          </div>
          <div>
            <span className="font-medium text-gray-600">Lệ phí: </span>
            <span>{proc.fee}</span>
          </div>
        </div>

        {proc.requirements && (
          <div>
            <h2 className="text-lg font-bold text-police-navy mb-3">Thành phần hồ sơ</h2>
            <div className="prose prose-gray max-w-none">
              <PortableText value={proc.requirements} />
            </div>
          </div>
        )}

        {proc.steps && (
          <div>
            <h2 className="text-lg font-bold text-police-navy mb-3">Các bước thực hiện</h2>
            <div className="prose prose-gray max-w-none">
              <PortableText value={proc.steps} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
```

- [ ] **Bước 12.3: Commit**

```bash
git add "app/(web)/thu-tuc-hanh-chinh/"
git commit -m "feat: add administrative procedures list and detail pages"
```

---

## Task 13: Trang Giới thiệu

**Files:**
- Create: `app/(web)/gioi-thieu/page.tsx`

- [ ] **Bước 13.1: Tạo `app/(web)/gioi-thieu/page.tsx`**

```tsx
// app/(web)/gioi-thieu/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/lib/client";
import { getPersonnel } from "@/sanity/lib/queries";
import { SITE } from "@/constants/site";
import PageHeader from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Giới thiệu",
  description: "Giới thiệu về Công an phường Bình Dương và ban lãnh đạo đơn vị",
};

const builder = imageUrlBuilder(client);

export default async function AboutPage() {
  const personnel = await getPersonnel();

  return (
    <>
      <PageHeader
        title="Giới thiệu Đơn vị"
        breadcrumbs={[{ label: "Giới thiệu" }]}
      />
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">

        {/* Thông tin đơn vị */}
        <section>
          <h2 className="text-2xl font-bold text-police-navy mb-4">Về chúng tôi</h2>
          <div className="prose prose-gray max-w-none">
            <p>
              <strong>Công an phường Bình Dương</strong> là đơn vị trực thuộc Công an
              thành phố Thủ Dầu Một, tỉnh Bình Dương. Đơn vị được thành lập trên cơ sở
              sáp nhập các phường Hòa Phú, Phú Mỹ, Phú Tân và Phú Chánh theo chủ trương
              sắp xếp đơn vị hành chính của tỉnh Bình Dương.
            </p>
            <p>
              Nhiệm vụ chính của đơn vị là bảo đảm an ninh trật tự, phòng chống tội phạm
              và phục vụ nhân dân trên địa bàn phường Bình Dương.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {["Hòa Phú", "Phú Mỹ", "Phú Tân", "Phú Chánh"].map((ward) => (
              <div key={ward} className="bg-police-red/5 border border-police-red/20 rounded-lg p-4 text-center">
                <p className="font-semibold text-police-red">{ward}</p>
                <p className="text-xs text-gray-500 mt-1">Đơn vị sáp nhập</p>
              </div>
            ))}
          </div>
        </section>

        {/* Lãnh đạo */}
        {personnel.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-police-navy mb-6">Ban Lãnh đạo</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {personnel.map((person) => {
                const photoUrl = person.photo
                  ? builder.image(person.photo).width(300).height(400).url()
                  : null;
                return (
                  <div key={person._id} className="text-center">
                    <div className="relative w-40 h-52 mx-auto rounded-lg overflow-hidden bg-gray-100 mb-3">
                      {photoUrl ? (
                        <Image
                          src={photoUrl}
                          alt={person.fullName}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-4xl">
                          👮
                        </div>
                      )}
                    </div>
                    <p className="font-bold text-gray-900">{person.fullName}</p>
                    <p className="text-sm text-police-red">{person.rank}</p>
                    <p className="text-sm text-gray-500">{person.position}</p>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Thông tin liên hệ */}
        <section className="bg-gray-50 rounded-xl p-6">
          <h2 className="text-xl font-bold text-police-navy mb-4">Thông tin liên hệ</h2>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div>
              <dt className="font-medium text-gray-500">Địa chỉ</dt>
              <dd>{SITE.address}</dd>
            </div>
            <div>
              <dt className="font-medium text-gray-500">Điện thoại</dt>
              <dd>{SITE.phone}</dd>
            </div>
            <div>
              <dt className="font-medium text-gray-500">Email</dt>
              <dd>{SITE.email}</dd>
            </div>
            <div>
              <dt className="font-medium text-gray-500">Giờ làm việc</dt>
              <dd>{SITE.workingHours}</dd>
            </div>
          </dl>
        </section>
      </div>
    </>
  );
}
```

- [ ] **Bước 13.2: Commit**

```bash
git add "app/(web)/gioi-thieu/"
git commit -m "feat: add about page with unit info, leadership, and merger history"
```

---

## Task 14: Form Phản ánh + API Route

**Files:**
- Create: `app/api/feedback/route.ts`
- Create: `app/(web)/phan-anh/page.tsx`

- [ ] **Bước 14.1: Tạo `app/api/feedback/route.ts`**

```typescript
// app/api/feedback/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const feedbackSchema = z.object({
  fullName: z.string().min(2, "Vui lòng nhập họ tên (ít nhất 2 ký tự)").max(100),
  phone: z.string().regex(/^(0|\+84)[0-9]{8,9}$/, "Số điện thoại không hợp lệ"),
  subject: z.string().min(5, "Vui lòng nhập chủ đề (ít nhất 5 ký tự)").max(200),
  content: z.string().min(20, "Nội dung phản ánh cần ít nhất 20 ký tự").max(5000),
  anonymous: z.boolean().optional(),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Dữ liệu không hợp lệ" }, { status: 400 });
  }

  const result = feedbackSchema.safeParse(body);
  if (!result.success) {
    const firstError = result.error.errors[0]?.message ?? "Dữ liệu không hợp lệ";
    return NextResponse.json({ error: firstError }, { status: 422 });
  }

  const { fullName, phone, subject, content, anonymous } = result.data;

  const senderLabel = anonymous ? "Người gửi ẩn danh" : `${fullName} (${phone})`;

  const { error } = await resend.emails.send({
    from: "Cổng Phản ánh <onboarding@resend.dev>",
    to: process.env.CONTACT_EMAIL!,
    subject: `[Phản ánh] ${subject}`,
    html: `
      <h2>Phản ánh mới từ cổng thông tin Công an phường Bình Dương</h2>
      <hr/>
      <p><strong>Người gửi:</strong> ${senderLabel}</p>
      <p><strong>Chủ đề:</strong> ${subject}</p>
      <p><strong>Nội dung:</strong></p>
      <blockquote style="border-left: 4px solid #C8102E; padding-left: 12px; color: #333;">
        ${content.replace(/\n/g, "<br/>")}
      </blockquote>
      <hr/>
      <p style="font-size: 12px; color: #888;">Gửi lúc: ${new Date().toLocaleString("vi-VN")}</p>
    `,
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json(
      { error: "Không thể gửi phản ánh. Vui lòng thử lại sau." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
```

- [ ] **Bước 14.2: Tạo `app/(web)/phan-anh/page.tsx`**

```tsx
// app/(web)/phan-anh/page.tsx
"use client";

import type { Metadata } from "next";
import { useState } from "react";
import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import { SITE } from "@/constants/site";

type Status = "idle" | "loading" | "success" | "error";

export default function FeedbackPage() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = {
      fullName: (form.elements.namedItem("fullName") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      subject: (form.elements.namedItem("subject") as HTMLInputElement).value,
      content: (form.elements.namedItem("content") as HTMLTextAreaElement).value,
      anonymous: (form.elements.namedItem("anonymous") as HTMLInputElement).checked,
    };

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) {
        setErrorMsg(json.error ?? "Có lỗi xảy ra");
        setStatus("error");
        return;
      }
      setStatus("success");
      form.reset();
    } catch {
      setErrorMsg("Không thể kết nối máy chủ. Vui lòng thử lại.");
      setStatus("error");
    }
  }

  return (
    <>
      <PageHeader
        title="Phản ánh Trực tuyến"
        breadcrumbs={[{ label: "Phản ánh trực tuyến" }]}
        description="Gửi tin báo tội phạm hoặc kiến nghị đến Công an phường"
      />
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Lưu ý */}
        <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4 mb-6 text-sm text-yellow-800">
          <strong>Lưu ý:</strong> Đây là kênh tiếp nhận thông tin phi khẩn cấp. Trong
          trường hợp nguy hiểm tính mạng, hãy gọi ngay <strong>{SITE.hotline}</strong>.
        </div>

        {status === "success" ? (
          <div className="bg-green-50 border border-green-300 rounded-lg p-6 text-center">
            <p className="text-2xl mb-2">✅</p>
            <h3 className="font-bold text-green-800 text-lg">Gửi phản ánh thành công!</h3>
            <p className="text-green-700 text-sm mt-1">
              Chúng tôi đã nhận được thông tin và sẽ xem xét trong thời gian sớm nhất.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="mt-4 text-sm text-police-red underline"
            >
              Gửi phản ánh khác
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                  Họ và tên <span className="text-red-500">*</span>
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-police-red"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Số điện thoại <span className="text-red-500">*</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="0912345678"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-police-red"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Chủ đề phản ánh <span className="text-red-500">*</span>
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                required
                placeholder="Ví dụ: Tụ điểm nghi buôn bán ma túy tại..."
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-police-red"
              />
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                Nội dung chi tiết <span className="text-red-500">*</span>
              </label>
              <textarea
                id="content"
                name="content"
                rows={6}
                required
                placeholder="Mô tả chi tiết sự việc, địa điểm, thời gian, đối tượng liên quan (nếu biết)..."
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-police-red resize-none"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                id="anonymous"
                name="anonymous"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-police-red focus:ring-police-red"
              />
              <label htmlFor="anonymous" className="text-sm text-gray-600">
                Gửi ẩn danh (không hiển thị tên và số điện thoại)
              </label>
            </div>

            {status === "error" && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded p-3">
                {errorMsg}
              </p>
            )}

            <Button type="submit" disabled={status === "loading"} className="w-full">
              {status === "loading" ? "Đang gửi..." : "Gửi phản ánh"}
            </Button>
          </form>
        )}
      </div>
    </>
  );
}
```

- [ ] **Bước 14.3: Kiểm tra API với dữ liệu test**

```bash
npm run dev
```

Mở `http://localhost:3000/phan-anh`, điền form đầy đủ, submit. Kiểm tra:
1. Trạng thái "Đang gửi..." hiển thị trong lúc chờ.
2. Thành công → thấy màn hình xác nhận xanh lá.
3. Kiểm tra hộp thư `CONTACT_EMAIL` nhận được email.
4. Thử để trống trường bắt buộc → thấy lỗi validation.

- [ ] **Bước 14.4: Commit**

```bash
git add "app/api/feedback/" "app/(web)/phan-anh/"
git commit -m "feat: add online feedback form with server-side validation and Resend email forwarding"
```

---

## Task 15: Vercel Deployment + CI/CD

**Files:**
- Create: `vercel.json` (tùy chọn)
- Verify: `.gitignore` có `.env.local`

- [ ] **Bước 15.1: Kiểm tra `.gitignore`**

Đảm bảo file `.gitignore` (đã tạo bởi `create-next-app`) chứa:
```
.env.local
.env*.local
```

- [ ] **Bước 15.2: Build kiểm tra production**

```bash
npm run build
```

Không được có lỗi TypeScript hoặc lỗi build. Nếu có lỗi, sửa trước khi tiếp tục.

- [ ] **Bước 15.3: Tạo GitHub repository**

Tại `https://github.com/new`, tạo repo mới tên `cap.binhduong` (private hoặc public tùy quyết định).

- [ ] **Bước 15.4: Push lên GitHub**

```bash
git remote add origin https://github.com/YOUR_USERNAME/cap.binhduong.git
git branch -M main
git push -u origin main
```

- [ ] **Bước 15.5: Kết nối Vercel**

1. Vào `https://vercel.com/new`
2. Import GitHub repo vừa tạo
3. Thêm Environment Variables:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET` = `production`
   - `NEXT_PUBLIC_SANITY_API_VERSION` = `2024-01-01`
   - `SANITY_API_READ_TOKEN`
   - `RESEND_API_KEY`
   - `CONTACT_EMAIL`
4. Click **Deploy**

- [ ] **Bước 15.6: Xác nhận deploy thành công**

Mở URL Vercel (ví dụ `https://cap-binhduong.vercel.app`). Kiểm tra:
- Trang chủ load không lỗi 500
- `/studio` truy cập được Sanity Studio
- `/phan-anh` form hoạt động trên production

- [ ] **Bước 15.7: Cập nhật `SITE.url` trong `constants/site.ts`**

Thay `https://cong-an-binh-duong.vercel.app` bằng URL Vercel thực tế.

```bash
git add constants/site.ts
git commit -m "chore: update production URL in site constants"
git push origin main
```

---

## Task 16: Hoàn thiện & Kiểm tra Cuối cùng

- [ ] **Bước 16.1: Kiểm tra SEO metadata**

Chạy `npm run build` và mở `http://localhost:3000`. Kiểm tra `<title>` và `<meta description>` đúng cho từng trang bằng DevTools.

- [ ] **Bước 16.2: Kiểm tra responsive**

Dùng Chrome DevTools, kiểm tra tất cả 6 trang trên breakpoints: 375px (iPhone SE), 768px (tablet), 1440px (desktop).

- [ ] **Bước 16.3: Kiểm tra accessibility cơ bản**

- Tất cả ảnh có `alt` text
- Tất cả form input có `<label>`
- Navigation có thể dùng bằng phím Tab

- [ ] **Bước 16.4: Kiểm tra `npm run lint`**

```bash
npm run lint
```

Sửa tất cả lỗi ESLint trước khi coi là hoàn thành.

- [ ] **Bước 16.5: Final commit và push**

```bash
git add -A
git commit -m "chore: final polish and lint fixes"
git push origin main
```

Vercel sẽ tự động deploy bản cuối trong 1-2 phút.

---

## Tóm tắt Checklist

| Task | Mô tả | Ưu tiên |
|------|-------|---------|
| 1 | Khởi tạo Next.js + dependencies | 🔴 Bắt buộc |
| 2 | Tailwind theme (màu Công an) | 🔴 Bắt buộc |
| 3 | Sanity Studio setup | 🔴 Bắt buộc |
| 4 | TypeScript types + constants | 🔴 Bắt buộc |
| 5 | Sanity content schemas | 🔴 Bắt buộc |
| 6 | GROQ queries | 🔴 Bắt buộc |
| 7 | Header + Footer layout | 🔴 Bắt buộc |
| 8 | UI components tái sử dụng | 🔴 Bắt buộc |
| 9 | Trang chủ | 🔴 Bắt buộc |
| 10 | Trang Tin tức | 🔴 Bắt buộc |
| 11 | Trang Văn bản pháp luật | 🔴 Bắt buộc |
| 12 | Trang Thủ tục hành chính | 🟡 Quan trọng |
| 13 | Trang Giới thiệu | 🟡 Quan trọng |
| 14 | Form Phản ánh + API | 🔴 Bắt buộc |
| 15 | Vercel deployment | 🔴 Bắt buộc |
| 16 | QA cuối cùng | 🟡 Quan trọng |
