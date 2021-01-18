import React from 'react';
import { Helmet } from 'react-helmet';

interface SEOProps {
  description?: string;
  lang?: string;
  title: string;
  imageUrl?: string;
  location?: {
    pathname: string;
  };
  siteMetadata: {
    title: string;
    description: string;
    author: string;
    siteUrl: string;
  };
}

function SEO({
  location,
  description = '',
  lang = 'en',
  imageUrl,
  title,
  siteMetadata,
}: SEOProps): JSX.Element {
  const path = location && location.pathname ? location.pathname : '';
  const metaDescription = description || siteMetadata.description;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:image`,
          content: imageUrl,
        },
        {
          property: `og:url`,
          content: `${siteMetadata.siteUrl}${path}`,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        {
          property: `twitter:image`,
          content: imageUrl,
        },
      ]}
    />
  );
}

export default SEO;
