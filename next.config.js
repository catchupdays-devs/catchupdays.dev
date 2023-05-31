/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  async headers() {
    return [
      {
        source: "/api/organization",
        headers: [
          {
            key: "Cache-Control",
            value: "s-maxage=0, stale-while-revalidate=59",
          },
        ],
      },
      {
        source: "/api/filter",
        headers: [
          {
            key: "Cache-Control",
            value: "s-maxage=0, stale-while-revalidate=59",
          },
        ],
      },
      {
        source: "/api/wishlist",
        headers: [
          {
            key: "Cache-Control",
            value: "s-maxage=0, stale-while-revalidate=59",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
