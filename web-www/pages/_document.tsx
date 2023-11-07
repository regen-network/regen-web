import { Head, Html, Main, NextScript } from 'next/document';

import { augmentDocumentWithEmotionCache } from './_app';

const Document = () => {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="stylesheet"
          type="text/css"
          charSet="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
        <script src="/regenie.js" async />
      </body>
    </Html>
  );
};

augmentDocumentWithEmotionCache(Document);

export default Document;
