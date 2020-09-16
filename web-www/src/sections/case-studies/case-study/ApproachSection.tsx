import React from 'react';
import { Theme, makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { graphql, StaticQuery } from 'gatsby';
import ReactHtmlParser from 'react-html-parser';
import Img, { FluidObject } from 'gatsby-image';

import Title from 'web-components/lib/components/title';
import Section from 'web-components/lib/components/section';
import Description from 'web-components/lib/components/description';

interface ApproachSectionProps {
  description?: string;
  details: string;
  results: string;
  next: string;
  figureTitle: string;
  figureImage: {
    childImageSharp: {
      fluid: FluidObject;
    };
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(21.5),
    },
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(25),
    },
  },
  cardTitle: {
    fontFamily: theme.typography.h1.fontFamily,
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontWeight: 800,
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(4),
      lineHeight: theme.spacing(5),
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(4.5),
      lineHeight: theme.spacing(5.75),
    },
  },
  cardDescription: {
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(4),
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(4.5),
    },
    '& ul, ol': {
      listStyle: 'none',
      marginLeft: theme.spacing(3),
    },
    '& li::before': {
      content: "'\\2022'",
      color: theme.palette.secondary.main,
      display: 'inline-block',
      width: '1em',
      marginLeft: '-1em',
      fontSize: theme.spacing(3),
    },
  },
  figureTitle: {
    lineHeight: '150%',
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(3),
      paddingTop: theme.spacing(3),
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(3.5),
      paddingTop: theme.spacing(4),
    },
  },
  description: {
    lineHeight: '150%',
    textAlign: 'center',
    maxWidth: theme.spacing(186.5),
    margin: '0 auto',
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(4.5),
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(11),
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(5.5),
      paddingTop: theme.spacing(4.5),
      paddingBottom: theme.spacing(13.5),
    },
  },
  subHeader: {
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(7),
    },
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(8),
    },
  },
  image: {
    borderRadius: '10px',
  },
}));

const ApproachSection = ({
  description,
  details,
  results,
  next,
  figureTitle,
  figureImage,
}: ApproachSectionProps): JSX.Element => {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <StaticQuery
      query={graphql`
        query {
          text: caseStudiesYaml {
            caseStudies {
              approachSection {
                header
                subHeader
                details
                results
                next
              }
            }
          }
        }
      `}
      render={data => {
        const content = data.text.caseStudies.approachSection;
        return (
          <Section className={classes.root} title={content.header}>
            {description && <Description className={classes.description}>{description}</Description>}
            <Grid container spacing={10}>
              <Grid item xs={12} md={6}>
                <Img className={classes.image} fluid={figureImage.childImageSharp.fluid} />
                <Description className={classes.figureTitle}>{figureTitle}</Description>
              </Grid>
              <Grid item xs={12} md={6}>
                <Title className={classes.subHeader} variant="h3">
                  {content.subHeader}
                </Title>
                <div>
                  <div>
                    <div className={classes.cardTitle}>{content.details}</div>
                    <Description className={classes.cardDescription}>{ReactHtmlParser(details)}</Description>
                  </div>
                  <div>
                    <div className={classes.cardTitle}>{content.results}</div>
                    <Description className={classes.cardDescription}>{ReactHtmlParser(results)}</Description>
                  </div>
                  <div>
                    <div className={classes.cardTitle}>{content.next}</div>
                    <Description className={classes.cardDescription}>{ReactHtmlParser(next)}</Description>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Section>
        );
      }}
    />
  );
};

export default ApproachSection;
