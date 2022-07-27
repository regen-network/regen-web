import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import MarkdownSection from '../components/MarkdownSection';
import SEO from '../components/seo';

interface props {
  location: Location;
}

const TermsService = ({ location }: props): JSX.Element => {
  const data = useStaticQuery(graphql`
    query {
      markdownRemark(fileAbsolutePath: { regex: "/^.*/terms-service.md$/" }) {
        html
      }
    }
  `);
  return (
    <>
      <SEO
        title="Terms of Service"
        location={location}
        description="Regen Network aligns economics with ecology to drive regenerative land management."
      />
      <MarkdownSection
        title="Terms of Service"
        mdContent={data.markdownRemark.html}
      />
    </>
  );
};

export default TermsService;
