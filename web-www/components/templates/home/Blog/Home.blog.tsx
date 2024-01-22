import { ApolloQueryResult } from '@apollo/client';
import Image from 'next/image';

import { BlogPostProps } from 'web-components/src/components/blog-post';
import Section from 'web-components/src/components/section';
import BlogPosts from 'web-components/src/components/sliders/BlogPosts';

import { useBlogStyles } from './Home.Blog.styles';

import { BlogSectionQuery } from '@/generated/sanity-graphql';

type Props = {
  blogData?: ApolloQueryResult<BlogSectionQuery>;
};

const BlogSection = ({ blogData }: Props): JSX.Element => {
  const { classes: styles } = useBlogStyles();
  const content = blogData?.data.allSharedSections[0].blog;
  const posts: BlogPostProps[] =
    content?.posts?.map(
      post =>
        ({
          header: post?.header,
          description: post?.descriptionRaw,
          url: post?.url,
          img: (
            <Image
              src={String(post?.image?.image?.asset?.url)}
              alt={String(post?.image?.imageAlt)}
              width={346}
              height={252}
              className={styles.image}
            />
          ),
        } as BlogPostProps),
    ) ?? [];

  return (
    <div className={styles.container}>
      <Section
        withSlider
        classes={{ root: styles.root }}
        title={content?.header || ''}
        titleVariant="h1"
      >
        <BlogPosts posts={posts} classes={{ item: styles.item }} />
      </Section>
    </div>
  );
};

export default BlogSection;
