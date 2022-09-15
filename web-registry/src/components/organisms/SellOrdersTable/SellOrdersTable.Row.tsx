import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import { Box } from '@mui/material';

import { formatDate, formatNumber } from 'web-components/lib/utils/format';
import { truncate } from 'web-components/lib/utils/truncate';

import { microToDenom } from 'lib/denom.utils';

import DenomIcon from 'components/molecules/DenomIcon';

import { getAccountUrl } from '../../../lib/block-explorer';
import { NormalizedSellOrder } from '../../../pages/Marketplace/Storefront/Storefront.types';
import { Link } from '../../atoms';
import WithLoader from '../../atoms/WithLoader';
import {
  MAXIMUM_FRACTION_DIGITS,
  MINIMUM_FRACTION_DIGITS,
} from './SellOrdersTable.constants';
import { getDenomCurrencyPrefix } from './SellOrdersTable.utils';

type Props = {
  sellOrder: NormalizedSellOrder;
};

const getSellOrdersTableRow = ({
  sellOrder: {
    askAmount,
    askDenom,
    askBaseDenom,
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
    <DenomIcon
      denom={askBaseDenom}
      sx={{ mr: 1, display: 'flex', alignItems: 'center' }}
    />
    {`${getDenomCurrencyPrefix({ baseDenom: askBaseDenom })}${formatNumber({
      num: microToDenom(askAmount),
      maximumFractionDigits: MAXIMUM_FRACTION_DIGITS,
      minimumFractionDigits: MINIMUM_FRACTION_DIGITS,
    })}`}
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
