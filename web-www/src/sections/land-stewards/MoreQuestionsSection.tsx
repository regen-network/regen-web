import React from 'react';
import { makeStyles, Theme, useTheme } from '@material-ui/core';
import { useStaticQuery, graphql, Link } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';

import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';
import Section from 'web-components/src/components/section';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(20),
      paddingTop: theme.spacing(52.5),
      paddingBottom: theme.spacing(52.5),
    },
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(56.25),
      paddingBottom: theme.spacing(56.25),
    },
    '& a': {
      textDecoration: 'none',
      '&:link, &:visited, &:hover, &:active': {
        textDecoration: 'none',
      },
    },
  },
  button: {
    textAlign: 'center',
  },
  title: {
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(8),
      paddingBottom: theme.spacing(7.5),
    },
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(9.5),
    },
  },
}));

const MoreQuestionsSection = () => {
  const data = useStaticQuery(graphql`
    query {
      background: file(relativePath: { eq: "more-questions-bg.png" }) {
        childImageSharp {
          fluid(quality: 90) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
      text: landStewardsYaml {
        moreQuestionsSection {
          header
        }
      }
    }
  `);
  const content = data.text.moreQuestionsSection;
  const imageData = data.background.childImageSharp.fluid;
  const classes = useStyles({});
  const theme = useTheme();

  return (
    <BackgroundImage Tag="div" fluid={imageData}>
      <Section
        titleColor={theme.palette.primary.main}
        titleClassName={classes.title}
        className={classes.root}
        title={content.header}
      >
        <div className={classes.button}>
          <Link to={`/faq`} state={{ category: 'carbonplus credits' }}>
            <ContainedButton>view faq</ContainedButton>
          </Link>
        </div>
      </Section>
    </BackgroundImage>
  );
};

export default MoreQuestionsSection;
