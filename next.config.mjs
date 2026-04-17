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
      {
        source: "/docs/components/:name((?!react|html)[^/]+)",
        destination: "/docs/components/react/:name",
        permanent: false,
      },
      {
        source: "/docs/components/:name((?!react|html)[^/]+).md",
        destination: "/docs/components/react/:name.md",
        permanent: false,
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
