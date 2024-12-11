/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' https://www.facebook.com"
          }
        ],
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/dashboard/social-accounts',
        destination: '/dashboard/accounts',
      },
    ]
  },
  webpack(config, { isServer, dev }) {
    if (!isServer && dev) {
      config.watchOptions = {
        ...config.watchOptions,
        poll: 800,
      }
    }
    return config
  },
  images: {
    domains: ['localhost'],
  },
  // Add HTTP server configuration
  server: {
    https: true,
    // Disable certificate validation in development
    httpsOptions: {
      rejectUnauthorized: false
    }
  }
}

module.exports = nextConfig
