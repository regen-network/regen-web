import React from 'react';
import { makeStyles } from '@mui/styles';
import { Theme } from '@regen-network/web-components/lib/theme/muiTheme';
import { BlockContent } from '@regen-network/web-components/lib/components/block-content';
import { graphql, useStaticQuery } from 'gatsby';

import BackgroundSection from '../../components/BackgroundSection';
import { FundTopSectionQuery } from '../../generated/graphql';

const useStyles = makeStyles<Theme>(theme => ({
  section: {
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 'none',
      paddingRight: 'none',
    },
  },
}));

const query = graphql`
  query fundTopSection {
    background: file(relativePath: { eq: "waterfall.png" }) {
      childImageSharp {
        fluid(quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    sanityFundPage {
      topSection {
        title
        _rawBody
      }
    }
  }
`;

const TopSection = (): JSX.Element => {
  const styles = useStyles();
  const { background, sanityFundPage } =
    useStaticQuery<FundTopSectionQuery>(query);
  const data = sanityFundPage?.topSection;

  return (
    <BackgroundSection
      className={styles.section}
      linearGradient="linear-gradient(209.83deg, rgba(250, 235, 209, 0.8) 11.05%, rgba(125, 201, 191, 0.8) 43.17%, rgba(81, 93, 137, 0.8) 75.29%)"
      header={data?.title}
      body={<BlockContent content={data?._rawBody} />}
      imageData={background?.childImageSharp?.fluid}
    />
  );
};

export default TopSection;
