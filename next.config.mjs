/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // 👉 saytni to‘liq statik faylga aylantiradi
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

export default nextConfig
