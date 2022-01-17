import React from 'react';
import { makeStyles } from '@mui/styles';
import { graphql, useStaticQuery } from 'gatsby';

import { Theme } from 'web-components/lib/theme/muiTheme';
import BackgroundSection from '../../components/BackgroundSection';
import TitleDescription from 'web-components/lib/components/title-description';
import { ValidatorsWhySectionQuery } from '../../generated/graphql';

const useStyles = makeStyles((theme: Theme) => ({
  section: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(13),
    },
  },
}));

const query = graphql`
  query validatorsWhySection {
    background: file(relativePath: { eq: "developers-topo-bg.jpg" }) {
      childImageSharp {
        fluid(quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    sanityValidatorsPage {
      whySection {
        title
        _rawBody
      }
    }
  }
`;

const WhySection = (): JSX.Element => {
  const styles = useStyles();
  const { background, sanityValidatorsPage } = useStaticQuery<ValidatorsWhySectionQuery>(query);
  const data = sanityValidatorsPage?.whySection;
  return (
    <BackgroundSection
      linearGradient="unset"
      topSection={false}
      imageData={background?.childImageSharp?.fluid}
      className={styles.section}
    >
      <TitleDescription title={data?.title || ''} description={data?._rawBody} />
    </BackgroundSection>
  );
};

export default WhySection;
