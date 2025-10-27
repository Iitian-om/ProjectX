/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  // Disable Turbopack due to instability on Windows - use webpack instead
  turbo: false,
  // Add other Next.js config options here as needed
};

export default nextConfig; 