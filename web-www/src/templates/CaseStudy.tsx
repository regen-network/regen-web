import React from 'react';
import { graphql, PageProps } from 'gatsby';
import { FluidObject } from 'gatsby-image';

import SEO from '../components/seo';
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
import AboutSection from '../sections/case-studies/case-study/AboutSection';
import ApproachSection from '../sections/case-studies/case-study/ApproachSection';
import BottomSection from '../sections/case-studies/case-study/BottomSection';
import ConclusionSection from '../sections/case-studies/case-study/ConclusionSection';
import ContextSection from '../sections/case-studies/case-study/ContextSection';
import FigureSection from '../sections/case-studies/case-study/FigureSection';
import FundingSection from '../sections/case-studies/case-study/FundingSection';
import TopSection from '../sections/case-studies/case-study/TopSection';

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
      <TopSection
        background={item?.background?.image?.asset?.fluid as FluidObject}
        name={item?.name || ''}
      />
      <AboutSection {...(item?.aboutSection as SanityCaseStudyAboutSection)} />
      <ContextSection
        {...(item?.contextSection as SanityCaseStudyContextSection)}
      />
      <ApproachSection
        {...(item?.approachSection as SanityCaseStudyApproachSection)}
      />
      <FigureSection
        {...(item?.figureSection as SanityCaseStudyFigureSection)}
      />
      <FundingSection
        {...(item?.fundingSection as SanityCaseStudyFundingSection)}
      />
      <ConclusionSection
        {...(item?.conclusionSection as SanityCaseStudyConclusionSection)}
      />
      <BottomSection
        {...(item?.bottomSection as SanityCaseStudyBottomSection)}
      />
    </>
  );
};

export const query = graphql`
  query caseStudyTemplate($slug: String!) {
    sanityCaseStudyPage(slug: { current: { eq: $slug } }) {
      name
      description
      background {
        ...fluidCustomImageFields_withWebp
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
          ...fluidCustomImageFields_withWebp
        }
      }
      contextSection {
        _rawDescription
        image {
          ...fluidCustomImageFields_withWebp
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
          ...fluidCustomImageFields_withWebp
        }
      }
      figureSection {
        title
        background {
          ...fluidCustomImageFields_withWebp
        }
        figures {
          title
          spacing
          image {
            ...fluidCustomImageFields_withWebp
          }
        }
      }
      fundingSection {
        _rawDetails
        _rawResults
        _rawNext
        image {
          ...fluidCustomImageFields_withWebp
        }
      }
      conclusionSection {
        _rawDescription
        images {
          title
          image {
            ...fluidCustomImageFields_withWebp
          }
        }
      }
      bottomSection {
        quote
        personName
        personRole
        personImage {
          ...fluidCustomImageFields_withWebp
        }
        background {
          ...fluidCustomImageFields_withWebp
        }
      }
    }
  }
`;

export default CaseStudy;
