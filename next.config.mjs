/** @type {import('next').NextConfig} */
const nextConfig = {
  output: undefined, // 👉 saytni to‘liq statik faylga aylantiradi
  // output: 'export',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

export default nextConfig
