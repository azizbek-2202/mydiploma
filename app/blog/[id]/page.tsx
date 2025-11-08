// app/blog/[id]/page.tsx
import { getBlogPost, getAllBlogPosts } from "@/lib/blog-data"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { BlogPostClient } from "@/components/blog-post-client"
import Image from "next/image"

// Server component, shuning uchun use client yo‘q
export async function generateStaticParams() {
  const posts = getAllBlogPosts()
  return posts.map((post) => ({ id: post.id }))
}

interface Props {
  params: { id: string }
}

export default function BlogPostPage({ params }: Props) {
  const post = getBlogPost(params.id)
  if (!post) return <div>Post Not Found</div>

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(post.date))

  return (
    <div className="min-h-screen">
      {/* Client Component: Scroll Progress */}
      <BlogPostClient post={post} />

      {/* Hero Image */}
      <div className="relative h-[60vh] overflow-hidden">
        <Image src={post.image} alt={post.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="absolute top-8 left-4 md:left-8">
          <Button asChild variant="secondary" size="sm" className="gap-2">
            <Link href="/blog">
              <ArrowLeft className="w-4 h-4" /> Back to Blog
            </Link>
          </Button>
        </div>
      </div>

      {/* Article */}
      <article className="container mx-auto px-4 -mt-32 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-2xl p-8 md:p-12 shadow-2xl border border-border mb-12">
            <div className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
              {post.category}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-8">
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-4">
              <Image src={post.authorImage} alt={post.author} width={48} height={48} className="rounded-full" />
              <div>
                <p className="font-semibold">{post.author}</p>
                <p className="text-sm text-muted-foreground">Author</p>
              </div>
            </div>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none mb-16" dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      </article>
    </div>
  )
}
