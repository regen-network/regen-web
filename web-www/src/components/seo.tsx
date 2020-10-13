/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import SEO from 'web-components/lib/components/seo';

interface propTypes {
  description?: string;
  lang?: string;
  title: string;
  imageUrl?: string;
  location?: {
    pathname: string;
  };
}

function SEOWebsite({ location, description = '', lang = 'en', imageUrl, title }: propTypes): JSX.Element {
  const { seoImage, site } = useStaticQuery(
    graphql`
      query {
        seoImage: file(relativePath: { eq: "science.png" }) {
          publicURL
        }
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
          }
        }
      }
    `,
  );

  const seoImageUrl = imageUrl || seoImage.publicURL;

  return (
    <SEO
      title={title}
      location={location}
      lang={lang}
      imageUrl={seoImageUrl}
      description={description}
      siteMetadata={site.siteMetadata}
    />
  );
}

export default SEOWebsite;
