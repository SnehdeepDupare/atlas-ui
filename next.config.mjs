/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  redirects() {
    return [
      {
        source: "/components",
        destination: "/docs/components",
        permanent: true,
      },
      {
        source: "/docs/:path*.mdx",
        destination: "/docs/:path*.md",
        permanent: true,
      },
    ];
  },
  rewrites() {
    return [
      {
        source: "/docs/:path*.md",
        destination: "/llm/:path*",
      },
    ];
  },
};

export default nextConfig;
