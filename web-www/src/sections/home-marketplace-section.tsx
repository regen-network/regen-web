import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';
import { useStaticQuery, graphql } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';
import Img from 'gatsby-image';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: theme.spacing(200),
    color: theme.palette.primary.contrastText,
    'background-color': theme.palette.primary.main,
    'font-family': theme.typography.h1.fontFamily,
    'text-align': 'center',
    'padding-top': theme.spacing(45),
    '& h2': {
      width: '70%',
      'font-family': 'Muli',
      margin: '0 auto',
      'line-height': '150%',
      'padding-bottom': theme.spacing(10),
      'margin-bottom': theme.spacing(2),
      'font-weight': 900,
    },
    '& h3': {
      'line-height': '140%',
      'margin-bottom': theme.spacing(1),
    },
    '& p': {
      'margin-bottom': '0px',
      'line-height': '150%',
      'font-family': 'Lato',
    },
    '& .MuiGrid-item.MuiGrid-root': {
      padding: theme.spacing(1),
      'padding-left': theme.spacing(3),
      'padding-right': theme.spacing(3),
      '& p': {
        color: theme.palette.info.dark,
        'margin-bottom': theme.spacing(3),
      },
    },
  },
  bgdiv: {
    'margin-bottom': theme.spacing(4),
  },
  buttonpad: {
    padding: '0px',
  },
  inner: {
    'max-width': '85%',
    margin: '0 auto',
  },
  smallTag: {
    'text-transform': 'uppercase',
    'font-family': 'Muli',
    color: theme.palette.grey[50],
    'margin-bottom': theme.spacing(5),
  },
  smallTitle: {
    color: theme.palette.info.main,
  },
  icon: {
    position: 'absolute',
    width: '80%',
    height: '80%',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  container: {
    'padding-right': theme.spacing(40),
    'padding-left': theme.spacing(40),
  },
  button: {
    [theme.breakpoints.down('xs')]: {
      padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
      fontSize: theme.spacing(4.5),
    },
    [theme.breakpoints.up('sm')]: {
      padding: `${theme.spacing(2)} ${theme.spacing(8.5)}`,
      fontSize: theme.spacing(4.5),
    },
  },
}));

const MarketplaceSection = () => {
  const data = useStaticQuery(graphql`
    query {
      ellipse: file(relativePath: { eq: "green-ellipse.png" }) {
        childImageSharp {
          fixed(quality: 90, width: 120) {
            ...GatsbyImageSharpFixed_withWebp
          }
        }
      }
      text: contentYaml {
        marketplaceSection {
          header
          body
          callToActions {
            image {
              childImageSharp {
                fixed(quality: 90, width: 80) {
                  ...GatsbyImageSharpFixed_withWebp
                }
              }
            }
            caption
            header
            description
            linkText
          }
        }
      }
    }
  `);

  const content = data.text.marketplaceSection;

  const classes = useStyles({});
  return (
    <div className={classes.root}>
      <div className={classes.inner}>
        <div className={classes.smallTag}>{content.header}</div>
        <h2>{content.body}</h2>
        <Grid className={classes.container} container spacing={3}>
          {content.callToActions.map(cta => {
            return (
              <Grid item xs>
                <BackgroundImage
                  className={classes.bgdiv}
                  Tag="div"
                  fixed={data.ellipse.childImageSharp.fixed}
                >
                  <Img fixed={cta.image.childImageSharp.fixed} className={classes.icon} />
                </BackgroundImage>
                <div className={classes.smallTitle}>{cta.caption}</div>
                <h3>{cta.header}</h3>
                <p>{cta.description}</p>
                <ContainedButton className={classes.button}>{cta.linkText}</ContainedButton>
              </Grid>
            );
          })}
        </Grid>
      </div>
    </div>
  );
};

export default MarketplaceSection;
