import React from 'react';
import { makeStyles, Theme, useTheme } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { useStaticQuery, graphql } from 'gatsby';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Img from 'gatsby-image';

import BlogPosts from 'web-components/lib/components/sliders/BlogPosts';
import Section from '../../components/Section';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    borderTop: `1px solid ${theme.palette.grey['300']}`,
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(19.75),
    },
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(25.25),
    },
  },
}));


const BlogSection = () => {
  const data = useStaticQuery(graphql`
    query {
      text: contentYaml {
        blogSection {
          header
          posts {
            image {
              childImageSharp {
                fluid(quality: 90) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
            header 
            url
            description
          }
        }
      }
    }
  `);
  const classes = useStyles();
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up('tablet'));

  const content = data.text.blogSection;
  return (
    <Section withSlider className={classes.root} title={content.header} titleVariant="h1">
      <BlogPosts
        posts={content.posts.map(({ header, description, url, image }) => ({
          header,
          description,
          url,
          img: <Img fluid={image.childImageSharp.fluid} />,
        }))}
      />
    </Section>
  );
};

export default BlogSection;
