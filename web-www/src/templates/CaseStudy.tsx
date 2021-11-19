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
import {
  CaseStudyTemplateQuery,
  SanityCaseStudyAboutSection,
  SanityCaseStudyApproachSection,
  SanityCaseStudyBottomSection,
  SanityCaseStudyConclusionSection,
  SanityCaseStudyContextSection,
  SanityCaseStudyFigureSection,
  SanityCaseStudyFundingSection,
} from '../generated/graphql';
import { FluidObject } from 'gatsby-image';

interface Props extends PageProps {
  data: CaseStudyTemplateQuery;
}

const CaseStudy: React.FC<Props> = ({ data, location }) => {
  if (!data?.sanityCaseStudyPage) {
    return <></>;
  }
  const item = data.sanityCaseStudyPage;
  return (
    <>
      <SEO
        title={item?.name || ''}
        location={location}
        description={
          item?.description ||
          'Explore Regen Network case studies where technology, science and regenerative land use practices intersect.'
        }
      />
      <TopSection background={item?.background?.image?.asset?.fluid as FluidObject} name={item?.name || ''} />
      <AboutSection {...(item?.aboutSection as SanityCaseStudyAboutSection)} />
      <ContextSection {...(item?.contextSection as SanityCaseStudyContextSection)} />
      <ApproachSection {...(item?.approachSection as SanityCaseStudyApproachSection)} />
      <FigureSection {...(item?.figureSection as SanityCaseStudyFigureSection)} />
      <FundingSection {...(item?.fundingSection as SanityCaseStudyFundingSection)} />
      <ConclusionSection {...(item?.conclusionSection as SanityCaseStudyConclusionSection)} />
      <BottomSection {...(item?.bottomSection as SanityCaseStudyBottomSection)} />
    </>
  );
};

export const query = graphql`
  query caseStudyTemplate($slug: String!) {
    sanityCaseStudyPage(slug: { current: { eq: $slug } }) {
      name
      description
      background {
        ...fluidImageWebPFields
      }
      aboutSection {
        _rawAbout
        practice
        biome
        region
        lineRotate
        lineWidth
        aboutImage {
          image {
            asset {
              url
            }
          }
        }
        mapImage {
          ...fluidImageWebPFields
        }
      }
      contextSection {
        _rawDescription
        image {
          ...fluidImageWebPFields
        }
        challenges
      }
      approachSection {
        description
        _rawDetails
        _rawResults
        _rawNext
        _rawFigureTitle
        figureImage {
          ...fluidImageWebPFields
        }
      }
      figureSection {
        title
        background {
          ...fluidImageWebPFields
        }
        figures {
          title
          spacing
          image {
            ...fluidImageWebPFields
          }
        }
      }
      fundingSection {
        _rawDetails
        _rawResults
        _rawNext
        image {
          ...fluidImageWebPFields
        }
      }
      conclusionSection {
        _rawDescription
        images {
          title
          image {
            ...fluidImageWebPFields
          }
        }
      }
      bottomSection {
        quote
        personName
        personRole
        personImage {
          ...fluidImageWebPFields
        }
        background {
          ...fluidImageWebPFields
        }
      }
    }
  }
`;

export default CaseStudy;
