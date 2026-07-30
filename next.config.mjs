/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS === 'true'

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  ...(isGithubActions && {
    output: 'export',
    trailingSlash: true,
    skipTrailingSlashRedirect: true,
    images: { unoptimized: true, formats: ['image/avif', 'image/webp'] },
    basePath: '/Nishaan-a',
    assetPrefix: '/Nishaan-a/',
  }),
}
export default nextConfig