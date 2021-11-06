import { graphql } from 'gatsby';

export const allHomePageQuery = graphql`
  query {
    seoImage: file(relativePath: { eq: "science.png" }) {
      publicURL
    }
    background: file(relativePath: { eq: "home-climate-bg.jpg" }) {
      childImageSharp {
        fluid(quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    backgroundMobile: file(relativePath: { eq: "home-climate-bg-mobile.jpg" }) {
      childImageSharp {
        fluid(quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    allSanityHomePageWeb {
      nodes {
        homeFoldSection {
          title
          body
          image {
            ...ImageWithPreview
          }
        }
        marketplaceSection {
          header
          tooltip
          body {
            green
            middle
            popover
            end
          }
          callToActions {
            ...callToActionFields
          }
        }
        climateSection {
          header
          description
          image {
            ...ImageWithPreview
          }
          solution {
            title
            body
          }
          problem {
            title
            body
          }
        }
        carbonPlusSection {
          smallHeaderFeatured
          smallHeaderCreditName
          header
          description
          linkText
          linkUrl
        }
        ledgerDescription
        valuesSection {
          header
          imageItems {
            title
            description
            image {
              ...ImageWithPreview
            }
          }
        }
      }
    }
  }
`;
