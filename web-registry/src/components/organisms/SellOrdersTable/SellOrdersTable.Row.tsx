import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import { Box } from '@mui/material';

import AxlUsdcIcon from 'web-components/lib/components/icons/coins/AxlUsdcIcon';
import EeurIcon from 'web-components/lib/components/icons/coins/EeurIcon';
import GravUsdcIcon from 'web-components/lib/components/icons/coins/GravUsdcIcon';
import UsdcIcon from 'web-components/lib/components/icons/coins/UsdcIcon';
import { RegenTokenIcon } from 'web-components/lib/components/icons/RegenTokenIcon';
import { formatDate, formatNumber } from 'web-components/lib/utils/format';
import { truncate } from 'web-components/lib/utils/truncate';

import { microToDenom } from 'lib/denom.utils';

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
    batchStartDate,
    batchEndDate,
    project,
  },
}: Props): React.ReactNode[] => [
  <Link href={`/marketplace/sell-order/${id}`}>{id}</Link>,
  <WithLoader isLoading={project?.name === undefined} variant="skeleton">
    <Link href={`/projects/${project?.id}}`}>{project?.name}</Link>
  </WithLoader>,
  <Box sx={{ fontWeight: 700, display: 'flex', alignItems: 'center' }}>
    <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
      {askDenom === 'uusdc' && <UsdcIcon />}
      {askDenom === 'ugravusdc' && <GravUsdcIcon />}
      {askDenom === 'uaxlusdc' && <AxlUsdcIcon />}
      {askDenom === 'eeur' && <EeurIcon />}
      {askDenom === 'uregen' && <RegenTokenIcon />}
    </Box>
    {`${formatNumber({ num: microToDenom(askAmount) })}`}
  </Box>,
  <Box>{formatNumber({ num: amountAvailable })}</Box>,
  <WithLoader isLoading={project?.classIdUrl === undefined} variant="skeleton">
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
  <WithLoader isLoading={batchStartDate === undefined} variant="skeleton">
    <Box sx={{ color: 'info.main' }}>
      {batchStartDate ? formatDate(batchStartDate) : ''}
    </Box>
  </WithLoader>,
  <WithLoader isLoading={batchEndDate === undefined} variant="skeleton">
    <Box sx={{ color: 'info.main' }}>
      {batchEndDate ? formatDate(batchEndDate) : ''}
    </Box>
  </WithLoader>,
  <Link href={getAccountUrl(seller)} target="_blank">
    {truncate(seller)}
  </Link>,
];

export default getSellOrdersTableRow;
