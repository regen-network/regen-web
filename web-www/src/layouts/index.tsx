import React from 'react';
import { PageProps } from 'gatsby';

import Layout from './layout';

const ThemeWrap = ({ children, location }: PageProps): JSX.Element => {
  return (
    <>
      <Layout location={location}>{children}</Layout>
    </>
  );
};

export default ThemeWrap;
