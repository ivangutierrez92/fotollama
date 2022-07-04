/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: 'akamai',
    path: '',
  },
  productionBrowserSourceMaps: true,
  assetPrefix: '/fotollama-next/',
  basePath: '/fotollama-next',
};

module.exports = nextConfig;
