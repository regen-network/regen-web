import NodeGlobalsPolyfillPlugin from '@esbuild-plugins/node-globals-polyfill';
import { lingui } from '@lingui/vite-plugin';
import inject from '@rollup/plugin-inject';
import react from '@vitejs/plugin-react';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, loadEnv } from 'vite';
import vitePluginRequire from 'vite-plugin-require';
import svgrPlugin from 'vite-plugin-svgr';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig(({ mode }) => {
  const isDev = mode === 'development';
  const env = loadEnv(mode, process.cwd());
  const index =
    env.NEXT_PUBLIC_MARKETPLACE_CLIENT === 'terrasos'
      ? 'terrasos/index.html'
      : 'index.html';
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
        clients: path.resolve(__dirname, 'src/clients'),
        test: path.resolve(__dirname, '../test'),
      },
    },
    build:
      mode === 'production'
        ? {
            outDir: 'build',
            rollupOptions: {
              plugins: [inject({ Buffer: ['buffer/', 'Buffer'] })],
              input: path.join(__dirname, index),
            },
          }
        : undefined,
    plugins: [
      react({
        babel: {
          plugins: ['macros'],
        },
      }),
      lingui(),
      viteTsconfigPaths(),
      svgrPlugin(),
      vitePluginRequire.default(),
      visualizer(),
      createHtmlPlugin({
        template: index,
      }),
    ],
    define: isDev ? { global: {} } : { 'process.env': {} },
    optimizeDeps: {
      esbuildOptions: {
        plugins:
          mode === 'development'
            ? [
                NodeGlobalsPolyfillPlugin.default({
                  buffer: true,
                  process: true,
                }),
              ]
            : undefined,
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './test/setup.ts',
    },
  };
});
