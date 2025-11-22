import { fetchBlogPosts } from "@/lib/api-blog";
import BlogDetailsClient from "./blog-details";

export async function generateStaticParams() {
  const posts = await fetchBlogPosts();

  return posts
    .filter((post) => post.id)
    .map((post) => ({ id: String(post.id) }));
}

export default function BlogPostPage({ params }: { params: { id: string } }) {
  return <BlogDetailsClient id={params.id} />;
}
