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
    maxWidth: theme.spacing(200),
  },
  description: {
    color: theme.palette.primary.main,
    fontSize: theme.spacing(6),
    textAlign: 'center',
    '& a': {
      color: theme.palette.secondary.light,
      '&:link': {
        textDecoration: 'underline',
      },
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(5),
      padding: `${theme.spacing(2.5)} ${theme.spacing(4)}`,
    },
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(7),
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: 0,
      paddingBottom: 0,
    },
  },
  button: {
    width: theme.spacing(72),
    [theme.breakpoints.down('xs')]: {
      padding: `${theme.spacing(3)} ${theme.spacing(4)}`,
      fontSize: '1.125rem',
      '&:first-child': {
        marginBottom: theme.spacing(6),
      },
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.3125rem',
      marginRight: theme.spacing(4),
      marginLeft: theme.spacing(4),
    },
  },
}));

interface MoreQuestionsSectionProps {
  startSellerFlow: () => void;
}

const MoreQuestionsSection = ({ startSellerFlow }: MoreQuestionsSectionProps): JSX.Element => {
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
          firstButtonText
          firstButtonUrl
          secondButtonText
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
          <ContainedButton className={classes.button} href={content.firstButtonUrl}>
            {content.firstButtonText}
          </ContainedButton>
          <OutlinedButton className={classes.button} onClick={startSellerFlow}>
            {content.secondButtonText}
          </OutlinedButton>
        </div>
      </div>
    </FAQSection>
  );
};

export default MoreQuestionsSection;
