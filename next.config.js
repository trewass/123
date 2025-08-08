/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // appDir: true, // Удалено, так как это больше не нужно в Next.js 14
  },
  images: {
    domains: ['localhost'],
    formats: ['image/webp', 'image/avif'],
    // Настройки для оптимизации изображений
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Разрешенные форматы
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Настройки для статических файлов
  async headers() {
    return [
      {
        source: '/public/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
        ],
      },
      // Заголовки для PDF файлов
      {
        source: '/documents/:path*',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/pdf',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/videos/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
  // Оптимизация сборки
  webpack: (config, { isServer }) => {
    // Настройки для работы с файловой системой
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
      };
    }
    
    // Настройки для видео файлов
    config.module.rules.push({
      test: /\.(mp4|webm|avi)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/videos/',
          outputPath: 'static/videos/',
        },
      },
    });
    
    return config;
  },
  // Настройки для API routes
  async rewrites() {
    return [
      {
        source: '/api/media/:path*',
        destination: '/api/media/:path*',
      },
    ]
  },
  // Настройки для статических файлов
  async redirects() {
    return [
      {
        source: '/documents/:path*',
        destination: '/documents/:path*',
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig 