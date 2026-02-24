const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable gzip/brotli compression (Vercel handles this automatically, useful for local dev)
  compress: true,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'maps.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },

  // Security & performance headers (for local dev; Vercel also applies vercel.json headers)
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(self)',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://plausible.io https://*.umami.is",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "img-src 'self' data: blob: https://maps.googleapis.com https://lh3.googleusercontent.com https://tile.openstreetmap.org https://*.tile.openstreetmap.org",
              "font-src 'self' https://fonts.gstatic.com",
              `connect-src 'self' ${apiUrl} https://maps.googleapis.com https://plausible.io https://*.umami.is https://tile.openstreetmap.org https://*.tile.openstreetmap.org`,
              "frame-src 'self' https://www.google.com https://maps.google.com",
              "worker-src 'self'",
              "manifest-src 'self'",
            ].join('; '),
          },
        ],
      },
    ];
  },
};

module.exports = withNextIntl(nextConfig);

