import React from 'react';
import { makeStyles } from '@mui/styles';
import { BlogPostProps } from '@regen-network/web-components/lib/components/blog-post';
import Section from '@regen-network/web-components/lib/components/section';
import BlogPosts from '@regen-network/web-components/lib/components/sliders/BlogPosts';
import { Theme } from '@regen-network/web-components/lib/theme/muiTheme';
import { graphql, useStaticQuery } from 'gatsby';
import SanityImage from 'gatsby-plugin-sanity-image';

import { SharedBlogSectionQuery } from '../../generated/graphql';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    borderTop: `1px solid ${theme.palette.grey['300']}`,
  },
  image: {
    width: '100%',
    backgroundSize: 'cover',
    [theme.breakpoints.down('sm')]: {
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
    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(19.75),
    },
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(25.25),
    },
    [theme.breakpoints.up('md')]: {},
  },
}));

const query = graphql`
  query sharedBlogSection {
    sanitySharedSections {
      blog {
        header
        posts {
          header
          url
          _rawDescription
          image {
            ...customImageFields
          }
        }
      }
    }
  }
`;

const BlogSection: React.FC = () => {
  const styles = useStyles();
  const { sanitySharedSections } =
    useStaticQuery<SharedBlogSectionQuery>(query);
  const content = sanitySharedSections?.blog;
  const posts: BlogPostProps[] =
    content?.posts?.map(
      post =>
        ({
          header: post?.header,
          description: post?._rawDescription,
          url: post?.url,
          img: (
            <SanityImage
              className={styles.image}
              alt={post?.image?.imageAlt}
              {...(post?.image?.image as any)}
            />
          ),
        } as BlogPostProps),
    ) ?? [];

  return (
    <div className={styles.container}>
      <Section
        withSlider
        className={styles.root}
        title={content?.header || ''}
        titleVariant="h1"
      >
        <BlogPosts posts={posts} />
      </Section>
    </div>
  );
};

export default BlogSection;
