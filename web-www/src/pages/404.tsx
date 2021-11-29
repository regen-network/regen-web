import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import SEO from '../components/seo';
import NotFound from 'web-components/lib/components/not-found';

interface props {
  location: Location;
}

const NotFoundPage = ({ location }: props): JSX.Element => {
  const data = useStaticQuery(graphql`{
  grazing: file(relativePath: {eq: "rotational-grazing.png"}) {
    childImageSharp {
      gatsbyImageData(quality: 90, layout: FULL_WIDTH)
    }
  }
}
`);

  return <>
    <SEO location={location} title="404: Not found" />
    <NotFound img={<GatsbyImage image={data.grazing.childImageSharp.gatsbyImageData} />} />
  </>;
};

export default NotFoundPage;
