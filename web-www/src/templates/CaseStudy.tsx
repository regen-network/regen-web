import React from 'react';
import { graphql, PageProps } from 'gatsby';

import SEO from '../components/seo';
import TopSection from '../sections/case-studies/case-study/TopSection';
import AboutSection from '../sections/case-studies/case-study/AboutSection';
import ContextSection from '../sections/case-studies/case-study/ContextSection';
import ApproachSection from '../sections/case-studies/case-study/ApproachSection';
import FigureSection from '../sections/case-studies/case-study/FigureSection';
import FundingSection from '../sections/case-studies/case-study/FundingSection';
import ConclusionSection from '../sections/case-studies/case-study/ConclusionSection';
import BottomSection from '../sections/case-studies/case-study/BottomSection';

interface Props extends PageProps {
  data: {
    allCaseStudyItemsYaml: {
      nodes: any[];
    };
  };
}

const CaseStudy = ({ data, location }: Props): JSX.Element => {
  if (data.allCaseStudyItemsYaml.nodes.length !== 1) {
    return <></>;
  }
  const item = data.allCaseStudyItemsYaml.nodes[0];
  return (
    <>
      <SEO
        title={item.name}
        location={location}
        description="Explore Regen Network case studies where technology, science and regenerative land use practices intersect."
      />
      <TopSection background={item.background} name={item.name} />
      <AboutSection {...item.aboutSection} />
      <ContextSection {...item.contextSection} />
      <ApproachSection {...item.approachSection} />
      <FigureSection {...item.figureSection} />
      <FundingSection {...item.fundingSection} />
      <ConclusionSection {...item.conclusionSection} />
      <BottomSection {...item.bottomSection} />
    </>
  );
};

export const query = graphql`query ($slug: String!) {
  allCaseStudyItemsYaml(filter: {slug: {eq: $slug}}) {
    nodes {
      id
      name
      slug
      description
      background {
        childImageSharp {
          gatsbyImageData(quality: 90, layout: FULL_WIDTH)
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
            gatsbyImageData(quality: 90, layout: FULL_WIDTH)
          }
        }
      }
      contextSection {
        description
        image {
          childImageSharp {
            gatsbyImageData(quality: 90, layout: FULL_WIDTH)
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
            gatsbyImageData(quality: 90, layout: FULL_WIDTH)
          }
        }
      }
      figureSection {
        title
        background {
          childImageSharp {
            gatsbyImageData(quality: 90, layout: FULL_WIDTH)
          }
        }
        figures {
          title
          spacing
          image {
            childImageSharp {
              gatsbyImageData(quality: 90, layout: FULL_WIDTH)
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
            gatsbyImageData(quality: 90, layout: FULL_WIDTH)
          }
        }
      }
      conclusionSection {
        description
        images {
          title
          image {
            childImageSharp {
              gatsbyImageData(quality: 90, layout: FULL_WIDTH)
            }
          }
        }
      }
      bottomSection {
        quote
        background {
          childImageSharp {
            gatsbyImageData(quality: 90, layout: FULL_WIDTH)
          }
        }
        person {
          name
          role
          image {
            childImageSharp {
              gatsbyImageData(quality: 90, layout: FULL_WIDTH)
            }
          }
        }
      }
    }
  }
}
`;

export default CaseStudy;
