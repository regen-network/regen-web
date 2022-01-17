import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';

import { Theme } from 'web-components/lib/theme/muiTheme';
import Section from 'web-components/lib/components/section';
import { MarketingDescription as Description } from '../../components/Description';
import { BlockContent } from 'web-components/src/components/block-content';
import { TokenEconomicsQuery } from '../../generated/graphql';

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
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  title: {
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(32),
    },
  },
}));

const query = graphql`
  query tokenEconomics {
    sanityTokenPage {
      tokenEconomics {
        title
        _rawBody
      }
    }
  }
`;
const TokenEconomics = (): JSX.Element => {
  const styles = useStyles();
  const { sanityTokenPage } = useStaticQuery<TokenEconomicsQuery>(query);
  const data = sanityTokenPage?.tokenEconomics;

  return (
    <Section
      title={data?.title || ''}
      classes={{ root: clsx(styles.root, styles.center), title: styles.title }}
    >
      <Description className={clsx(styles.content, styles.center)}>
        <BlockContent content={data?._rawBody} />
      </Description>
    </Section>
  );
};

export default TokenEconomics;
