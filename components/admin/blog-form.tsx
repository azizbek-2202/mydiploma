"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { saveBlogPost, updateBlogPost, getBlogPosts } from "@/lib/blog-store"
import type { BlogPost } from "@/lib/blog-store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { motion } from "framer-motion"

interface BlogFormProps {
  postId?: string
  onClose: () => void
}

const categories = ["Tips", "Guides", "News", "Student Stories", "University Updates"]

export function BlogForm({ postId, onClose }: BlogFormProps) {
  const [post, setPost] = useState<Omit<BlogPost, "id">>({
    title: "",
    excerpt: "",
    content: "",
    author: "",
    category: "Tips",
    date: new Date().toISOString().split("T")[0],
    image: "",
    authorImage: "",
    readTime: "5 min read",
  })

  useEffect(() => {
    if (postId) {
      const posts = getBlogPosts()
      const existing = posts.find((p) => p.id === postId)
      if (existing) {
        const { id, ...rest } = existing
        setPost(rest)
      }
    }
  }, [postId])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (postId) {
      updateBlogPost(postId, post)
    } else {
      saveBlogPost(post)
    }
    onClose()
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl p-8 border border-gray-200 shadow-xl space-y-6 mb-8"
    >
      <h2 className="text-2xl font-bold">{postId ? "Edit Post" : "Create New Blog Post"}</h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <Label>Title</Label>
          <Input
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            required
            placeholder="Blog post title"
          />
        </div>

        <div>
          <Label>Author</Label>
          <Input
            value={post.author}
            onChange={(e) => setPost({ ...post, author: e.target.value })}
            required
            placeholder="Author name"
          />
        </div>

        <div>
          <Label>Category</Label>
          <select
            value={post.category}
            onChange={(e) => setPost({ ...post, category: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <Label>Read Time</Label>
          <Input
            value={post.readTime}
            onChange={(e) => setPost({ ...post, readTime: e.target.value })}
            placeholder="5 min read"
          />
        </div>

        <div>
          <Label>Publication Date</Label>
          <Input type="date" value={post.date} onChange={(e) => setPost({ ...post, date: e.target.value })} required />
        </div>

        <div>
          <Label>Featured Image URL</Label>
          <Input
            value={post.image}
            onChange={(e) => setPost({ ...post, image: e.target.value })}
            placeholder="/blog-post-image.jpg"
          />
        </div>

        <div>
          <Label>Author Image URL</Label>
          <Input
            value={post.authorImage}
            onChange={(e) => setPost({ ...post, authorImage: e.target.value })}
            placeholder="/author-photo.jpg"
          />
        </div>
      </div>

      <div>
        <Label>Excerpt</Label>
        <Textarea
          value={post.excerpt}
          onChange={(e) => setPost({ ...post, excerpt: e.target.value })}
          required
          placeholder="Short summary of the post..."
          rows={2}
        />
      </div>

      <div>
        <Label>Content</Label>
        <Textarea
          value={post.content}
          onChange={(e) => setPost({ ...post, content: e.target.value })}
          required
          placeholder="Full blog post content..."
          rows={6}
        />
      </div>

      <div className="flex gap-4">
        <Button type="submit" className="bg-gradient-to-r from-purple-600 to-purple-700">
          {postId ? "Update Post" : "Publish Post"}
        </Button>
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </motion.form>
  )
}
