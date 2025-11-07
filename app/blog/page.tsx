"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { useLanguage } from "@/contexts/language-context"
import { blogPosts, categories } from "@/lib/blog-data"
import { Button } from "@/components/ui/button"
import { Calendar, Clock } from "lucide-react"
import Link from "next/link"

export default function BlogPage() {
  const { t } = useLanguage()
  const [selectedCategory, setSelectedCategory] = useState("All")
  const heroRef = useRef(null)
  const postsRef = useRef(null)

  const heroInView = useInView(heroRef, { once: true })
  const postsInView = useInView(postsRef, { once: true, margin: "-100px" })

  const filteredPosts =
    selectedCategory === "All" ? blogPosts : blogPosts.filter((post) => post.category === selectedCategory)

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
        <div className="container mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
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
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section ref={postsRef} className="py-16">
        <div className="container mx-auto px-4">
          {filteredPosts.length === 0 ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-20">
              <p className="text-xl text-muted-foreground">No posts found in this category.</p>
            </motion.div>
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
                      {/* Image */}
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={post.image || "/placeholder.svg"}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                          {post.category}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 space-y-4">
                        <h2 className="text-xl font-bold group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h2>

                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{post.excerpt}</p>

                        {/* Meta */}
                        <div className="flex items-center gap-4 pt-4 border-t border-border text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{new Date(post.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>

                        {/* Author */}
                        <div className="flex items-center gap-3 pt-2">
                          <img
                            src={post.authorImage || "/placeholder.svg"}
                            alt={post.author}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <div className="text-sm">
                            <p className="font-medium">{post.author}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
