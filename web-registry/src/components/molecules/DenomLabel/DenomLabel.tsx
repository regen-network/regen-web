import { SxProps, Theme } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { sxToArray } from 'utils/mui/sxToArray';

import { Label } from 'web-components/lib/components/typography';
import { LabelSize } from 'web-components/lib/components/typography/sizing';

import { useLedger } from 'ledger';
import { getAllowedDenomQuery } from 'lib/queries/react-query/ecocredit/marketplace/getAllowedDenomQuery/getAllowedDenomQuery';

import WithLoader from 'components/atoms/WithLoader';

import { findDisplayDenom } from './DenomLabel.utils';

export interface Props {
  size: LabelSize;
  denom: string;
  sx?: SxProps<Theme>;
}

const DenomLabel = ({ denom, size, sx = [] }: Props): JSX.Element => {
  const { marketplaceClient } = useLedger();
  const { data: allowedDenomsData, isLoading: isLoadingAllowedDenoms } =
    useQuery(
      getAllowedDenomQuery({
        client: marketplaceClient,
        enabled: !!marketplaceClient,
      }),
    );

  const displayDenom = findDisplayDenom({
    allowedDenomsData,
    denom,
  });

  return (
    <WithLoader
      variant="skeleton"
      isLoading={isLoadingAllowedDenoms}
      sx={{ width: '100%' }}
    >
      <Label size={size} sx={[{ textTransform: 'initial' }, ...sxToArray(sx)]}>
        {displayDenom}
      </Label>
    </WithLoader>
  );
};

export { DenomLabel };
