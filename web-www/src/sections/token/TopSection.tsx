import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Img, { FluidObject } from 'gatsby-image';
import { Theme, makeStyles } from '@material-ui/core';

import BackgroundSection from '../../components/BackgroundSection';
import Title from 'web-components/lib/components/title';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  section: props => ({
    [theme.breakpoints.down('xs')]: {
      paddingLeft: 'none',
      paddingRight: 'none',
    },
  }),
  header: {
    display: 'flex',
    alignItems: 'center',
  },
  token: {
    width: 70,
    height: 70,
    marginRight: theme.spacing(4),
    [theme.breakpoints.down('xs')]: {
      marginRight: theme.spacing(2),
    },
  },
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
          image {
            childImageSharp {
              fluid(quality: 90) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
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
      header={
        <div className={classes.header}>
          <Img className={classes.token} fluid={content?.image?.childImageSharp?.fluid} />
          <Title
            color="primary"
            variant="h1"
            // className={clsx(titleClassName, classes.title)}
          >
            {content.header}
          </Title>
        </div>
      }
      body={content?.body}
      imageData={imageData}
    />
  );
};

export default TopSection;
