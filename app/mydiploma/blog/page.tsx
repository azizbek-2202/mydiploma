"use client"

import { useState, useEffect } from "react"
import { getBlogPosts, deleteBlogPost } from "@/lib/blog-store"
import type { BlogPost } from "@/lib/blog-store"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Trash2, Edit2, Plus, ArrowLeft } from "lucide-react"
import Link from "next/link"
import BlogForm from "@/components/admin/blog-form"

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setIsLoading(true)
        const { fetchBlogPosts } = await import("@/lib/api-blog")
        const fetchedPosts = await fetchBlogPosts()
        setPosts(fetchedPosts)
      } catch (error) {
        console.error("[v0] Failed to load blog posts:", error)
        setPosts(getBlogPosts())
      } finally {
        setIsLoading(false)
      }
    }
    loadPosts()
  }, [])

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this post?")) {
      deleteBlogPost(id)
      setPosts(getBlogPosts())
    }
  }

  const handleFormClose = () => {
    setIsAdding(false)
    setEditingId(null)
    setPosts(getBlogPosts())
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 p-6">
      <Link href="/mydiploma">
        <Button variant="outline" className="mb-6 gap-2 bg-transparent">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
      </Link>

      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Blog Management</h1>
          <Button onClick={() => setIsAdding(true)} className="gap-2 bg-gradient-to-r from-purple-600 to-purple-700">
            <Plus className="w-4 h-4" />
            Add Post
          </Button>
        </div>

        {isLoading ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <p className="text-gray-600 text-lg mb-4">Loading blog posts...</p>
          </motion.div>
        ) : isAdding || editingId ? (
          <BlogForm postId={editingId || undefined} onClose={handleFormClose} />
        ) : (
          <div className="grid gap-6">
            {posts.length === 0 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
                <p className="text-gray-600 text-lg mb-4">No blog posts yet</p>
                <Button onClick={() => setIsAdding(true)} className="gap-2">
                  <Plus className="w-4 h-4" />
                  Create First Post
                </Button>
              </motion.div>
            ) : (
              posts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900">{post.title}</h3>
                      <div className="flex gap-3 mt-2">
                        <span className="inline-block px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-semibold">
                          {post.category}
                        </span>
                        <span className="text-gray-500 text-sm">{post.readTime}</span>
                      </div>
                      <p className="text-gray-600 mt-3 line-clamp-2">{post.excerpt}</p>
                      <p className="text-gray-500 text-sm mt-3">
                        By {post.author} • {new Date(post.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={() => setEditingId(post.id)} variant="outline" size="sm" className="gap-2">
                        <Edit2 className="w-4 h-4" />
                        Edit
                      </Button>
                      <Button onClick={() => handleDelete(post.id)} variant="destructive" size="sm" className="gap-2">
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}
