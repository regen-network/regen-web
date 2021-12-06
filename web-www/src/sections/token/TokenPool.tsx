import React from 'react';
import { Theme, makeStyles, useMediaQuery, useTheme } from '@material-ui/core';
import { graphql, useStaticQuery } from 'gatsby';
import clsx from 'clsx';

import Section from 'web-components/src/components/section';
import { MarketingDescription as Description } from '../../components/Description';
import { TokenPoolQuery } from '../../generated/graphql';
import SanityImage from 'gatsby-plugin-sanity-image';

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

const query = graphql`
  query TokenPool {
    sanityTokenPage {
      poolSection {
        title
        subtitle
        image {
          ...Image
        }
        mobileImage {
          ...Image
        }
      }
    }
  }
`;

const TokenEconomics = (): JSX.Element => {
  const styles = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  const { sanityTokenPage } = useStaticQuery<TokenPoolQuery>(query);
  const data = sanityTokenPage?.poolSection;

  return isMobile ? (
    <div className={styles.root}>
      <SanityImage className={styles.image} {...(data?.mobileImage as any)} />
    </div>
  ) : (
    <Section
      title={data?.title || ''}
      classes={{ root: clsx(styles.root, styles.center), title: styles.title }}
    >
      <Description className={clsx(styles.content, styles.center)}>{data?.subtitle}</Description>
      <SanityImage className={styles.image} {...(data?.image as any)} />
    </Section>
  );
};
export default TokenEconomics;
