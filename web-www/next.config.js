/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/fund/',
        destination: '/',
        permanent: true,
      },
      {
        source: '/partners/',
        destination: '/',
        permanent: true,
      },
      {
        source: '/developers/',
        destination: '/',
        permanent: true,
      },
      {
        source: '/validators/',
        destination: '/',
        permanent: true,
      },
      {
        source: '/mainnet/',
        destination: '/',
        permanent: true,
      },
      {
        source: '/community/',
        destination: '/',
        permanent: true,
      },
      {
        source: '/science/',
        destination: '/',
        permanent: true,
      },
      {
        source: '/case-studies/eco-cacao',
        destination: '/',
        permanent: true,
      },
      {
        source: '/case-studies/fibershed',
        destination: '/',
        permanent: true,
      },
      {
        source: '/case-studies/walkers-institute',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
