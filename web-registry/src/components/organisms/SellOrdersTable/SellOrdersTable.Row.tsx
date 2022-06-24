import { Box } from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';
import { RegenTokenIcon } from 'web-components/lib/components/icons/RegenTokenIcon';
import { formatDate, formatNumber } from 'web-components/lib/utils/format';
import { truncate } from 'web-components/lib/utils/truncate';
import { ReactComponent as USDCIcon } from '../../../assets/svgs/usdc.svg';
import { getAccountUrl } from '../../../lib/block-explorer';
import { NormalizedSellOrder } from '../../../pages/Marketplace/Storefront/Storefront.types';
import { Link } from '../../atoms';
import WithLoader from '../../atoms/WithLoader';

type Props = {
  sellOrder: NormalizedSellOrder;
};

const getSellOrdersTableRow = ({
  sellOrder: {
    askAmount,
    askDenom,
    batchDenom,
    id,
    amountAvailable,
    seller,
    expiration,
    creditClass,
    batchStartDate,
    batchEndDate,
  },
}: Props): React.ReactNode[] => [
  <Link href={`/marketplace/sell-order/${id}`}>{id}</Link>,
  <Box sx={{ color: 'info.main' }}>{dayjs(expiration).fromNow()}</Box>,
  <Link href={`/projects/Wilmot}`}>{'??'}</Link>,
  <Box sx={{ fontWeight: 700, display: 'flex', alignItems: 'center' }}>
    <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
      {askDenom === 'usdc' && <USDCIcon />}
      {askDenom === 'uregen' && <RegenTokenIcon />}
    </Box>
    {`${formatNumber(askAmount)}`}
  </Box>,
  <Box>{formatNumber(amountAvailable)}</Box>,
  <WithLoader isLoading={!creditClass}>
    <Link href={`/credit-classes/${creditClass}`}>{creditClass}</Link>
  </WithLoader>,
  <Link
    href={`/credit-batches/${batchDenom}`}
    sx={{
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: 'block',
      maxWidth: '74px',
      direction: 'rtl',
    }}
  >
    {batchDenom}
  </Link>,
  <WithLoader isLoading={!batchStartDate}>
    <Box sx={{ color: 'info.main' }}>{formatDate(batchStartDate)}</Box>
  </WithLoader>,
  <WithLoader isLoading={!batchEndDate}>
    <Box sx={{ color: 'info.main' }}>{formatDate(batchEndDate)}</Box>
  </WithLoader>,
  <Link href={getAccountUrl(seller)} target="_blank">
    {truncate(seller)}
  </Link>,
];

export default getSellOrdersTableRow;
