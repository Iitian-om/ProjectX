/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable Turbopack for stable development experience
  // Turbopack is experimental and has known issues on Windows
  experimental: {
    turbo: undefined, // This disables Turbopack
  },
  reactStrictMode: true,
};

export default nextConfig;
