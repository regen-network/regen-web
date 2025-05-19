/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // Outputs a Single-Page Application (SPA).
  distDir: './dist', // Changes the build output directory to `./dist/`.
  experimental: {
    swcPlugins: [['@lingui/swc-plugin', {}]],
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

export default nextConfig;
