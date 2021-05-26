import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Theme, makeStyles } from '@material-ui/core';
import clsx from 'clsx';

import Section from 'web-components/src/components/section';
import Title from 'web-components/src/components/title';
import ContainedButton from 'web-components/src/components/buttons/ContainedButton';
import { TokenDescription as Description } from './Description';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {},
  content: {
    width: '80%',
    maxWidth: theme.spacing(236.5),
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down('xs')]: {
      width: '100%',
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
    <Section className={clsx(styles.root, styles.center)} title={title} titleVariant="h3">
      <Description className={clsx(styles.content, styles.center)}>{body}</Description>
      <ContainedButton href={buttonUrl}>{buttonText}</ContainedButton>
    </Section>
  );
};

export default Staking;
