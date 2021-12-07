import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import { makeStyles } from '@mui/styles';

import { Theme } from 'web-components/lib/theme/muiTheme';
import BackgroundSection from '../../components/BackgroundSection';
import TitleDescription from 'web-components/lib/components/title-description';

const useStyles = makeStyles((theme: Theme) => ({
  section: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(13),
    },
  },
}));

const WhySection = (): JSX.Element => {
  const classes = useStyles();

  return (
    <StaticQuery
      query={graphql`
        {
          background: file(relativePath: { eq: "developers-topo-bg.jpg" }) {
            childImageSharp {
              fluid(quality: 90) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
          content: validatorsYaml {
            whySection {
              header
              body
            }
          }
        }
      `}
      render={data => {
        const content = data.content.whySection;
        return (
          <BackgroundSection
            linearGradient="unset"
            topSection={false}
            imageData={data.background.childImageSharp.fluid}
            className={classes.section}
          >
            <TitleDescription title={content.header} description={content.body} />
          </BackgroundSection>
        );
      }}
    />
  );
};

export default WhySection;
