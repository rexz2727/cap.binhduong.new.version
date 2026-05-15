// TODO: Task 8 — Card hiển thị tin tức (ảnh, badge category, ngày, tiêu đề, excerpt)
import type { NewsPostPreview } from "@/types/news";
export default function NewsCard({ post }: { post: NewsPostPreview }) {
  return <article>{post.title}</article>;
}
