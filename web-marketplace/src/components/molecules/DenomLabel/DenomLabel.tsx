import { SxProps, Theme } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { sxToArray } from 'utils/mui/sxToArray';

import { Label } from 'web-components/src/components/typography';
import { LabelSize } from 'web-components/src/components/typography/sizing';

import { useLedger } from 'ledger';
import { getAllowedDenomQuery } from 'lib/queries/react-query/ecocredit/marketplace/getAllowedDenomQuery/getAllowedDenomQuery';

import WithLoader from 'components/atoms/WithLoader';

import { findDisplayDenom } from './DenomLabel.utils';

export interface Props {
  size: LabelSize;
  bankDenom: string;
  baseDenom?: string;
  sx?: SxProps<Theme>;
}

const DenomLabel = ({
  bankDenom,
  baseDenom,
  size,
  sx = [],
}: Props): JSX.Element => {
  const { marketplaceClient } = useLedger();
  const { data: allowedDenoms, isLoading: isLoadingAllowedDenoms } = useQuery(
    getAllowedDenomQuery({
      client: marketplaceClient,
      enabled: !!marketplaceClient,
    }),
  );

  const displayDenom = findDisplayDenom({
    allowedDenoms,
    bankDenom,
    baseDenom,
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
