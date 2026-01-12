/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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

module.exports = nextConfig;
