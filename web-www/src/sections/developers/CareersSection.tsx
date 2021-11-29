import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import { makeStyles, DefaultTheme as Theme } from '@mui/styles';
import ReactHtmlParser from 'react-html-parser';

import Title from 'web-components/lib/components/title';
import Description from 'web-components/lib/components/description';
import OutlinedButton from 'web-components/lib/components/buttons/OutlinedButton';
import BackgroundSection from '../../components/BackgroundSection';

const useStyles = makeStyles((theme: Theme) => ({
  section: {
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(17.75),
    },
  },
  title: {
    lineHeight: '145%',
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(9),
    },
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(6),
    },
  },
  caption: {
    fontWeight: 'normal',
    fontFamily: theme.typography.overline.fontFamily,
    color: theme.palette.secondary.main,
    textAlign: 'center',
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(7),
      lineHeight: '130%',
      paddingBottom: theme.spacing(6),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(5),
      lineHeight: '160%',
      paddingBottom: theme.spacing(3.75),
    },
  },
  description: {
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(4.5),
      maxWidth: theme.spacing(188.5),
      margin: '0 auto',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(4),
    },
  },
  buttonContainer: {
    textAlign: 'center',
    marginTop: theme.spacing(7.5),
  },
  button: {
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(4.5),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(3.5),
    },
  },
}));

const CareersSection = (): JSX.Element => {
  const classes = useStyles();

  return (
    <StaticQuery
      query={graphql`{
  background: file(relativePath: {eq: "developers-careers-bg.jpg"}) {
    childImageSharp {
      gatsbyImageData(quality: 90, layout: FULL_WIDTH)
    }
  }
  content: developersYaml {
    careersSection {
      header
      body
      caption
      buttonLink
      buttonText
    }
  }
}
`}
      render={data => {
        const content = data.content.careersSection;
        return (
          <BackgroundSection
            linearGradient="unset"
            topSection={false}
            className={classes.section}
            imageData={data.background.childImageSharp.gatsbyImageData}
          >
            <div className={classes.caption}>{content.caption}</div>
            <Title align="center" className={classes.title} variant="h2">
              {content.header}
            </Title>
            <Description align="center" className={classes.description}>
              {ReactHtmlParser(content.body)}
            </Description>
            <div className={classes.buttonContainer}>
              <OutlinedButton className={classes.button} target="_blank" href={content.buttonLink}>
                {content.buttonText}
              </OutlinedButton>
            </div>
          </BackgroundSection>
        );
      }}
    />
  );
};

export default CareersSection;
