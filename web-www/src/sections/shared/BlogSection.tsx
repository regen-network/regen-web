import React from 'react';
import { makeStyles } from '@mui/styles';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import BackgroundImage from 'gatsby-background-image';

import { Theme } from 'web-components/lib/theme/muiTheme';
import BlogPosts from 'web-components/lib/components/sliders/BlogPosts';
import Section from 'web-components/src/components/section';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    borderTop: `1px solid ${theme.palette.grey['300']}`,
  },
  image: {
    width: '100%',
    backgroundSize: 'cover',
    [theme.breakpoints.down('xs')]: {
      height: theme.spacing(50.75),
    },
    [theme.breakpoints.up('sm')]: {
      height: theme.spacing(63),
    },
    '&:before, &:after': {
      borderRadius: '10px',
    },
  },
  root: {
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(19.75),
    },
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(25.25),
    },
    [theme.breakpoints.up('md')]: {},
  },
}));

const BlogSection = () => {
  const data = useStaticQuery(graphql`{
  text: sharedYaml {
    blogSection {
      header
      posts {
        image {
          childImageSharp {
            gatsbyImageData(quality: 90, layout: FULL_WIDTH)
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

  const content = data.text.blogSection;
  return (
    <div className={classes.container}>
      <Section withSlider className={classes.root} title={content.header} titleVariant="h1">
        <BlogPosts
          posts={content.posts.map(({ header, description, url, image }) => ({
            header,
            description,
            url,
            img: <BackgroundImage className={classes.image} Tag="div" fluid={image.childImageSharp.gatsbyImageData} />,
          }))}
        />
      </Section>
    </div>
  );
};

export default BlogSection;
