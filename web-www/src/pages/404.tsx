import React from 'react';
import { graphql, PageProps, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';

import NotFound from 'web-components/lib/components/not-found';

import SEO from '../components/seo';

const NotFoundPage: React.FC<PageProps> = ({ location }) => {
  const data = useStaticQuery(graphql`
    {
      grazing: file(relativePath: { eq: "rotational-grazing.png" }) {
        childImageSharp {
          fluid(quality: 90) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `);

  return (
    <>
      <SEO location={location} title="404: Not found" />
      <NotFound img={<Img fluid={data.grazing.childImageSharp.fluid} />} />
    </>
  );
};

export default NotFoundPage;
