import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { makeStyles, Theme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Img from 'gatsby-image';
import ReactHtmlParser from 'react-html-parser';

import Title from 'web-components/lib/components/title';
import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      paddingTop: theme.spacing(15),
    },
    [theme.breakpoints.up(theme.breakpoints.values.tablet)]: {
      paddingTop: theme.spacing(30),
      paddingLeft: theme.spacing(37.5),
    },
  },
  image: {
    float: 'right',
    width: '100%',
  },
  imageContainer: {
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      paddingLeft: theme.spacing(9.5),
    },
  },
  smallHeader: {
    fontWeight: 800,
    letterSpacing: '1px',
    textTransform: 'uppercase',
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(5),
    },
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(7),
    },
  },
  header: {
    lineHeight: '140%',
  },
  featured: {
    color: theme.palette.info.main,
  },
  creditName: {
    color: theme.palette.secondary.main,
  },
  description: {
    color: theme.palette.info.dark,
    lineHeight: '150%',
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(4),
      paddingBottom: theme.spacing(4),
      paddingTop: theme.spacing(4),
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(4.5),
      paddingBottom: theme.spacing(6),
      paddingTop: theme.spacing(6),
    },
  },
  text: {
    [theme.breakpoints.up(theme.breakpoints.values.tablet)]: {
      paddingRight: theme.spacing(15),
    },
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      paddingTop: theme.spacing(10),
      paddingRight: theme.spacing(4),
      paddingLeft: theme.spacing(4),
    },
  },
  button: {
    fontSize: theme.spacing(4.5),
    height: theme.spacing(12.5),
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      width: '50%',
    },
  },
  grid: {
    [theme.breakpoints.up(theme.breakpoints.values.tablet)]: {
      alignItems: 'center',
    },
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      flexDirection: 'column-reverse',
    },
  },
}));

const CarbonplusSection = () => {
  const data = useStaticQuery(graphql`
    query {
      cow: file(relativePath: { eq: "cow.png" }) {
        childImageSharp {
          fluid(quality: 90) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
      text: homeYaml {
        carbonPlusSection {
          smallHeader {
            featured
            creditName
          }
          header
          description
          linkText
          linkUrl
        }
      }
    }
  `);
  const classes = useStyles({});
  const content = data.text.carbonPlusSection;

  return (
    <div className={classes.root}>
      <Grid className={classes.grid} container wrap="nowrap">
        <Grid item xs={12} className={classes.text}>
          <Title variant="h6" className={classes.smallHeader}>
            <span className={classes.featured}>{content.smallHeader.featured} </span>
            <span className={classes.creditName}>{ReactHtmlParser(content.smallHeader.creditName)}</span>
          </Title>
          <Title className={classes.header} variant="h3">
            {ReactHtmlParser(content.header)}
          </Title>
          <Typography className={classes.description} variant="body2">
            {ReactHtmlParser(content.description)}
          </Typography>
          <ContainedButton className={classes.button} href={content.linkUrl}>
            {content.linkText}
          </ContainedButton>
        </Grid>
        <Grid className={classes.imageContainer} item xs={12}>
          <Img className={classes.image} fluid={data.cow.childImageSharp.fluid} />
        </Grid>
      </Grid>
    </div>
  );
};

export default CarbonplusSection;
