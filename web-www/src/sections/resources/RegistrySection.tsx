import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import { useTheme, Theme, makeStyles } from '@material-ui/core';
import Title from 'web-components/lib/components/title';
import ResourceCardsSlider from 'web-components/lib/components/sliders/ResourceCards';

import BackgroundSection from '../../components/BackgroundSection';

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    marginBottom: theme.spacing(8.5),
    [theme.breakpoints.up('sm')]: {
      marginBottom: theme.spacing(6.75),
    },
  },
  section: {
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(21.5),
    },
    [theme.breakpoints.down('xs')]: {
      paddingLeft: theme.spacing(3),
      paddingTop: theme.spacing(17),
    },
  },
}));

const RegistrySection = (): JSX.Element => {
  const classes = useStyles();
  return (
    <StaticQuery
      query={graphql`
        query {
          background: file(relativePath: { eq: "image-grid-bg.png" }) {
            childImageSharp {
              fluid(quality: 90) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
          text: resourcesYaml {
            registrySection {
              header
              resourceCards {
                image {
                  extension
                  publicURL
                }
                title
                updated
                description
                buttonText
              }
            }
          }
        }
      `}
      render={data => {
        const content = data.text.registrySection;
        return (
          <>
            <BackgroundSection
              className={classes.section}
              linearGradient="unset"
              imageData={data.background.childImageSharp.fluid}
            >
              <Title className={classes.title} variant="h3" align="left">
                {content.header}
              </Title>
              <ResourceCardsSlider items={content.resourceCards} />
            </BackgroundSection>
          </>
        );
      }}
    />
  );
};

export default RegistrySection;
