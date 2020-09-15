import React from 'react';
import { graphql } from 'gatsby';
import { Theme, makeStyles } from '@material-ui/core/styles';

import TopSection from '../sections/case-studies/case-study/TopSection';
import AboutSection from '../sections/case-studies/case-study/AboutSection';
import ContextSection from '../sections/case-studies/case-study/ContextSection';
import ApproachSection from '../sections/case-studies/case-study/ApproachSection';

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
      <ContextSection {...item.contextSection} />
      <ApproachSection {...item.approachSection} />
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
        contextSection {
          description
          image {
            childImageSharp {
              fluid(quality: 90) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
          challenges {
            text
          }
        }
        approachSection {
          description
          details
          results
          next
          figureTitle
          figureImage {
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
