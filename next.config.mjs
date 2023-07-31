
/** @type {import('next').NextConfig} */
const nextConfig = {
    // Configure pageExtensions to include md and mdx
    pageExtensions: ['ts', 'tsx', 'js', 'jsx'],
    // Optionally, add any other Next.js config below
}

// Merge MDX config with Next.js config

export default nextConfig
//module.exports = withMDX(nextConfig)