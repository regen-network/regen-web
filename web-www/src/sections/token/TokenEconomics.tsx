import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';

import { Theme } from 'web-components/lib/theme/muiTheme';
import Section from 'web-components/lib/components/section';
import { BlockContent } from 'web-components/src/components/block-content';
import { TokenEconomicsQuery } from '../../generated/graphql';
import { Body, Title } from 'web-components/lib/components/typography';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& p': {
      textAlign: 'center',
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
      title={
        <Title variant="h2" mobileVariant="h3">
          {data?.title}
        </Title>
      }
      classes={{ root: clsx(styles.root, styles.center), title: styles.title }}
    >
      <Body
        as="div"
        size="xl"
        mobileSize="md"
        sx={{
          width: ['100%', '80%'],
          maxWidth: 946,
        }}
      >
        <BlockContent content={data?._rawBody} />
      </Body>
    </Section>
  );
};

export default TokenEconomics;
