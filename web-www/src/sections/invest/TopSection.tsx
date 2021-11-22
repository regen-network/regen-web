import React from 'react';
import { graphql, StaticQuery, useStaticQuery } from 'gatsby';
import { makeStyles } from '@material-ui/core/';
import BackgroundSection from '../../components/BackgroundSection';
import { InvestTopSectionQuery } from '../../generated/graphql';
import { BlockContent } from 'web-components/src/components/block-content';

const useStyles = makeStyles(theme => ({
  section: {
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(42.75),
      paddingLeft: 'none',
      paddingRight: 'none',
    },
  },
}));

const query = graphql`
  query investTopSection {
    background: file(relativePath: { eq: "investors-top.jpg" }) {
      childImageSharp {
        fluid(quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    backgroundMobile: file(relativePath: { eq: "investors-top-mobile.jpg" }) {
      childImageSharp {
        fluid(quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    sanityInvestPage {
      topSection {
        title
        _rawBody
      }
    }
  }
`;

const TopSection: React.FC = () => {
  const gradient =
    'linear-gradient(180deg, #FFF9EE 2.02%, rgba(255, 249, 238, 0) 37.98%), linear-gradient(209.83deg, rgba(250, 235, 209, 0.9) 11.05%, rgba(125, 201, 191, 0.9) 43.17%, rgba(81, 93, 137, 0.9) 75.29%);';
  const styles = useStyles();
  const { background, backgroundMobile, sanityInvestPage } = useStaticQuery<InvestTopSectionQuery>(query);
  const data = sanityInvestPage?.topSection;
  console.log('sanityInvestPage :>> ', sanityInvestPage);
  return (
    <>
      <BackgroundSection
        linearGradient={gradient}
        header={data?.title || ''}
        body={<BlockContent content={data?._rawBody} />}
        className={styles.section}
        imageData={background?.childImageSharp?.fluid}
        imageDataMobile={backgroundMobile?.childImageSharp?.fluid}
      />
    </>
  );
};

export default TopSection;
