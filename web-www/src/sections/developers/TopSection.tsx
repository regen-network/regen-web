import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { DefaultTheme as Theme, makeStyles } from '@mui/styles';
import BackgroundSection from '../../components/BackgroundSection';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  topSection: {
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(64),
    },
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(60),
    },
  },
  title: {
    fontWeight: 'normal',
    fontFamily: theme.typography.overline.fontFamily,
    lineHeight: '160%',
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(4.5),
    },
  },
}));

const TopSection = (): JSX.Element => {
  const classes = useStyles();
  const data = useStaticQuery(graphql`{
  background: file(relativePath: {eq: "developers-top-image.jpg"}) {
    childImageSharp {
      gatsbyImageData(quality: 90, layout: FULL_WIDTH)
    }
  }
  text: developersYaml {
    topSection {
      header
      body
    }
  }
}
`);
  const content = data.text.topSection;
  const imageData = data.background.childImageSharp.gatsbyImageData;
  return (
    <BackgroundSection
      linearGradient="linear-gradient(220.67deg, rgba(250, 235, 209, 0.6) 21.4%, rgba(125, 201, 191, 0.6) 46.63%, rgba(81, 93, 137, 0.6) 71.86%), linear-gradient(180deg, rgba(0, 0, 0, 0.684) 0%, rgba(0, 0, 0, 0) 97.78%)"
      header={content.header}
      body={content.body}
      imageData={imageData}
      titleClassName={classes.title}
      titleVariant="h2"
      className={classes.topSection}
    />
  );
};

export default TopSection;
