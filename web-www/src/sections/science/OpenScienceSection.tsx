import React from 'react';
import { makeStyles } from '@mui/styles';
import ResponsiveSlider from '@regen-network/web-components/lib/components/sliders/ResponsiveSlider';
import {
  Body,
  Label,
  Title,
} from '@regen-network/web-components/lib/components/typography';
import { Theme } from '@regen-network/web-components/lib/theme/muiTheme';
import { graphql, useStaticQuery } from 'gatsby';

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
      linearGradient="linear-gradient(180deg, #FFFFFF 50.1%, rgba(255, 255, 255, 0) 92.28%)"
      topSection={false}
      imageData={data.background?.childImageSharp?.fluid}
    >
      <Label mobileSize="xs" sx={{ color: 'info.main' }}>
        {content?.caption}
      </Label>
      <Title variant="h1" mobileVariant="h5" sx={{ pb: [0, 13.5] }}>
        {content?.headerStart}{' '}
        <span className={styles.green}>{content?.headerGreen}</span>
      </Title>
      <ResponsiveSlider
        infinite={false}
        className={styles.slider}
        items={content?.phases?.map((phase, index) => (
          <div key={index}>
            <Title variant="h3" mobileVariant="h5" pb={[2, 3]}>
              {phase?.title}
            </Title>
            <Body size="lg">{phase?.body}</Body>
          </div>
        ))}
      />
    </BackgroundSection>
  );
};

export default OpenScienceSection;
