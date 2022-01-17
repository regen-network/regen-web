import React from 'react';
import { makeStyles } from '@mui/styles';
import { graphql, useStaticQuery } from 'gatsby';

import BackgroundSection from '../../components/BackgroundSection';
import { Theme } from 'web-components/lib/theme/muiTheme';
import TitleDescription from 'web-components/lib/components/title-description';
import { ValidatorsWhatSectionQuery } from '../../generated/graphql';

const useStyles = makeStyles((theme: Theme) => ({
  section: {
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(25),
      paddingBottom: theme.spacing(37.5),
    },
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(17.75),
      paddingBottom: theme.spacing(15.25),
    },
  },
}));

const query = graphql`
  query validatorsWhatSection {
    background: file(relativePath: { eq: "what-validators-bg.jpg" }) {
      childImageSharp {
        fluid(quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    sanityValidatorsPage {
      whatSection {
        title
        _rawBody
      }
    }
  }
`;
const WhatSection = (): JSX.Element => {
  const styles = useStyles();
  const { background, sanityValidatorsPage } = useStaticQuery<ValidatorsWhatSectionQuery>(query);
  const data = sanityValidatorsPage?.whatSection;

  return (
    <BackgroundSection
      linearGradient="unset"
      className={styles.section}
      imageData={background?.childImageSharp?.fluid}
      topSection={false}
    >
      <TitleDescription title={data?.title || ''} description={data?._rawBody} />
    </BackgroundSection>
  );
};

export default WhatSection;
