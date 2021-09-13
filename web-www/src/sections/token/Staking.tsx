import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Theme, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import ReactHtmlParser from 'react-html-parser';

import Section from 'web-components/src/components/section';
import ContainedButton from 'web-components/src/components/buttons/ContainedButton';
import { MarketingDescription as Description } from '../../components/Description';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  content: {
    width: '80%',
    maxWidth: theme.spacing(236.5),
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  title: {
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.typography.pxToRem(32),
    },
  },
  center: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& p': {
      textAlign: 'center',
    },
  },
}));

type QueryData = {
  text: {
    staking: {
      title: string;
      body: string;
      buttonText: string;
      buttonUrl: string;
    };
  };
};

const Staking = (): JSX.Element => {
  const styles = useStyles();

  const {
    text: {
      staking: { title, body, buttonText, buttonUrl },
    },
  } = useStaticQuery<QueryData>(graphql`
    query {
      text: tokenYaml {
        staking {
          title
          body
          buttonText
          buttonUrl
        }
      }
    }
  `);

  return (
    <Section title={title} classes={{ root: clsx(styles.root, styles.center), title: styles.title }}>
      <Description className={clsx(styles.content, styles.center)}>{ReactHtmlParser(body)}</Description>
      <ContainedButton href={buttonUrl}>{buttonText}</ContainedButton>
    </Section>
  );
};

export default Staking;
