/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: 'akamai',
    path: '',
  },
  productionBrowserSourceMaps: true,
  assetPrefix: '/fotollama/',
  basePath: '/fotollama',
};

module.exports = nextConfig;
