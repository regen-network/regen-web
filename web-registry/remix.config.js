/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  appDirectory: 'app',
  ignoredRouteFiles: ['**/.*'],
  assetsBuildDirectory: 'public/build',
  publicPath: '/build/',
  serverBuildPath: 'build/index.js',
  serverBuildTarget: 'node-cjs',
  serverDependenciesToBundle: ['@apollo/client', 'zen-observable-ts'],
};
