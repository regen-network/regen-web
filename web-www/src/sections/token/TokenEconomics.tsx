import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Theme, makeStyles } from '@material-ui/core';
import clsx from 'clsx';

import Section from 'web-components/src/components/section';
import Title from 'web-components/src/components/title';
import { TokenDescription as Description } from './Description';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& p': {
      textAlign: 'center',
    },
  },
  content: {
    width: '80%',
    maxWidth: theme.spacing(236.5),
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
}));

type QueryData = {
  text: {
    tokenEconomics: {
      title: string;
      body: string;
    };
  };
};

const TokenEconomics = (): JSX.Element => {
  const styles = useStyles();

  const {
    text: {
      tokenEconomics: { title, body },
    },
  } = useStaticQuery<QueryData>(graphql`
    query {
      text: tokenYaml {
        tokenEconomics {
          title
          body
        }
      }
    }
  `);

  return (
    <Section className={clsx(styles.root, styles.center)}>
      <div className={clsx(styles.content)}>
        <Title variant="h2" align="center">
          {title}
        </Title>
        <Description>{body}</Description>
      </div>
    </Section>
  );
};

export default TokenEconomics;
