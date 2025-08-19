## Debugging Failed Function Bundles

The only way we found to debug this is by uploading the failed function bundle to Dropbox (that's the only cloud storage I could find which provides an easy-enough way to upload files via API). You could follow this guide: [Generate an access token for your own account - Dropbox](https://www.dropbox.com/developers/documentation/http/documentation#auth-token).

1. Generate a temporary access token for a Dropbox account. You can set that token as an environment variable with the name `DROPBOX` in Netlify.
2. Copy the current folder in the root of the application where you are experiencing the `250 MB limit` error. i.e: `web-marketplace/netlify-plugin-upload-function-bundle`).
    * The folder should contain an `index.js` file with the script to upload the function bundle to Dropbox.
    * In the same folder, there should be a `manifest.yml` file too.
5. Finally, add or modify your `netlify.toml` with the following code:

```toml
[[plugins]]
  package = "./netlify-plugin-upload-function-bundle/"

  // The path should be relative to the base path configured in site settings in Netlify.
```


Once you run a deploy with this, on every failure, you should get the Function bundle uploaded to Dropbox. Then you can download that bundle and inspect it to find what dependencies are inflating the bundle size and exclude them in the `[functions]/included_files` section in the `Netlify.toml`:

```js
[functions]
  included_files = [
    "!node_modules/PACKAGE_TO_EXCLUDE/**/*",
  ]
```
 and the `outputFileTracingExcludes` section in the `next.config.mjs`:

```js
outputFileTracingExcludes: {
    '*': [
      './node_modules/PACKAGE_TO_EXCLUDE',
    ],
```
