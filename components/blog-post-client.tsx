"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import type { BlogPost } from "@/lib/blog-data"

export function BlogPostClient({ post }: { post: BlogPost }) {
  const [readProgress, setReadProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY
      const progress = (scrollTop / (documentHeight - windowHeight)) * 100
      setReadProgress(Math.min(progress, 100))
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="fixed top-16 left-0 right-0 h-1 bg-muted z-50">
      <motion.div
        className="h-full bg-primary"
        style={{ width: `${readProgress}%` }}
        initial={{ width: 0 }}
        animate={{ width: `${readProgress}%` }}
      />
    </div>
  )
}
