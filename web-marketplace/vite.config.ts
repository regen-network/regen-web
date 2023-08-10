import NodeGlobalsPolyfillPlugin from '@esbuild-plugins/node-globals-polyfill';
import inject from '@rollup/plugin-inject';
import react from '@vitejs/plugin-react';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import vitePluginRequire from 'vite-plugin-require';
import svgrPlugin from 'vite-plugin-svgr';
import viteTsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => {
  const isDev = mode === 'development';

  return {
    server: {
      port: 3000,
    },
    resolve: {
      alias: {
        components: path.resolve(__dirname, 'src/components'),
        lib: path.resolve(__dirname, 'src/lib'),
        routes: path.resolve(__dirname, 'src/routes'),
        generated: path.resolve(__dirname, 'src/generated'),
        pages: path.resolve(__dirname, 'src/pages'),
        features: path.resolve(__dirname, 'src/features'),
        hooks: path.resolve(__dirname, 'src/hooks'),
        styles: path.resolve(__dirname, 'src/styles'),
        utils: path.resolve(__dirname, 'src/utils'),
        assets: path.resolve(__dirname, 'src/assets'),
        config: path.resolve(__dirname, 'src/config'),
        ledger: path.resolve(__dirname, 'src/ledger'),
      },
    },
    build:
      mode === 'production'
        ? {
            outDir: 'build',
            rollupOptions: {
              plugins: [inject({ Buffer: ['buffer', 'Buffer'] })],
            },
          }
        : undefined,
    plugins: [
      react(),
      viteTsconfigPaths(),
      svgrPlugin(),
      vitePluginRequire(),
      visualizer(),
    ],
    define: isDev ? { global: {} } : { 'process.env': {} },
    optimizeDeps: {
      esbuildOptions: {
        plugins:
          mode === 'development'
            ? [
                NodeGlobalsPolyfillPlugin({
                  buffer: true,
                  process: true,
                }),
              ]
            : undefined,
      },
    },
  };
});
