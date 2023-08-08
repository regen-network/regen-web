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
        source: '/team',
        destination: '/',
        permanent: false,
      },
      {
        source: '/fund',
        destination: '/',
        permanent: false,
      },
      {
        source: '/partners',
        destination: '/',
        permanent: false,
      },
      {
        source: '/developers',
        destination: '/',
        permanent: false,
      },
      {
        source: '/validators',
        destination: '/',
        permanent: false,
      },
      {
        source: '/mainnet',
        destination: '/',
        permanent: false,
      },
      {
        source: '/community',
        destination: '/',
        permanent: false,
      },
      {
        source: '/science',
        destination: '/',
        permanent: false,
      },
      {
        source: '/case-studies',
        destination: '/',
        permanent: false,
      },
      {
        source: '/case-studies/eco-cacao',
        destination: '/',
        permanent: false,
      },
      {
        source: '/case-studies/fibershed',
        destination: '/',
        permanent: false,
      },
      {
        source: '/case-studies/walkers-institute',
        destination: '/',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
