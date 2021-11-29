import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Theme, makeStyles } from '@mui/material/';

import BackgroundSection from '../../components/BackgroundSection';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  section: props => ({
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(20),
      paddingLeft: 'none',
      paddingRight: 'none',
    },
  }),
}));

const TopSection = (): JSX.Element => {
  const classes = useStyles();
  const data = useStaticQuery(graphql`{
  background: file(relativePath: {eq: "wallet-address-registration.png"}) {
    childImageSharp {
      gatsbyImageData(quality: 90, layout: FULL_WIDTH)
    }
  }
  text: walletAddressRegistrationYaml {
    topSection {
      header
      body
    }
  }
}
`);
  const content = data?.text?.topSection;
  const imageData = data?.background?.childImageSharp?.gatsbyImageData;
  return (
    <BackgroundSection
      className={classes.section}
      linearGradient="linear-gradient(180deg, #FFF9EE 2.02%, rgba(255, 249, 238, 0) 37.98%), linear-gradient(209.83deg, rgba(250, 235, 209, 0.9) 11.05%, rgba(125, 201, 191, 0.9) 43.17%, rgba(81, 93, 137, 0.9) 75.29%)"
      header={content?.header}
      body={content?.body}
      imageData={imageData}
    />
  );
};

export default TopSection;
