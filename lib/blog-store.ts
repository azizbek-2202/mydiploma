export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  category: string
  date: string
  image: string
  authorImage: string
  readTime: string
}

export const getBlogPosts = (): BlogPost[] => {
  if (typeof window === "undefined") return []
  const posts = localStorage.getItem("mydiploma_blog_posts")
  return posts ? JSON.parse(posts) : []
}

export const saveBlogPost = (post: Omit<BlogPost, "id">) => {
  const posts = getBlogPosts()
  const newPost: BlogPost = {
    ...post,
    id: Math.random().toString(36).substring(2, 11),
  }
  posts.push(newPost)
  localStorage.setItem("mydiploma_blog_posts", JSON.stringify(posts))
  return newPost
}

export const updateBlogPost = (id: string, post: Omit<BlogPost, "id">) => {
  const posts = getBlogPosts()
  const index = posts.findIndex((p) => p.id === id)
  if (index !== -1) {
    posts[index] = { ...post, id }
    localStorage.setItem("mydiploma_blog_posts", JSON.stringify(posts))
  }
}

export const deleteBlogPost = (id: string) => {
  const posts = getBlogPosts()
  const filtered = posts.filter((p) => p.id !== id)
  localStorage.setItem("mydiploma_blog_posts", JSON.stringify(filtered))
}
