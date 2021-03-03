import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import { useStaticQuery, graphql } from 'gatsby';
import ReactHtmlParser from 'react-html-parser';

import FAQSection from '../shared/FAQSection';
import Description from 'web-components/lib/components/description';
import ContainedButton from 'web-components/src/components/buttons/ContainedButton';
import OutlinedButton from 'web-components/lib/components/buttons/OutlinedButton';

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    display: 'flex',
    flexDirection: 'column',
  },
  description: {
    color: theme.palette.primary.main,
    fontSize: theme.spacing(7),
    fontWeight: 600,
    textAlign: 'center',

    // [theme.breakpoints.down('xs')]: {
    //   fontSize: theme.spacing(3),
    //   padding: `${theme.spacing(2.5)} ${theme.spacing(4)}`,
    // },
    // [theme.breakpoints.up('sm')]: {
    //   fontSize: theme.spacing(3.5),
    //   padding: `${theme.spacing(2)} ${theme.spacing(5)}`,
    // },
    '& a': {
      color: theme.palette.secondary.light,
    },
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-evenly',
    marginTop: theme.spacing(5),
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
  },
  button: {
    width: 300, //todo

    [theme.breakpoints.down('xs')]: {
      padding: `${theme.spacing(3)} ${theme.spacing(4)}`,
      fontSize: '1.125rem',
      width: 250, //todo
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.3125rem',
    },
  },
}));

const MoreQuestionsSection = (): JSX.Element => {
  const classes = useStyles({});
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
          description
        }
      }
    }
  `);
  const content = data.text.moreQuestionsSection;
  const imageData = data.background.childImageSharp.fluid;

  return (
    <FAQSection header={content.header} category="carbonplus credits" imageData={imageData}>
      <div className={classes.content}>
        <Description className={classes.description}>{ReactHtmlParser(content.description)}</Description>
        <div className={classes.buttons}>
          <ContainedButton className={classes.button}>view resources</ContainedButton>
          <OutlinedButton className={classes.button}>start the process</OutlinedButton>
        </div>
      </div>
    </FAQSection>
  );
};

export default MoreQuestionsSection;
