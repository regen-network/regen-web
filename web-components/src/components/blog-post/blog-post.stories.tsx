import * as React from 'react';
import BlogPost from 'web-components/lib/components/blog-post';

export default {
  title: 'Blog Post',
  component: BlogPost,
};

export const blogPost = (): JSX.Element => (
  <div style={{ width: '370px' }}>
    <BlogPost
      img={<img src="./biomass.png" alt="biomass" />}
      header="This is a blog post header"
      url="https://medium.com/regen-network"
      description="This is a blog post description"
    />
  </div>
);
