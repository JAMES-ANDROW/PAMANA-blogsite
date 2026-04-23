/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: false,
  },
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  compress: true,
  poweredByHeader: false,
  webpack: (config, { isServer, dev }) => {
    if (!dev && !isServer) {
      // Obfuscate client-side code in production
      config.optimization.minimize = true;
    }
    return config;
  },
}

module.exports = nextConfig
