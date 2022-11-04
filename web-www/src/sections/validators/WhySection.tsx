import React from 'react';
import { makeStyles } from '@mui/styles';
import { TitleBody } from '@regen-network/web-components/lib/components/text-layouts';
import { Theme } from '@regen-network/web-components/lib/theme/muiTheme';
import { graphql, useStaticQuery } from 'gatsby';

import BackgroundSection from '../../components/BackgroundSection';
import { ValidatorsWhySectionQuery } from '../../generated/graphql';

const useStyles = makeStyles((theme: Theme) => ({
  section: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(22),
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
  const { background, sanityValidatorsPage } =
    useStaticQuery<ValidatorsWhySectionQuery>(query);
  const data = sanityValidatorsPage?.whySection;
  return (
    <BackgroundSection
      linearGradient="unset"
      topSection={false}
      imageData={background?.childImageSharp?.fluid}
      className={styles.section}
    >
      <TitleBody
        title={data?.title || ''}
        body={data?._rawBody}
        sx={{ body: { maxWidth: 946 } }}
        bodySize={['md', 'xl']}
      />
    </BackgroundSection>
  );
};

export default WhySection;
