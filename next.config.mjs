/** @type {import('next').NextConfig} */
const repoName = process.env.GITHUB_ACTIONS ? 'Nishaan-a' : ''

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  reactStrictMode: true,
  poweredByHeader: false,
  basePath: repoName ? `/${repoName}` : '',
  assetPrefix: repoName ? `/${repoName}/` : '',
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
}
export default nextConfig
