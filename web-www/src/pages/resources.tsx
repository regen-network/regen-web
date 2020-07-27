import React, { useState, useEffect } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { useTheme } from '@material-ui/core';
import BackgroundImage from 'gatsby-background-image';
import TopSection from '../sections/resources/TopSection'
import SEO from '../components/seo';

// const useStyles = makeStyles((theme: Theme) => ({
//   callButton: {
//     marginLeft: theme.spacing(4.25),
//     [theme.breakpoints.down('xs')]: {
//       padding: `${theme.spacing(1.875)} ${theme.spacing(7.5)}`,
//       fontSize: '1.125rem',
//     },
//     [theme.breakpoints.up('sm')]: {
//       padding: `${theme.spacing(2.5)} ${theme.spacing(12.5)}`,
//       fontSize: '1.3125rem',
//     },
//   },
// }));

const ResourcesPage = (): JSX.Element => {
  return (
    <>
      <SEO title="Resources" />
	  <TopSection />
    </>
  );
};

export default ResourcesPage;
