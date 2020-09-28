import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import SEO from '../components/seo';
import MarkdownSection from '../components/MarkdownSection';

interface props {
  location: object;
}
const PrivacyPolicy = ({ location }: props): JSX.Element => {
  const data = useStaticQuery(graphql`
    query {
      markdownRemark(fileAbsolutePath: { regex: "/^.*/privacy-policy.md$/" }) {
        html
      }
    }
  `);
  return (
    <>
      <SEO title="Privacy Policy" location={location} />
      <MarkdownSection title="Privacy Policy" mdContent={data.markdownRemark.html} />
    </>
  );
};

export default PrivacyPolicy;
