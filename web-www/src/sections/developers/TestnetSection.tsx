import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import ReactHtmlParser from 'react-html-parser';
import clsx from 'clsx';

import { Theme } from 'web-components/lib/theme/muiTheme';
import Description from 'web-components/lib/components/description';
import Title from 'web-components/lib/components/title';
import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';
import BackgroundSection from '../../components/BackgroundSection';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(20),
    },
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(22.5),
    },
  },
  title: {
    fontWeight: 'normal',
    fontFamily: theme.typography.overline.fontFamily,
    color: theme.palette.secondary.main,
    lineHeight: '140%',
    textAlign: 'center',
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(5),
    },
  },
  label: {
    fontFamily: theme.typography.overline.fontFamily,
    color: theme.palette.secondary.main,
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(4.5),
      paddingBottom: theme.spacing(1.5),
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(8),
      paddingBottom: theme.spacing(5),
    },
  },
  titleDescription: {
    [theme.breakpoints.up('sm')]: {
      width: '65%',
      margin: '0 auto',
    },
  },
  description: {
    lineHeight: '150%',
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(3.25),
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(4.5),
      paddingTop: theme.spacing(4.5),
      paddingBottom: theme.spacing(7.25),
    },
    '& p': {
      marginTop: 0,
    },
  },
  address: {
    lineHeight: '150%',
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(8.25),
      paddingBottom: theme.spacing(20),
    },
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(6),
    },
  },
  buttonContainer: {
    textAlign: 'center',
  },
  button: {
    [theme.breakpoints.up('md')]: {
      width: '100%',
      paddingRight: theme.spacing(2.5),
      paddingLeft: theme.spacing(2.5),
      maxWidth: theme.spacing(67.5),
    },
  },
}));

const TestnetSection = (): JSX.Element => {
  const data = useStaticQuery(graphql`{
  background: file(relativePath: {eq: "testnet-bg.jpg"}) {
    childImageSharp {
      fluid(quality: 90) {
        ...GatsbyImageSharpFluid_withWebp
      }
    }
  }
  text: developersYaml {
    testnetSection {
      header
      description
      address
      leftColumnLabel
      leftColumnContent
      rightColumnLabel
      rightColumnContent
      buttonText
      buttonLink
    }
  }
}
`);
  const content = data.text.testnetSection;
  const classes = useStyles();
  return (
    <BackgroundSection
      className={classes.root}
      linearGradient="unset"
      topSection={false}
      imageData={data.background.childImageSharp.fluid}
      header={content.header}
      titleClassName={classes.title}
      titleVariant="h2"
    >
      <Description className={clsx(classes.titleDescription, classes.description)} align="center">
        {content.description}
      </Description>
      <Title align="center" variant="h4" className={classes.address}>
        {content.address}
      </Title>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={4}>
          <div className={classes.label}>{content.leftColumnLabel}</div>
          <Description className={classes.description}>
            {ReactHtmlParser(content.leftColumnContent)}
          </Description>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <div className={classes.label}>{content.rightColumnLabel}</div>
          <Description className={classes.description}>
            {ReactHtmlParser(content.rightColumnContent)}
          </Description>
        </Grid>
        <Grid item xs={12} md={4} className={classes.buttonContainer}>
          <ContainedButton
            href={content.buttonLink}
            rel="noopener noreferrer"
            target="_blank"
            className={classes.button}
          >
            {content.buttonText}
          </ContainedButton>
        </Grid>
      </Grid>
    </BackgroundSection>
  );
};

export default TestnetSection;
