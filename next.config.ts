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
  async redirects() {
    return [
      {
        source: '/blog',
        destination: '/blogs',
        permanent: true,
      },
      {
        source: '/blog/:path*',
        destination: '/blogs/:path*',
        permanent: true,
      },
      {
        source: '/insights/blog',
        destination: '/insights/blogs',
        permanent: true,
      },
      {
        source: '/insights/blog/:path*',
        destination: '/insights/blogs/:path*',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      // Product pages - clean URLs
      {
        source: '/aira',
        destination: '/aira',
      },
      {
        source: '/finxserve',
        destination: '/finxserve',
      },
      {
        source: '/claim-pioneer',
        destination: '/claim-pioneer',
      },
      {
        source: '/hyper',
        destination: '/hyper',
      },
      // Services pages - clean URLs
      {
        source: '/digital-transformation',
        destination: '/services/digital-transformation',
      },
      {
        source: '/salesforce',
        destination: '/services/salesforce',
      },
      {
        source: '/microsoft-services',
        destination: '/services/microsoft-services',
      },
      {
        source: '/aws-cloud-services',
        destination: '/services/aws-cloud-services',
      },
      {
        source: '/applied-ai',
        destination: '/services/applied-ai',
      },
      {
        source: '/data-intelligence',
        destination: '/services/data-intelligence',
      },
      {
        source: '/product-development',
        destination: '/services/product-development',
      },
      {
        source: '/business-it-strategy',
        destination: '/services/it-strategy',
      },
      {
        source: '/cloud-migration',
        destination: '/services/cloud-migration',
      },
      // Insights pages - clean URLs
      {
        source: '/case-studies',
        destination: '/insights/case-studies',
      },
      {
        source: '/case-studies/:path*',
        destination: '/insights/case-studies/:path*',
      },
      {
        source: '/blogs',
        destination: '/insights/blogs',
      },
      {
        source: '/blogs/:path*',
        destination: '/insights/blogs/:path*',
      },
    ];
  },
};

export default nextConfig;
