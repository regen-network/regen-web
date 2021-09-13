import React from 'react';
import { Theme, makeStyles, useMediaQuery, useTheme } from '@material-ui/core';
import { graphql, useStaticQuery } from 'gatsby';
import clsx from 'clsx';

import Section from 'web-components/src/components/section';
import { MarketingDescription as Description } from '../../components/Description';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  center: {
    alignItems: 'center',
    textAlign: 'center',
  },
  content: {
    width: '80%',
    maxWidth: theme.spacing(236.5),
    margin: theme.spacing(4, 0, 8),
  },
  image: {
    width: '100%',
  },
  title: {
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.typography.pxToRem(32),
    },
  },
}));

type QueryData = {
  text: {
    tokenPool: {
      title: string;
      subtitle: string;
    };
  };
};

const TokenEconomics = (): JSX.Element => {
  const styles = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  const {
    text: {
      tokenPool: { title, subtitle },
    },
  } = useStaticQuery<QueryData>(graphql`
    query {
      text: tokenYaml {
        tokenPool {
          title
          subtitle
        }
      }
    }
  `);
  const imageTitle = 'Token Pool';

  return isMobile ? (
    <div className={styles.root}>
      <img
        src="../media/token-pool-mobile.svg"
        className={styles.image}
        title={imageTitle}
        alt={imageTitle}
      />
    </div>
  ) : (
    <Section title={title} classes={{ root: clsx(styles.root, styles.center), title: styles.title }}>
      <Description className={clsx(styles.content, styles.center)}>{subtitle}</Description>
      <img src="../media/token-pool.svg" className={styles.image} title={imageTitle} alt={imageTitle} />
    </Section>
  );
};
export default TokenEconomics;
