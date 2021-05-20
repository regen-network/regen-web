import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Theme, makeStyles } from '@material-ui/core/';

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
  const data = useStaticQuery(graphql`
    query {
      background: file(relativePath: { eq: "token-aurora.png" }) {
        childImageSharp {
          fluid(quality: 90) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
      text: tokenYaml {
        topSection {
          header
          body
        }
      }
    }
  `);
  const content = data?.text?.topSection;
  const imageData = data?.background?.childImageSharp?.fluid;
  return (
    <BackgroundSection
      className={classes.section}
      linearGradient="linear-gradient(209.83deg, rgba(250, 235, 209, 0.8) 11.05%, rgba(125, 201, 191, 0.8) 43.17%, rgba(81, 93, 137, 0.8) 75.29%)"
      header={content?.header}
      body={content?.body}
      imageData={imageData}
    />
  );
};

export default TopSection;
