import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import Img from "gatsby-image";
import { useStaticQuery, graphql } from 'gatsby';

import Section from '../../components/Section';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(14),
    },
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(25),
    },
  },
}));

const ComingSoonSection = () => {
  const data = useStaticQuery(graphql`
    query {
      text: contentYaml {
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
            }
          }
        }
      }
    }
  `);
  const content = data.text.comingSoonSection;
  const classes = useStyles({});

  return (
    <Section withSlider className={classes.root} title={content.header}>
    </Section>
  );
};

export default ComingSoonSection;
