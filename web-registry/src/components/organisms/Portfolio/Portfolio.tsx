import React, { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, SxProps } from '@mui/material';
import { tabsStyles } from 'styles/tabs';

import Card from 'web-components/lib/components/cards/Card';
import {
  RenderActionButtonsFunc,
  TablePaginationParams,
} from 'web-components/lib/components/table/ActionsTable';
import { IconTabProps } from 'web-components/lib/components/tabs/IconTab';
import { IconTabs } from 'web-components/lib/components/tabs/IconTabs';
import { Label } from 'web-components/lib/components/typography';

import type { BatchInfoWithBalance } from 'types/ledger/ecocredit';
import { UseStateSetter } from 'types/react/use-state';

import { BasketTokens } from 'hooks/useBasketTokens';

import { BasketsTable, EcocreditsTable } from '..';
import { RetirementCertificatesTable } from '../RetirementCertificatesTable/RetirementCertificatesTable';
import { ViewCertificateButton } from './Portfolio.ViewCertificateButton';

export interface PortfolioProps {
  credits?: BatchInfoWithBalance[];
  basketTokens: BasketTokens[];
  renderCreditActionButtons?: RenderActionButtonsFunc;
  renderBasketActionButtons?: RenderActionButtonsFunc;
  onTableChange?: UseStateSetter<TablePaginationParams>;
  initialPaginationParams?: TablePaginationParams;
  isIgnoreOffset?: boolean;
}

const sxs = {
  title: {
    color: 'info.dark',
    mb: { xs: 4.25, sm: 8.5 },
  } as SxProps,
};

export const Portfolio: React.FC<React.PropsWithChildren<PortfolioProps>> = ({
  credits,
  basketTokens,
  renderCreditActionButtons,
  renderBasketActionButtons,
  onTableChange,
  initialPaginationParams,
  isIgnoreOffset = false,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const tabs: IconTabProps[] = useMemo(
    () => [
      {
        label: 'Ecocredits',
        content: (
          <EcocreditsTable
            credits={credits}
            renderActionButtons={renderCreditActionButtons}
            onTableChange={onTableChange}
            initialPaginationParams={initialPaginationParams}
            isIgnoreOffset={isIgnoreOffset}
          />
        ),
      },
      {
        label: 'Retirement Certificates',
        content: (
          <RetirementCertificatesTable
            credits={credits}
            renderActionButtons={index => (
              <ViewCertificateButton
                onClick={() =>
                  navigate(`/certificate/${credits?.[index].projectId}`)
                }
              />
            )}
            onTableChange={onTableChange}
            initialPaginationParams={initialPaginationParams}
            isIgnoreOffset={isIgnoreOffset}
          />
        ),
        hidden: true || location.pathname !== '/ecocredits/portfolio',
      },
    ],
    [
      credits,
      location,
      renderCreditActionButtons,
      onTableChange,
      initialPaginationParams,
      isIgnoreOffset,
      navigate,
    ],
  );

  return (
    <Box>
      <Card>
        <IconTabs tabs={tabs} size={'xl'} sxs={tabsStyles.tabsInsideCard} />
      </Card>
      <Box sx={{ pt: { xs: 9.25, sm: 8.5 } }}>
        <Label sx={sxs.title}>basket tokens</Label>
        <BasketsTable
          basketTokens={basketTokens}
          renderActionButtons={renderBasketActionButtons}
        />
      </Box>
    </Box>
  );
};
