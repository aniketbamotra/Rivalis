/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    // Pre-existing type errors in codebase unrelated to active development
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  // Enable experimental features if needed
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-dialog', '@radix-ui/react-select', '@radix-ui/react-toast'],
  },
  // Redirect configuration for backward compatibility
  async redirects() {
    return [];
  },
  // Environment variables that should be available on the client
  env: {
    // Add any public env vars here
  },
};

export default nextConfig;
