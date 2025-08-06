import withBundleAnalyzer from '@next/bundle-analyzer';
import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    swcPlugins: [['@lingui/swc-plugin', {}]],
    // Optimize imports to reduce bundle size in development and production
    optimizePackageImports: [
      '@mui/material',
      '@mui/lab',
      '@lingui/macro',
      'lodash',
    ],
    // Set the root for Next.js file tracing to the monorepo root
    outputFileTracingRoot: path.join(__dirname, '..'),
    // Exclude problematic packages from the server functions
    outputFileTracingExcludes: {
      '*': [
        './node_modules/canvas',
        './node_modules/@img/sharp-libvips-linux-x64',
        './node_modules/@img/sharp-libvips-linuxmusl-x64',
        './node_modules/sharp',
        './node_modules/@keplr-wallet',
        './node_modules/@ledgerhq',
        './node_modules/@ethereumjs',
        './node_modules/mapbox-gl',
        './node_modules/libsodium-sumo.js',
        './node_modules/@regen-network/api',
        './node_modules/chain-registry',
        './node_modules/pdfjs-dist',
        './node_modules/xlsx',
      ],
    },
  },
  // Handle how the server will dispose or keep in memory built pages in development
  onDemandEntries: {
    // pages will stay in memory for 15 minutes after their last access before being disposed to improve dev performance
    maxInactiveAge: 15 * 60 * 1000,
    // number of pages that should be kept simultaneously in memory to avoid re-compilation
    pagesBufferLength: 5,
  },
  serverExternalPackages: [
    'electron',
    'pino-pretty',
    'lokijs',
    'encoding',
    'canvas',
    'sharp',
    '@keplr-wallet',
    '@ledgerhq',
    '@ethereumjs',
    'mapbox-gl',
    'libsodium-sumo.js',
    '@regen-network/api',
    'chain-registry',
    'pdfjs-dist',
    'xlsx',
  ],
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
      {
        protocol: 'https',
        hostname: 'regen-registry.s3.us-east-1.amazonaws.com',
        port: '',
      },
    ],
  },
  // Handle how the server will dispose or keep in memory built pages in development
  onDemandEntries: {
    // pages will stay in memory for 15 minutes after their last access before being disposed to improve dev performance
    maxInactiveAge: 15 * 60 * 1000,
    // number of pages that should be kept simultaneously in memory to avoid re-compilation
    pagesBufferLength: 5,
  },
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
  webpack: (config, { webpack }) => {
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
