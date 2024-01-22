import React from 'react';
import { Box } from '@mui/material';
import { quantityFormatNumberOptions } from 'config/decimals';
import { tableStyles } from 'styles/table';

import { BlockContent } from 'web-components/src/components/block-content';
import InfoLabel from 'web-components/src/components/info-label';
import { formatDate, formatNumber } from 'web-components/src/utils/format';
import { truncate } from 'web-components/src/utils/truncate';

import DenomIcon from 'components/molecules/DenomIcon';
import DenomLabel from 'components/molecules/DenomLabel';

import { getAccountUrl } from '../../../lib/block-explorer';
import { NormalizedSellOrder } from '../../../pages/Marketplace/Storefront/Storefront.types';
import { Link } from '../../atoms';
import WithLoader from '../../atoms/WithLoader';
import {
  MAXIMUM_FRACTION_DIGITS,
  MINIMUM_FRACTION_DIGITS,
} from './SellOrdersTable.constants';
import { SellOrderPurchaseIcon } from './SellOrderstable.PurchaseIcon';

type Props = {
  sellOrder: NormalizedSellOrder;
};

const getSellOrdersTableRow = ({
  sellOrder: {
    askDenom,
    askUsdAmount,
    askBaseDenom,
    batchDenom,
    id,
    amountAvailable,
    seller,
    batchStartDate,
    batchEndDate,
    project,
    disableAutoRetire,
  },
}: Props): React.ReactNode[] => [
  <Box sx={{ color: 'info.main' }}>{id}</Box>,
  <WithLoader isLoading={project?.name === undefined} variant="skeleton">
    <Link href={`/project/${project?.id}`} sx={tableStyles.ellipsisColumn}>
      {project?.name}
    </Link>
  </WithLoader>,
  <Box sx={{ fontWeight: 700, display: 'flex', alignItems: 'center' }}>
    {`$${formatNumber({
      num: askUsdAmount,
      maximumFractionDigits: MAXIMUM_FRACTION_DIGITS,
      minimumFractionDigits: MINIMUM_FRACTION_DIGITS,
    })}`}
  </Box>,
  <Box sx={{ fontWeight: 700, display: 'flex', alignItems: 'center' }}>
    <DenomIcon
      baseDenom={askBaseDenom}
      sx={{ mr: 2.5, display: 'flex', alignItems: 'center' }}
      iconSx={{ fontSize: '30px' }}
    />
    <DenomLabel
      bankDenom={askDenom}
      baseDenom={askBaseDenom}
      size="sm"
      sx={{
        fontSize: { xs: '1rem' },
        color: 'info.main',
        fontWeight: 400,
        fontFamily: 'Lato',
      }}
    />
  </Box>,
  <Box sx={{ textAlign: 'right' }}>
    {formatNumber({ num: amountAvailable, ...quantityFormatNumberOptions })}
  </Box>,
  <WithLoader isLoading={project?.classId === undefined} variant="skeleton">
    <Link
      href={`/credit-classes/${project?.classId}`}
      sx={tableStyles.ellipsisContentColumn}
    >
      {project?.classIdOrName && (
        <BlockContent content={project?.classIdOrName} />
      )}
    </Link>
  </WithLoader>,
  <Link
    href={`/credit-batches/${batchDenom}`}
    sx={{ ...tableStyles.ellipsisColumn, direction: 'rtl' }}
  >
    {batchDenom}
  </Link>,
  <Box sx={{ display: 'flex', alignItems: 'center' }}>
    {disableAutoRetire && (
      <InfoLabel
        label="Tradable"
        variant="success"
        icon={<SellOrderPurchaseIcon icon="tradable" />}
        sx={{ mr: 4 }}
      />
    )}
    <InfoLabel
      label="Retirable"
      variant="default"
      icon={<SellOrderPurchaseIcon icon="arrowDown" />}
    />
  </Box>,
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
