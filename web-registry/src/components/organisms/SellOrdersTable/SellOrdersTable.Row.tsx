import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import { Box } from '@mui/material';
import dayjs from 'dayjs';

import { RegenTokenIcon } from 'web-components/lib/components/icons/RegenTokenIcon';
import { formatDate, formatNumber } from 'web-components/lib/utils/format';
import { truncate } from 'web-components/lib/utils/truncate';

import { microToDenom } from 'lib/denom.utils';

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
    batchStartDate,
    batchEndDate,
    project,
  },
}: Props): React.ReactNode[] => [
  <Link href={`/marketplace/sell-order/${id}`}>{id}</Link>,
  <Box sx={{ color: 'info.main' }}>{dayjs(expiration).fromNow()}</Box>,
  <WithLoader isLoading={project?.name === undefined}>
    <Link href={`/projects/${project?.id}}`}>{project?.name}</Link>
  </WithLoader>,
  <Box sx={{ fontWeight: 700, display: 'flex', alignItems: 'center' }}>
    <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
      {askDenom === 'usdc' && <USDCIcon />}
      {askDenom === 'uregen' && <RegenTokenIcon />}
    </Box>
    {`${formatNumber(microToDenom(askAmount))}`}
  </Box>,
  <Box>{formatNumber(amountAvailable)}</Box>,
  <WithLoader isLoading={project?.classIdUrl === undefined}>
    <Link href={`/credit-classes/${project?.classIdUrl}`}>
      {project?.classIdName && ReactHtmlParser(project?.classIdName)}
    </Link>
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
  <WithLoader isLoading={batchStartDate === undefined}>
    <Box sx={{ color: 'info.main' }}>
      {batchStartDate ? formatDate(batchStartDate) : ''}
    </Box>
  </WithLoader>,
  <WithLoader isLoading={batchEndDate === undefined}>
    <Box sx={{ color: 'info.main' }}>
      {batchEndDate ? formatDate(batchEndDate) : ''}
    </Box>
  </WithLoader>,
  <Link href={getAccountUrl(seller)} target="_blank">
    {truncate(seller)}
  </Link>,
];

export default getSellOrdersTableRow;
