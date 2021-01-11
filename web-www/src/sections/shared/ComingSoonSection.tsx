import React from 'react';
import { makeStyles, Theme, useTheme } from '@material-ui/core';
import { useStaticQuery, graphql } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';

import Section from 'web-components/src/components/section';
import ProjectCards from 'web-components/lib/components/sliders/ProjectCards';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(14),
    },
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(19.75),
    },
  },
}));

const ComingSoonSection = () => {
  const data = useStaticQuery(graphql`
    query {
      background: file(relativePath: { eq: "coming-soon-bg.jpg" }) {
        childImageSharp {
          fluid(quality: 90) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
      text: sharedYaml {
        comingSoonSection {
          header
          projects {
            name
            location
            area
            areaUnit
            image {
              childImageSharp {
                fixed(quality: 90) {
                  ...GatsbyImageSharpFixed_withWebp
                }
              }
              publicURL
            }
          }
        }
      }
    }
  `);
  const content = data.text.comingSoonSection;
  const classes = useStyles({});
  const theme = useTheme();
  const imageData = data.background.childImageSharp.fluid;

  return (
    <BackgroundImage Tag="section" fluid={imageData} backgroundColor={theme.palette.grey['50']}>
      <Section withSlider className={classes.root} title={content.header} titleVariant="subtitle1">
        <ProjectCards
          projects={content.projects.map(({ handle, name, image, location, area, areaUnit }) => ({
            name,
            area,
            areaUnit,
            href: `/registry/projects/${handle}`,
            // comingSoon: true,
            imgSrc: image.publicURL,
            place: location,
          }))}
        />
      </Section>
    </BackgroundImage>
  );
};

export default ComingSoonSection;
