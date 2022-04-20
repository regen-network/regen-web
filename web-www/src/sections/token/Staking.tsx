import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { makeStyles } from '@mui/styles';

import { Theme } from 'web-components/lib/theme/muiTheme';
import Section from 'web-components/lib/components/section';
import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';
import { TokenStakingQuery } from '../../generated/graphql';
import { BlockContent } from 'web-components/src/components/block-content';
import { Body, Title } from 'web-components/lib/components/typography';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  content: {
    width: '80%',
    maxWidth: theme.spacing(236.5),
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  title: {
    [theme.breakpoints.down('sm')]: {
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
      title={
        <Title variant="h2" mobileVariant="h3">
          {data?.title}
        </Title>
      }
      classes={{ root: styles.center }}
    >
      <Body
        size="xl"
        sx={{
          py: 4,
          mb: 4,
          textAlign: 'center',
          width: ['100%', '80%'],
          maxWidth: theme => theme.spacing(236.5),
        }}
      >
        <BlockContent content={data?._rawBody} />
      </Body>
      <ContainedButton
        size="large"
        href={data?.button?.buttonLink?.buttonHref || ''}
      >
        {data?.button?.buttonText}
      </ContainedButton>
    </Section>
  );
};

export default Staking;
