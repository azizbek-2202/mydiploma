"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Trash2, Edit2, Plus, ArrowLeft } from "lucide-react";
import Link from "next/link";

import BlogAddForm from "@/components/admin/blog-add-form";
import BlogEditForm from "@/components/admin/blog-edit-form";

import {
  fetchBlogPosts,
  deleteBlogPost,
} from "@/lib/api-blog";
import type { BlogPost } from "@/lib/api-blog";

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // LOAD POSTS
  const loadPosts = async () => {
    try {
      setIsLoading(true);
      const fetchedPosts = await fetchBlogPosts();
      setPosts(fetchedPosts);
    } catch (error) {
      console.error("Failed to load blog posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  // DELETE POST
  const handleDelete = async (id: string) => {
    if (!confirm("Do you really want to delete this post?")) return;
    try {
      await deleteBlogPost(id);
      await loadPosts();
    } catch (error) {
      console.error("Failed to delete post:", error);
      alert("Delete failed");
    }
  };

  // CLOSE FORM → refresh posts
  const handleFormClose = async () => {
    setIsAdding(false);
    setEditingId(null);
    await loadPosts();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 p-6">
      {/* BACK BUTTON */}
      <Link href="/mydiploma">
        <Button variant="outline" className="mb-6 gap-2 bg-transparent">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
      </Link>

      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Blog Management</h1>
          <Button
            onClick={() => setIsAdding(true)}
            className="gap-2 bg-gradient-to-r from-purple-600 to-purple-700"
          >
            <Plus className="w-4 h-4" />
            Add Post
          </Button>
        </div>

        {/* LOADING */}
        {isLoading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-600 text-lg mb-4">Loading blog posts...</p>
          </motion.div>
        ) : isAdding ? (
          <BlogAddForm onClose={handleFormClose} />
        ) : editingId ? (
          <BlogEditForm postId={editingId} onClose={handleFormClose} />
        ) : posts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-600 text-lg mb-4">No blog posts yet</p>
            <Button onClick={() => setIsAdding(true)} className="gap-2">
              <Plus className="w-4 h-4" />
              Create First Post
            </Button>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group relative"
              >
                <div className="h-full rounded-2xl bg-white border border-gray-200 hover:border-purple-400 hover:shadow-lg transition-all duration-300 overflow-hidden">
                  {/* BLOG IMAGE */}
                  {post.image && (
                    <img
                      src={post.image}
                      alt={post.translations?.[0]?.title || "Blog Image"}
                      className="w-full h-48 object-cover"
                    />
                  )}

                  <div className="p-6 space-y-3">
                    {/* TITLE */}
                    <h2 className="text-xl font-bold group-hover:text-purple-700 transition-colors line-clamp-2">
                      {post.translations?.[0]?.title || "Untitled"}
                    </h2>

                    {/* EXCERPT */}
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {post.translations?.[0]?.desc || ""}
                    </p>

                    {/* META INFO */}
                    <div className="flex items-center gap-4 pt-4 border-t border-gray-200 text-xs text-gray-500">
                      {post.date && (
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                      )}
                      {post.readTime && <span>{post.readTime} min read</span>}
                    </div>

                    {/* AUTHOR */}
                    {post.name && (
                      <div className="flex items-center gap-2 mt-2">
                        {post.userImage && (
                          <img
                            src={post.userImage}
                            className="h-8 w-8 rounded-full object-cover"
                            alt={post.name}
                          />
                        )}
                        <span className="text-sm text-gray-700">{post.name}</span>
                      </div>
                    )}
                  </div>

                  {/* EDIT & DELETE BUTTONS */}
                  <div className="absolute top-3 right-3 flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-1 cursor-pointer"
                      onClick={() => setEditingId(post.id!)}
                    >
                      <Edit2 className="w-4 h-4" /> Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="gap-1 cursor-pointer"
                      onClick={() => handleDelete(post.id!)}
                    >
                      <Trash2 className="w-4 h-4" /> Delete
                    </Button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
