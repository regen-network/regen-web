import React from 'react';
import { makeStyles, DefaultTheme as Theme } from '@mui/styles';
import Grid from '@mui/material/Grid';
import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';
import { useStaticQuery, graphql } from 'gatsby';
import Title from 'web-components/lib/components/title';
import Section from 'web-components/src/components/section';
import Img from 'gatsby-image';
import Tooltip from 'web-components/lib/components/tooltip';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingTop: theme.spacing(25),
    paddingBottom: theme.spacing(25),
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(20),
      paddingBottom: theme.spacing(20),
    },
    height: 'min-content',
    color: theme.palette.primary.contrastText,
    'background-color': theme.palette.primary.main,
    'font-family': theme.typography.h1.fontFamily,
    'text-align': 'center',
    '& h2': {
      width: '100%',
      'font-family': 'Muli',
      margin: '0 auto',
      'line-height': '150%',
      'padding-bottom': theme.spacing(10),
      'margin-bottom': theme.spacing(2),
      'font-weight': 900,
    },
    '& p': {
      'margin-bottom': '0px',
      'line-height': '150%',
      'font-family': 'Lato',
      'font-size': '1.375rem',
      [theme.breakpoints.down('xs')]: {
        fontSize: '1rem',
      },
    },
    '& .MuiGrid-item.MuiGrid-root': {
      padding: theme.spacing(1),
      'padding-left': theme.spacing(3),
      'padding-right': theme.spacing(3),
      '& p': {
        color: theme.palette.info.dark,
        'margin-bottom': theme.spacing(6.75),
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
    [theme.breakpoints.up('sm')]: {
      'max-width': '85%',
    },
    margin: '0 auto',
  },
  smallTag: {
    'text-transform': 'uppercase',
    'font-family': 'Muli',
    color: theme.palette.info.main,
    'margin-bottom': theme.spacing(5),
    'font-weight': 800,
    'font-size': '1.3125rem',
    'letter-spacing': '1px',
    'line-height': '27px',
  },
  smallTitle: {
    marginTop: theme.spacing(6.5),
    'text-transform': 'uppercase',
    color: theme.palette.info.dark,
    'font-weight': 800,
    'font-size': '1.125rem',
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.875rem',
    },
    'letter-spacing': '1px',
    'line-height': '23px',
  },
  gridItem: {
    [theme.breakpoints.down('sm')]: {
      'flex-basis': 'auto',
      'margin-bottom': theme.spacing(8),
    },
  },
  button: {
    [theme.breakpoints.down('xs')]: {
      padding: `${theme.spacing(3)} ${theme.spacing(7.5)}`,
      fontSize: theme.spacing(4.5),
    },
    [theme.breakpoints.up('sm')]: {
      padding: `${theme.spacing(4.5)} ${theme.spacing(12.5)}`,
      fontSize: theme.spacing(4.5),
    },
  },
  green: {
    color: theme.palette.secondary.main,
  },
  popover: {
    cursor: 'pointer',
    borderBottom: `3px dashed ${theme.palette.secondary.main}`,
  },
  h3: {
    marginTop: theme.spacing(3.5),
    'line-height': '140%',
    'margin-bottom': theme.spacing(2.4),
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      fontSize: theme.spacing(5.25),
    },
  },
}));

const MarketplaceSection = (): JSX.Element => {
  const data = useStaticQuery(graphql`
    query {
      text: homeYaml {
        marketplaceSection {
          header
          tooltip
          body {
            green
            middle
            popover
            end
          }
          callToActions {
            image {
              childImageSharp {
                fixed(quality: 90, width: 159) {
                  ...GatsbyImageSharpFixed_withWebp
                }
              }
            }
            caption
            header
            description
            linkText
            linkUrl
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
        <Title variant="h2" align="center">
          <span className={classes.green}>{content.body.green} </span>
          {content.body.middle}{' '}
          <Tooltip arrow placement="top" title={content.tooltip}>
            <span className={classes.popover}>{content.body.popover}</span>
          </Tooltip>{' '}
          {content.body.end}
        </Title>
        <Grid container spacing={3}>
          {content.callToActions.map(cta => {
            return (
              <Grid key={cta.header} className={classes.gridItem} item xs>
                <Img fixed={cta.image.childImageSharp.fixed} />
                <div className={classes.smallTitle}>{cta.caption}</div>
                <Title className={classes.h3} variant="h3" align="center">
                  {cta.header}
                </Title>
                <p>{cta.description}</p>
                <ContainedButton href={cta.linkUrl} className={classes.button}>
                  {cta.linkText}
                </ContainedButton>
              </Grid>
            );
          })}
        </Grid>
      </div>
    </Section>
  );
};

export default MarketplaceSection;
