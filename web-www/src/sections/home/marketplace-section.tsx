import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';
import { useStaticQuery, graphql } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';
import Title from 'web-components/lib/components/title';
import Section from '../../components/Section';
import Img from 'gatsby-image';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: 'min-content',
    color: theme.palette.primary.contrastText,
    'background-color': theme.palette.primary.main,
    'font-family': theme.typography.h1.fontFamily,
    'text-align': 'center',
    '& h2': {
		width: '70%',
	  [theme.breakpoints.down('sm')]: {
		width: '100%',
	},
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
      'font-size': '1.375rem',
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
  registry: {
    color: theme.palette.secondary.main,
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
	[theme.breakpoints.down('sm')]: {
		'margin-top': theme.spacing(7)
	},
    'text-transform': 'uppercase',
    'font-family': 'Muli',
    color: theme.palette.info.main,
    'margin-bottom': theme.spacing(5),
    'font-weight': 800,
    'font-size': '1.125rem',
    'letter-spacing': '1px',
    'line-height': '23px',
  },
  smallTitle: {
    color: theme.palette.info.dark,
    'font-weight': 800,
    'font-size': '1.125rem',
    'letter-spacing': '1px',
    'line-height': '23px',
  },
  icon: {
    position: 'absolute',
    width: '95%',
    height: '95%',
    top: '52%',
    left: '33%',
    transform: 'translate(-50%, -50%)',
  },
  container: {
  },
  gridItem: {
	[theme.breakpoints.down('sm')]: {
		'flex-basis':'auto',
		'margin-bottom': theme.spacing(8)
	}
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
          fixed(quality: 90, width: 159) {
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
                fixed(quality: 90, width: 100) {
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
    <Section className={classes.root}>
      <div className={classes.inner}>
        <div className={classes.smallTag}>{content.header}</div>
        <Title variant="h2" align="center">{content.body}</Title>
        <Grid className={classes.container} container spacing={3}>
          {content.callToActions.map(cta => {
            return (
              <Grid className={classes.gridItem} item xs>
                <BackgroundImage
                  className={classes.bgdiv}
                  Tag="div"
                  fixed={data.ellipse.childImageSharp.fixed}
                >
                  <Img fixed={cta.image.childImageSharp.fixed} className={classes.icon} />
                </BackgroundImage>
                <div className={classes.smallTitle}>{cta.caption}</div>
                <Title variant="h3" align="center">
                  {cta.header}
                </Title>
                <p>{cta.description}</p>
                <ContainedButton className={classes.button}>{cta.linkText}</ContainedButton>
              </Grid>
            );
          })}
        </Grid>
      </div>
    </Section>
  );
};

export default MarketplaceSection;
