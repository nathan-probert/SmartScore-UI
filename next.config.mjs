export default {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'],
  reactStrictMode: true,
  output: 'standalone',
  basePath: '',  // No base path for local or production. Keep it at the root level.
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',  // Don't change the asset prefix; keep it the same for development and production
  async rewrites() {
    return [
      {
        source: '/images/:path*',
        destination: '/public/images/:path*',  // Images are served from the public folder
      },
    ];
  },
};
