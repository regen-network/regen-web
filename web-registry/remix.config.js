/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  appDirectory: 'app',
  ignoredRouteFiles: ['**/.*'],
  assetsBuildDirectory: 'public/build',
  serverDependenciesToBundle: ['@apollo/client', 'zen-observable-ts'],
};
