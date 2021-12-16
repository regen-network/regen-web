import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Theme, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import ReactHtmlParser from 'react-html-parser';

import Section from 'web-components/src/components/section';
import ContainedButton from 'web-components/src/components/buttons/ContainedButton';
import { MarketingDescription as Description } from '../../components/Description';
import { TokenStakingQuery } from '../../generated/graphql';
import { BlockContent } from 'web-components/src/components/block-content';

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

const query = graphql`
  query tokenStaking {
    sanityTokenPage {
      stakingSection {
        title
        _rawBody
        button {
          buttonText
          buttonLink {
            buttonHref
          }
        }
      }
    }
  }
`;

const Staking = (): JSX.Element => {
  const styles = useStyles();
  const { sanityTokenPage } = useStaticQuery<TokenStakingQuery>(query);
  const data = sanityTokenPage?.stakingSection;

  return (
    <Section
      title={data?.title || ''}
      classes={{ root: clsx(styles.root, styles.center), title: styles.title }}
    >
      <Description className={clsx(styles.content, styles.center)}>
        <BlockContent withPadding content={data?._rawBody} />
      </Description>
      <ContainedButton href={data?.button?.buttonLink?.buttonHref || ''}>
        {data?.button?.buttonText}
      </ContainedButton>
    </Section>
  );
};

export default Staking;
