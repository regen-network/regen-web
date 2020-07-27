import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Grid from '@material-ui/core/Grid';
import BackgroundImage from 'gatsby-background-image';
import { makeStyles, Theme } from '@material-ui/core';
import Title from 'web-components/lib/components/title';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'relative',
  },
  amount: {
    textShadow: theme.shadows[4],
    lineHeight: '130%',
    color: theme.palette.primary.main,
    textAlign: 'center',
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(20),
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(25),
    },
  },
  labelContainer: {
    textAlign: 'center',
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(1.5),
    },
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(2.5),
    },
  },
  item: {
    [theme.breakpoints.down('xs')]: {
      '&:first-child': {
        padding: `${theme.spacing(34.25)} 0`,
      },
      padding: `${theme.spacing(30)} 0`,
    },
    [theme.breakpoints.up('sm')]: {
      padding: `${theme.spacing(60.5)} 0`,
    },
  },
  title: {
    fontWeight: 800,
    fontFamily: theme.typography.h1.fontFamily,
    letterSpacing: '1px',
    color: theme.palette.info.dark,
    textAlign: 'center',
    textTransform: 'uppercase',
    [theme.breakpoints.up('sm')]: {
      lineHeight: theme.spacing(6.5),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(3.5),
      lineHeight: theme.spacing(4.5),
    },
  },
  titleContainer: {
    position: 'absolute',
    background: theme.palette.primary.main,
    opacity: 0.8,
    zIndex: 1,
    borderRadius: '2px',
    boxShadow: theme.shadows[4],
    transform: 'translateX(-50%)',
    left: '50%',
    [theme.breakpoints.up('sm')]: {
      top: theme.spacing(11),
      padding: theme.spacing(2),
    },
    [theme.breakpoints.down('xs')]: {
      top: theme.spacing(5),
      padding: `${theme.spacing(3.5)} ${theme.spacing(3)}`,
      width: '95%',
    },
  },
  label: {
    fontSize: theme.spacing(4.5),
    color: theme.palette.primary.main,
    lineHeight: theme.spacing(5.75),
    fontWeight: 800,
    fontFamily: theme.typography.h1.fontFamily,
    letterSpacing: '1px',
    textTransform: 'uppercase',
    backgroundColor: theme.palette.secondary.main,
    borderRadius: '2px',
    padding: `${theme.spacing(1)} ${theme.spacing(2.5)}`,
  },
}));

const JoinFarmersSection = () => {
  const classes = useStyles();

  const data = useStaticQuery(graphql`
    query {
      background: file(relativePath: { eq: "land-stewards-top.png" }) {
        childImageSharp {
          fluid(quality: 90) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
      text: landStewardsYaml {
        joinFarmersSection {
          header
          farmers {
            amount
            label
            image {
              childImageSharp {
                fluid(quality: 90) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
          land {
            amount
            label
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
    }
  `);
  const content = data.text.joinFarmersSection;
  return (
    <Grid container className={classes.root}>
      <div className={classes.titleContainer}>
        <Title variant="h5" className={classes.title}>
          {content.header}
        </Title>
      </div>
      <Grid item xs={12} sm={6}>
        <BackgroundImage Tag="div" fluid={content.farmers.image.childImageSharp.fluid}>
          <div className={classes.item}>
            <Title className={classes.amount}>{content.farmers.amount}</Title>
            <div className={classes.labelContainer}>
              <span className={classes.label}>{content.farmers.label}</span>
            </div>
          </div>
        </BackgroundImage>
      </Grid>
      <Grid item xs={12} sm={6}>
        <BackgroundImage Tag="div" fluid={content.land.image.childImageSharp.fluid}>
          <div className={classes.item}>
            <Title className={classes.amount}>{content.land.amount}</Title>
            <div className={classes.labelContainer}>
              <span className={classes.label}>{content.land.label}</span>
            </div>
          </div>
        </BackgroundImage>
      </Grid>
    </Grid>
  );
};

export default JoinFarmersSection;
