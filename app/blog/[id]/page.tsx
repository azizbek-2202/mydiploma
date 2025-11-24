// blog/[id]/page.tsx
import { fetchBlogPostsStatic } from "@/lib/api-blog";
import BlogDetailsClient from "./blog-details";

export async function generateStaticParams() {
  const posts = await fetchBlogPostsStatic();

  if (!posts.length) {
    console.warn("[STATIC PARAMS] No blog posts found!");
    return [{ id: "1" }]; // fallback minimal id
  }

  return posts
    .filter((post) => post.id)
    .map((post) => ({
      id: String(post.id),
    }));
}

export default function BlogPostPage({ params }: { params: { id: string } }) {
  return <BlogDetailsClient id={params.id} />;
}