import { Box } from '@mui/material';

import { Body, Label } from 'web-components/lib/components/typography';
import { truncate } from 'web-components/lib/utils/truncate';

import { getAccountUrl } from 'lib/block-explorer';

import { LinkWithArrow } from 'components/atoms';

interface Props {
  accountAddress: string | undefined;
}

export const PortfolioHeader = ({ accountAddress }: Props): JSX.Element => {
  return (
    <Box sx={{ mt: { xs: 2, sm: 4 }, mb: { xs: 4, sm: 8 } }}>
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
          href={getAccountUrl(accountAddress ?? '')}
          label={truncate(accountAddress ?? '')}
        />
      </Body>
    </Box>
  );
};
