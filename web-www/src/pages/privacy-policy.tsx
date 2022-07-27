import React from 'react';
import { graphql, PageProps, useStaticQuery } from 'gatsby';

import MarkdownSection from '../components/MarkdownSection';
import SEO from '../components/seo';

const PrivacyPolicy: React.FC<PageProps> = ({ location }) => {
  const data = useStaticQuery(graphql`
    query {
      markdownRemark(fileAbsolutePath: { regex: "/^.*/privacy-policy.md$/" }) {
        html
      }
    }
  `);
  return (
    <>
      <SEO
        title="Privacy Policy"
        location={location}
        description="Regen Network aligns economics with ecology to drive regenerative land management."
      />
      <MarkdownSection
        title="Privacy Policy"
        mdContent={data?.markdownRemark?.html || ''}
      />
    </>
  );
};

export default PrivacyPolicy;
