/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

interface propTypes {
  description?: string;
  lang: string;
  meta: Array<string>;
  title: string;
  imageUrl?: string;
  location: object;
}

export const defaultDescription: string =
  'Buy and sell ecosystem service credits at the open marketplace for climate solutions.';

function SEO({
  location,
  description = defaultDescription,
  lang,
  imageUrl,
  meta,
  title,
}: propTypes): JSX.Element {
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
  const path = location ? location.pathname : '';
  const metaDescription = description || site.siteMetadata.description;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
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
          content: seoImageUrl,
        },
        {
          property: `og:url`,
          content: `${site.siteMetadata.siteUrl}${path}`,
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
          content: site.siteMetadata.author,
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
          content: seoImageUrl,
        },
      ]}
    />
  );
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
};

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
};

export default SEO;
