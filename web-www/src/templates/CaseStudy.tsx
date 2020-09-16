import React from 'react';
import { graphql } from 'gatsby';
import { Theme, makeStyles } from '@material-ui/core/styles';

import TopSection from '../sections/case-studies/case-study/TopSection';
import AboutSection from '../sections/case-studies/case-study/AboutSection';
import ContextSection from '../sections/case-studies/case-study/ContextSection';
import ApproachSection from '../sections/case-studies/case-study/ApproachSection';
import FigureSection from '../sections/case-studies/case-study/FigureSection';
import FundingSection from '../sections/case-studies/case-study/FundingSection';
import ConclusionSection from '../sections/case-studies/case-study/ConclusionSection';

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
      <FigureSection {...item.figureSection} />
      <FundingSection {...item.fundingSection} />
      <ConclusionSection {...item.conclusionSection} />
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
        figureSection {
          title
          background {
            childImageSharp {
              fluid(quality: 90) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
          figures {
            title
            spacing
            image {
              childImageSharp {
                fluid(quality: 90) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
        fundingSection {
          details
          results
          next
          image {
            childImageSharp {
              fluid(quality: 90) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
        conclusionSection {
          description
          images {
            title
            image {
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
  }
`;

export default CaseStudy;
