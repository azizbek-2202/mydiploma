"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { fetchBlogPosts, BlogPost } from "@/lib/api-blog"

export default function BlogPage() {
  const { locale } = useLanguage()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState("All")

  const heroRef = useRef(null)
  const postsRef = useRef(null)

  const heroInView = useInView(heroRef, { once: true })
  const postsInView = useInView(postsRef, { once: true, margin: "-100px" })

  useEffect(() => {
    async function loadPosts() {
      try {
        const data = await fetchBlogPosts()
        setPosts(data)
      } catch {
        setError("Failed to load posts")
      } finally {
        setLoading(false)
      }
    }
    loadPosts()
  }, [])

  // TRANSLATIONS FIX: backend -> t.lang === locale
  const filteredPosts = posts
    .map((post) => {
      const translation =
        post.translations?.find((t) => t.lang === locale) ||
        post.translations?.[0]

      if (!translation) return null

      return {
        id: post.id!,
        title: translation.title || translation.name || "Untitled",
        excerpt: translation.desc || translation.level || "",
        date: translation.createDay || post.date,
        readTime: post.time || "8 min read",
        category: translation.yonalish || "General",
        image: post.image,
        userImage: post.userImage,
        author: post.name,
      }
    })
    .filter(
      (post) =>
        post &&
        (selectedCategory === "All" || post.category === selectedCategory)
    ) as Array<{
      id: string
      title: string
      excerpt: string
      date?: string
      readTime?: string
      category: string
      image?: string
      userImage?: string
      author?: string
    }>

  const categories = ["All", "Study", "Visa", "Guides"]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section ref={heroRef} className="relative py-32 gradient-bg overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center space-y-6"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">
              Insights & <span className="text-primary">Resources</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              Expert advice, guides, and stories to help you navigate your study abroad journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-muted/30 sticky top-16 z-40 backdrop-blur-sm">
        <div className="container mx-auto px-4 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="whitespace-nowrap"
            >
              {category}
            </Button>
          ))}
        </div>
      </section>

      {/* Blog Posts */}
      <section ref={postsRef} className="py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <p className="text-center text-lg text-muted-foreground py-20">Loading posts...</p>
          ) : error ? (
            <p className="text-center text-red-500 py-20">{error}</p>
          ) : filteredPosts.length === 0 ? (
            <p className="text-center text-muted-foreground py-20">
              No posts found in this category.
            </p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={postsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="group"
                >
                  <Link href={`/blog/${post.id}`}>
                    <div className="h-full rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl overflow-hidden">
                      {post.image && (
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-48 object-cover"
                        />
                      )}

                      <div className="p-6 space-y-4">
                        <h2 className="text-xl font-bold group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h2>

                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                          {post.excerpt}
                        </p>

                        <div className="flex items-center gap-4 pt-4 border-t border-border text-xs text-muted-foreground">
                          <span>
                            {post.date && new Date(post.date).toLocaleDateString()}
                          </span>
                          <span>{post.readTime}</span>
                        </div>

                        {post.author && (
                          <div className="flex items-center gap-2 mt-2">
                            {post.userImage && (
                              <img
                                src={post.userImage}
                                className="h-8 w-8 rounded-full object-cover"
                                alt={post.author}
                              />
                            )}
                            <span className="text-sm">{post.author}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-24 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-balance">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-xl text-muted-foreground mt-4">
            Our expert counselors can help you discover the perfect program tailored to your goals.
          </p>
          <Button asChild size="lg" className="mt-6 bg-primary text-primary-foreground hover:bg-primary/90">
            <a href="/contact">Get Personalized Guidance</a>
          </Button>
        </div>
      </section>
    </div>
  )
}
