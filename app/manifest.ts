import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'SmartScore',
    short_name: 'SmartScore',
    description:
      'Track NHL players across this past week and this season to keep your picks ahead of the group.',
    start_url: '/',
    display: 'standalone',
    background_color: '#141720',
    theme_color: '#141720',
    icons: [
      {
        src: '/images/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/images/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
