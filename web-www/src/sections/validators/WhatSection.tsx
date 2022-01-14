import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Theme, makeStyles } from '@material-ui/core/';

import BackgroundSection from '../../components/BackgroundSection';
import TitleDescription from 'web-components/lib/components/title-description';
import { ValidatorsWhatSectionQuery } from '../../generated/graphql';

const useStyles = makeStyles((theme: Theme) => ({
  section: {
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(25),
      paddingBottom: theme.spacing(37.5),
    },
    [theme.breakpoints.down('xs')]: {
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
