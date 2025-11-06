// empty shim used in the turbopack config in next.config.mjs to
// ignore modules like we do in webpack config with resolve.alias
// because turbopack aliases don't support boolean values,
// so we need to use a shim to ignore the module
export {};
