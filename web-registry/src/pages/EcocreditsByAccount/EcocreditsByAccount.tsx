import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';

import Section from 'web-components/lib/components/section';
import { Body, Label } from 'web-components/lib/components/typography';
import { truncate } from 'web-components/lib/utils/truncate';

import { getAccountUrl } from 'lib/block-explorer';

import { LinkWithArrow } from 'components/atoms';
import { Portfolio } from 'components/organisms';
import { useBasketTokens, useEcocredits, useQueryBaskets } from 'hooks';

export const EcocreditsByAccount = (): JSX.Element => {
  const baskets = useQueryBaskets();

  const { accountAddress } = useParams<{ accountAddress: string }>();
  const { credits } = useEcocredits({ address: accountAddress });
  const { basketTokens } = useBasketTokens(accountAddress, baskets);

  return (
    <Box sx={{ backgroundColor: 'grey.50' }}>
      <Section title="Portfolio" titleVariant="h2" titleAlign="left">
        <Box sx={{ mt: { xs: 1.25, sm: 3 } }}>
          <Label size="sm" mobileSize="sm" sx={{ display: 'inline' }}>
            Account:
          </Label>
          <Body
            size="lg"
            sx={{
              display: 'inline',
              mx: 2,
              '& a': {
                fontWeight: 'normal',
                color: 'black',
                textDecoration: 'none',
              },
            }}
          >
            <LinkWithArrow
              href={getAccountUrl(accountAddress || '')}
              label={truncate(accountAddress || '')}
            />
          </Body>
        </Box>
        <Portfolio credits={credits} basketTokens={basketTokens} />
      </Section>
    </Box>
  );
};
