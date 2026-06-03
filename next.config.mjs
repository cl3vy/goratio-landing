/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Emit a fully static site into ./out (works on any static host).
  output: "export",
  // Static hosts serve /privacy as /privacy/index.html — emit trailing-slash dirs.
  trailingSlash: true,
  images: { unoptimized: true },
  eslint: {
    // Lint is run separately; don't block production builds on it.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
