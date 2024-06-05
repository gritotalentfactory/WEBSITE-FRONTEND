// next.config.js

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'website-backend-f3rimfzy3-grito-talent-agency.vercel.app',
        pathname: '/uploads/**',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL
  },
  async headers() {
    return [
        {
            // matching all API routes
            source: "/api/:path*",
            headers: [
                { key: "Access-Control-Allow-Credentials", value: "true" },
                { key: "Access-Control-Allow-Origin", value: "*" }, 
                { key: "Access-Control-Allow-Methods", value: "*" },
                { key: "Access-Control-Allow-Headers", value: "*" },
            ]
        }
    ]
}

};



