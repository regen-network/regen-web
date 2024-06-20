const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    // If you use remark-gfm, you'll need to use next.config.mjs
    // as the package is ESM only
    // https://github.com/remarkjs/remark-gfm#install
    remarkPlugins: [],
    rehypePlugins: [],
    // If you use `MDXProvider`, uncomment the following line.
    // providerImportSource: "@mdx-js/react",
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure pageExtensions to include md and mdx
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
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
  transpilePackages: ['web-components'],
  outputFileTracingExcludes: {
    '*': ['*/vendored/contexts/amp-context*'],
  },
  async redirects() {
    return [
      {
        source: '/nct',
        destination:
          'https://www.notion.so/regennetwork/A-Guide-to-Nature-Carbon-Ton-NCT-8204ea9d20d0436281f49b8fd1b3fbd2',
        permanent: false,
        basePath: false,
      },
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

module.exports = withMDX(nextConfig);
