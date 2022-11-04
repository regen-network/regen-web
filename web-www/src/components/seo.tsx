/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import SEO from '@regen-network/web-components/lib/components/seo';
import { graphql, useStaticQuery } from 'gatsby';

interface Props {
  description?: string;
  lang?: string;
  title: string;
  imageUrl?: string;
  location?: Location;
}

function SEOWebsite({
  location,
  description = '',
  lang = 'en',
  imageUrl,
  title,
}: Props): JSX.Element {
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
