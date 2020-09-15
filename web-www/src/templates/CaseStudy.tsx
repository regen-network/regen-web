import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Theme, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import TopSection from '../sections/case-studies/case-study/TopSection';
import AboutSection from '../sections/case-studies/case-study/AboutSection';

const useStyles = makeStyles((theme: Theme) => ({}));

interface Props {
  allCaseStudyItemsYaml: {
    nodes: object[];
  };
}

const CaseStudy = ({ data }: Props): JSX.Element => {
  if (data.allCaseStudyItemsYaml.nodes.length !== 1) {
    return <></>;
  }
  const item = data.allCaseStudyItemsYaml.nodes[0];
  return (
    <>
      <TopSection background={item.background} name={item.name} />
      <AboutSection {...item.aboutSection} />
    </>
  );
};

export const query = graphql`
  query($slug: String!) {
    allCaseStudyItemsYaml(filter: { slug: { eq: $slug } }) {
      nodes {
        id
        name
        slug
        description
        background {
          childImageSharp {
            fluid(quality: 90) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        aboutSection {
          about
          practice
          biome
          region
          lineRotate
          lineWidth
          aboutImage {
            publicURL
          }
          mapImage {
            childImageSharp {
              fluid(quality: 90) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    }
  }
`;

export default CaseStudy;
