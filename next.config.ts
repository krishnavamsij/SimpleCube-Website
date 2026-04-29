import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.hyniva.com",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "media.giphy.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "media4.giphy.com",
        pathname: "/**",
      },
    ],
  },
  async rewrites() {
    return [
      // Product pages - clean URLs
      {
        source: '/aira',
        destination: '/products/aira',
      },
      {
        source: '/finxserve',
        destination: '/products/finxserve',
      },
      {
        source: '/claim-pioneer',
        destination: '/products/claim-pioneer',
      },
      {
        source: '/hyper',
        destination: '/products/hyper',
      },
      // Insights pages - clean URLs
      {
        source: '/case-studies',
        destination: '/insights/case-studies',
      },
      {
        source: '/blog',
        destination: '/insights/blog',
      },
    ];
  },
};

export default nextConfig;
