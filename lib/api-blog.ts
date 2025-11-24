import { apiCall } from "./api-config"

// lib/api-blog.ts
export interface BlogPost {
  id?: string;
  date?: string;
  image?: string;
  userImage?: string;
  name?: string;
  category?: string;
  translations: Array<{
    language: string;
    title: string;
    desc: string;
  }>;
}

/* ====================================================================
   STATIC EXPORT uchun fetch (FAQAT build vaqtida ishlaydi)
==================================================================== */
export const fetchBlogPostsStatic = async (): Promise<BlogPost[]> => {
  try {
    const res = await fetch("http://165.227.135.146:3000/blog", {
      cache: "force-cache",
    });
    if (!res.ok) return [];
    const posts = await res.json();
    return Array.isArray(posts) ? posts.filter((p) => p.id) : [];
  } catch (err) {
    console.error("[STATIC] blog list error:", err);
    return [];
  }
};

/* ====================================================================
   Client / Admin panel uchun fetchlar
==================================================================== */
export const fetchBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    return await apiCall("GET", "POSTS");
  } catch (err) {
    console.error("[API] fetch blog posts error:", err);
    return [];
  }
};

export const fetchBlogPostById = async (id: string): Promise<BlogPost | null> => {
  try {
    const res = await fetch(`http://165.227.135.146:3000/blog/${id}`);
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.error("[API] fetch blog post by id error:", err);
    return null;
  }
};

// Yangi post yaratish
export const createBlogPost = async (data: FormData) => {
  try {
    return await apiCall("POST", "POSTS", undefined, data, undefined, true)
  } catch (error) {
    console.error("[API] Failed to create blog post:", error)
    throw error
  }
}

// Postni yangilash
export const updateBlogPost = async (id: string, data: FormData) => {
  try {
    return await apiCall("PATCH", "POSTS", id, data)
  } catch (error) {
    console.error("[API] Failed to update blog post:", error)
    throw error
  }
}

// Postni o‘chirish
export const deleteBlogPost = async (id: string) => {
  try {
    return await apiCall("DELETE", "POSTS", id)
  } catch (error) {
    console.error("[API] Failed to delete blog post:", error)
    throw error
  }
}
