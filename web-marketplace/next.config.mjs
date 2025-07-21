import withBundleAnalyzer from '@next/bundle-analyzer';
/** @type {import('next').NextConfig} */

const nextConfig = {
  // output: 'export', // Outputs a Single-Page Application (SPA).
  // distDir: './dist', // Changes the build output directory to `./dist/`.
  experimental: {
    swcPlugins: [['@lingui/swc-plugin', {}]],
    // Optimize imports to reduce bundle size in development and production
    optimizePackageImports: [
      '@mui/material',
      '@mui/lab',
      '@lingui/macro',
      'lodash',
    ],
  },
  // Handle how the server will dispose or keep in memory built pages in development
  onDemandEntries: {
    // pages will stay in memory for 15 minutes after their last access before being disposed to improve dev performance
    maxInactiveAge: 15 * 60 * 1000,
    // number of pages that should be kept simultaneously in memory to avoid re-compilation
    pagesBufferLength: 5,
  },
  serverExternalPackages: ['electron', 'pino-pretty', 'lokijs', 'encoding'],
  // Dev environment
  turbopack: {
    rules: {
      '*.po': {
        loaders: [
          {
            loader: '@lingui/loader',
            options: {
              cache: true,
              compact: true,
            },
          },
        ],
        as: '*.js',
      },
    },
    resolveAlias: {
      'rdf-canonize-native': './empty-shim.js',
      electron: './empty-shim.js',
      'pino-pretty': './empty-shim.js',
      lokijs: './empty-shim.js',
      encoding: './empty-shim.js',
    },
  },
  // Move the dev indicators to the bottom right corner to avoid blocking the view of ReactQueryDevtools
  devIndicators: {
    position: 'bottom-right',
  },
  // Production environment
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'regen-registry.s3.amazonaws.com',
        port: '',
      },
    ],
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // https://github.com/sindresorhus/got/issues/345
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /^electron$/,
      }),
    );
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
    config.module.rules.push({
      test: /\.po$/,
      use: '@lingui/loader',
    });
    // https://github.com/digitalbazaar/jsonld.js/issues/567#issuecomment-2823923356
    config.resolve.alias = {
      ...config.resolve.alias,
      'rdf-canonize-native': false,
    };

    return config;
  },
};

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})(nextConfig);
