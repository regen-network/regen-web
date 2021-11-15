import React from 'react';
import { makeStyles, DefaultTheme as Theme, useTheme } from '@mui/styles';
import { useStaticQuery, graphql } from 'gatsby';
import useMediaQuery from '@mui/material/useMediaQuery';
import Img from 'gatsby-image';
import ReactHtmlParser from 'react-html-parser';
import clsx from 'clsx';

import Title from 'web-components/lib/components/title';
import Card from 'web-components/lib/components/cards/Card';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'relative',
    [theme.breakpoints.up('md')]: {
      paddingTop: theme.spacing(9),
    },
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(20.75),
    },
  },
  card: {
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(5),
      width: theme.spacing(83.75),
      position: 'absolute',
    },
    [theme.breakpoints.down('sm')]: {
      padding: `${theme.spacing(6)} ${theme.spacing(5)}`,
    },
  },
  title: {
    lineHeight: '135%',
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(6),
    },
    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(3),
    },
    [theme.breakpoints.up('md')]: {
      paddingBottom: theme.spacing(4),
    },
  },
  cardTitle: {
    fontWeight: 800,
    color: theme.palette.info.dark,
    textTransform: 'uppercase',
    letterSpacing: '1px',
    lineHeight: theme.spacing(3.75),
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(3),
      lineHeight: theme.spacing(4.5),
    },
  },
  cardContent: {
    color: theme.palette.info.dark,
    lineHeight: '140%',
    paddingTop: theme.spacing(2),
    [theme.breakpoints.up('xs')]: {
      fontSize: theme.spacing(4.5),
    },
  },
  description: {
    lineHeight: '140%',
    color: theme.palette.info.main,
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(5.25),
    },
  },
  image: {
    [theme.breakpoints.up('md')]: {
      width: '60%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  line: {
    position: 'absolute',
    borderTop: `1px solid ${theme.palette.grey[100]}`,
  },
  problemLine: {
    zIndex: -1,
    [theme.breakpoints.up('md')]: {
      transform: 'rotate(78.11deg)',
      width: theme.spacing(115),
      bottom: theme.spacing(64),
      left: '0',
    },
    [theme.breakpoints.up('xl')]: {
      width: theme.spacing(70),
      bottom: theme.spacing(57),
      left: '5%',
    },
    [theme.breakpoints.down('sm')]: {
      transform: 'rotate(116.57deg)',
      width: theme.spacing(65),
      top: theme.spacing(70),
      left: theme.spacing(-5),
    },
    [theme.breakpoints.down('xs')]: {
      top: theme.spacing(50),
      left: theme.spacing(-15),
    },
  },
  solutionLine: {
    [theme.breakpoints.up('md')]: {
      transform: 'rotate(9.71deg)',
      width: theme.spacing(57.75),
      right: 'calc(6% + 20.9375rem - 4px)',
      top: theme.spacing(52),
    },
    [theme.breakpoints.up('xl')]: {
      top: theme.spacing(58),
      width: '25%',
    },
    [theme.breakpoints.down('sm')]: {
      zIndex: -1,
      transform: 'rotate(68.36deg)',
      right: '12%',
      width: theme.spacing(87.5),
      top: theme.spacing(-20),
    },
    [theme.breakpoints.down('xs')]: {
      width: theme.spacing(35),
      top: theme.spacing(-16),
    },
  },
  problemCard: {
    [theme.breakpoints.up('md')]: {
      left: '10%',
      bottom: 0,
    },
    [theme.breakpoints.down('sm')]: {
      marginRight: '20%',
      marginLeft: theme.spacing(5),
    },
  },
  solutionCard: {
    [theme.breakpoints.up('md')]: {
      right: '6%',
      top: theme.spacing(48.5),
    },
    [theme.breakpoints.up('xl')]: {
      top: theme.spacing(60),
    },
    [theme.breakpoints.down('sm')]: {
      position: 'relative',
      overflow: 'visible',
      marginLeft: '30%',
      marginRight: theme.spacing(5),
      marginTop: theme.spacing(-11.25),
    },
  },
  titleContainer: {
    [theme.breakpoints.up('md')]: {
      paddingLeft: 'calc(15% + 20.9375rem)',
      paddingRight: '8%',
      marginTop: '-6%',
    },
    [theme.breakpoints.up('xl')]: {
      marginTop: '-8%',
    },
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(15),
      paddingRight: theme.spacing(4),
      paddingLeft: theme.spacing(4),
    },
  },
}));

const ClimateSection = (): JSX.Element => {
  const data = useStaticQuery(graphql`
    query {
      text: homeYaml {
        climateSection {
          header
          description
          solution {
            header
            description
          }
          problem {
            header
            description
          }
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
  const classes = useStyles();
  const theme = useTheme();
  const downSm = useMediaQuery(theme.breakpoints.down('sm'));
  const content = data.text.climateSection;

  return (
    <div className={classes.root}>
      <hr className={clsx(classes.line, classes.problemLine)} />
      <Card
        className={clsx(classes.card, classes.problemCard)}
        borderColor={theme.palette.grey['100']}
        borderRadius="10px"
      >
        <Title className={classes.cardTitle} variant="body2">
          {content.problem.header}
        </Title>
        <div className={classes.cardContent}>{content.problem.description}</div>
      </Card>
      <Img className={classes.image} fluid={content.image.childImageSharp.fluid} />
      {!downSm && <hr className={clsx(classes.line, classes.solutionLine)} />}
      <Card
        className={clsx(classes.card, classes.solutionCard)}
        borderColor={theme.palette.grey['100']}
        borderRadius="10px"
      >
        <Title className={classes.cardTitle} variant="body2">
          {content.solution.header}
        </Title>
        <div className={classes.cardContent}>{content.solution.description}</div>
        {downSm && <hr className={clsx(classes.line, classes.solutionLine)} />}
      </Card>
      <div className={classes.titleContainer}>
        <Title variant="h1" className={classes.title}>
          {content.header}
        </Title>
        <Title variant="h3" className={classes.description}>
          {ReactHtmlParser(content.description)}
        </Title>
      </div>
    </div>
  );
};

export default ClimateSection;
