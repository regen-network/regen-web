import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { makeStyles } from '@mui/styles';

import { Theme } from 'web-components/lib/theme/muiTheme';
import { ButtonText, Title } from 'web-components/lib/components/typography';
import Description from 'web-components/lib/components/description';
import ResponsiveSlider from 'web-components/lib/components/sliders/ResponsiveSlider';
import { getFontSize } from 'web-components/lib/theme/sizing';
import BackgroundSection from '../../components/BackgroundSection';
import { ScienceOpenScienceSectionQuery } from '../../generated/graphql';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(64.5),
      paddingTop: theme.spacing(34.5),
      '&::before': {
        backgroundPosition: `center ${theme.spacing(22)} !important`,
      },
    },
    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(37.5),
      '&::before': {
        backgroundPosition: `right ${theme.spacing(27.5)} !important`,
      },
    },
  },
  slider: {
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(-4),
    },
  },
  green: {
    color: theme.palette.secondary.main,
  },
  phaseTitle: {
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(5.25),
      paddingBottom: theme.spacing(2),
    },
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(3),
    },
  },
}));

const query = graphql`
  query scienceOpenScienceSection {
    background: file(relativePath: { eq: "open-science.jpg" }) {
      childImageSharp {
        fluid(quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    sanitySciencePage {
      openScienceSection {
        headerStart
        headerGreen
        caption
        phases {
          title
          body
        }
      }
    }
  }
`;

const OpenScienceSection = (): JSX.Element => {
  const styles = useStyles();
  const data = useStaticQuery<ScienceOpenScienceSectionQuery>(query);
  const content = data.sanitySciencePage?.openScienceSection;

  return (
    <BackgroundSection
      className={styles.root}
      linearGradient="unset"
      topSection={false}
      imageData={data.background?.childImageSharp?.fluid}
    >
      <ButtonText mobileSize="xs" sx={{ color: 'info.main' }}>
        {content?.caption}
      </ButtonText>
      <Title variant="h1" mobileVariant="h5" sx={{ pb: [0, 13.5] }}>
        {content?.headerStart}{' '}
        <span className={styles.green}>{content?.headerGreen}</span>
      </Title>
      <ResponsiveSlider
        infinite={false}
        className={styles.slider}
        items={content?.phases?.map((phase, index) => (
          <div key={index}>
            <Title variant="h3" className={styles.phaseTitle}>
              {phase?.title}
            </Title>
            <Description fontSize={getFontSize('big')}>
              {phase?.body}
            </Description>
          </div>
        ))}
      />
    </BackgroundSection>
  );
};

export default OpenScienceSection;
