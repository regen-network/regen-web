import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Theme, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import ReactHtmlParser from 'react-html-parser';

import Section from 'web-components/src/components/section';
import { MarketingDescription as Description } from '../../components/Description';

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
  title: {
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.typography.pxToRem(32),
    },
  },
}));

type QueryData = {
  text: {
    foldSection: {
      title: string;
      body: string;
    };
  };
};

const FoldSection = (): JSX.Element => {
  const styles = useStyles();

  const {
    text: {
      foldSection: { title, body },
    },
  } = useStaticQuery<QueryData>(graphql`
    query {
      text: fundYaml {
        foldSection {
          title
          body
        }
      }
    }
  `);

  return (
    <Section title={title} classes={{ root: clsx(styles.root, styles.center), title: styles.title }}>
      <Description className={clsx(styles.content, styles.center)}>{ReactHtmlParser(body)}</Description>
    </Section>
  );
};

export default FoldSection;
