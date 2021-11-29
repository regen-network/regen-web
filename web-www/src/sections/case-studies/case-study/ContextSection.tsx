import React from 'react';
import { DefaultTheme as Theme, makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import { graphql, StaticQuery } from 'gatsby';
import ReactHtmlParser from 'react-html-parser';
import { GatsbyImage, GatsbyImageData } from 'gatsby-plugin-image';
import BackgroundImage from 'gatsby-background-image';
import clsx from 'clsx';

import Title from 'web-components/lib/components/title';
import Description from 'web-components/lib/components/description';

interface ContextSectionProps {
  description: string;
  image: {
    childImageSharp: {
      gatsbyImageData: GatsbyImageData;
    };
  };
  challenges: {
    text: string;
  }[];
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    borderTop: `1px solid ${theme.palette.grey[100]}`,
    borderBottom: `1px solid ${theme.palette.grey[100]}`,
    [theme.breakpoints.up(theme.breakpoints.values.tablet)]: {
      paddingTop: theme.spacing(22.5),
      paddingBottom: theme.spacing(22.5),
    },
    [theme.breakpoints.up('md')]: {
      paddingLeft: theme.spacing(37.5),
    },
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(10),
    },
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      paddingTop: theme.spacing(22.5),
      paddingBottom: theme.spacing(12.5),
    },
    [theme.breakpoints.down('xs')]: {
      paddingRight: 0,
      paddingLeft: 0,
    },
    [theme.breakpoints.up('xl')]: {
      paddingLeft: theme.spacing(5),
    },
  },
  title: {
    [theme.breakpoints.up(theme.breakpoints.values.tablet)]: {
      paddingTop: theme.spacing(6),
    },
  },
  description: {
    lineHeight: '150%',
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(4.5),
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(5.5),
    },
  },
  image: {
    float: 'right',
    width: '100%',
  },
  grid: {
    // [theme.breakpoints.up(theme.breakpoints.values.tablet)]: {
    //   alignItems: 'center',
    // },
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      flexDirection: 'column-reverse',
    },
  },
  text: {
    [theme.breakpoints.up(theme.breakpoints.values.tablet)]: {
      paddingRight: theme.spacing(15),
      flexGrow: 0,
      flexBasis: '60%',
      maxWidth: '60%',
    },
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      paddingTop: theme.spacing(10),
      paddingRight: theme.spacing(4),
      paddingLeft: theme.spacing(4),
    },
    [theme.breakpoints.between('md', 'xl')]: {
      maxWidth: theme.spacing(170),
    },
    [theme.breakpoints.up('xl')]: {
      maxWidth: theme.spacing(196),
    },
    marginLeft: 'auto',
  },
  list: {
    listStyle: 'none',
    counterReset: 'challenge-counter',
    marginLeft: theme.spacing(6),
  },
  item: {
    counterIncrement: 'challenge-counter',
    marginBottom: 0,
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(3),
    },
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(4.75),
    },
    '&::before': {
      content: 'counter(challenge-counter)',
      color: theme.palette.secondary.main,
      fontWeight: 900,
      marginLeft: theme.spacing(-6),
      marginRight: theme.spacing(2.75),
      fontFamily: theme.typography.h1.fontFamily,
      [theme.breakpoints.up('sm')]: {
        fontSize: theme.spacing(5.5),
      },
      [theme.breakpoints.down('xs')]: {
        fontSize: theme.spacing(4.5),
      },
    },
  },
  imageContainer: {
    [theme.breakpoints.up(theme.breakpoints.values.tablet)]: {
      flexGrow: 0,
      flexBasis: '40%',
      maxWidth: '40%',
    },
  },
}));

const ContextSection = ({ description, image, challenges }: ContextSectionProps): JSX.Element => {
  const classes = useStyles();

  return (
    <StaticQuery
      query={graphql`{
  bg: file(relativePath: {eq: "topo-bg-top.png"}) {
    childImageSharp {
      gatsbyImageData(quality: 90, layout: FULL_WIDTH)
    }
  }
  imageBg: file(relativePath: {eq: "image-bg.png"}) {
    childImageSharp {
      gatsbyImageData(quality: 90, layout: FULL_WIDTH)
    }
  }
  text: caseStudiesYaml {
    caseStudies {
      contextSection {
        header
        challenges
      }
    }
  }
}
`}
      render={data => {
        const content = data.text.caseStudies.contextSection;
        return (
          <BackgroundImage fluid={data.bg.childImageSharp.gatsbyImageData}>
            <div className={classes.root}>
              <Grid className={classes.grid} container wrap="nowrap">
                <Grid item xs={12} className={classes.text}>
                  <Title variant="h2" className={classes.title}>
                    {content.header}
                  </Title>
                  <Description className={classes.description}>{ReactHtmlParser(description)}</Description>
                  <Title variant="h2" className={classes.title}>
                    {content.challenges}
                  </Title>
                  <ol className={classes.list}>
                    {challenges.map(({ text }, i) => (
                      <Description key={i} component="li" className={clsx(classes.description, classes.item)}>
                        {text}
                      </Description>
                    ))}
                  </ol>
                </Grid>
                <Grid item xs={12} className={classes.imageContainer}>
                  <GatsbyImage image={image.childImageSharp.gatsbyImageData} className={classes.image} />
                </Grid>
              </Grid>
            </div>
          </BackgroundImage>
        );
      }}
    />
  );
};

export default ContextSection;
