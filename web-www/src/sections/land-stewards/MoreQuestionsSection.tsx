import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import { useStaticQuery, graphql } from 'gatsby';
import ReactHtmlParser from 'react-html-parser';

import FAQSection from '../shared/FAQSection';
import Description from 'web-components/lib/components/description';

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    display: 'flex',
  },
  description: {
    // flex: '1 0 auto',
    color: theme.palette.primary.main,
    fontSize: theme.spacing(7),
    textAlign: 'center',

    // [theme.breakpoints.down('xs')]: {
    //   fontSize: theme.spacing(3),
    //   padding: `${theme.spacing(2.5)} ${theme.spacing(4)}`,
    // },
    // [theme.breakpoints.up('sm')]: {
    //   fontSize: theme.spacing(3.5),
    //   padding: `${theme.spacing(2)} ${theme.spacing(5)}`,
    // },
  },
  buttons: {
    display: 'flex',
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
        <div className={classes.buttons}></div>
      </div>
    </FAQSection>
  );
};

export default MoreQuestionsSection;
