import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, SxProps } from '@mui/material';
import { tabsStyles } from 'styles/tabs';

import Card from 'web-components/src/components/cards/Card';
import {
  RenderActionButtonsFunc,
  TablePaginationParams,
} from 'web-components/src/components/table/ActionsTable';
import { IconTabProps } from 'web-components/src/components/tabs/IconTab';
import { IconTabs } from 'web-components/src/components/tabs/IconTabs';
import { Label } from 'web-components/src/components/typography';

import type { BatchInfoWithBalance } from 'types/ledger/ecocredit';
import { UseStateSetter } from 'types/react/use-state';
import { NormalizedRetirement } from 'lib/normalizers/retirements/normalizeRetirement';

import { BasketTokens } from 'hooks/useBasketTokens';

import { BasketsTable, EcocreditsTable } from '..';
import { RetirementCertificatesTable } from '../RetirementCertificatesTable/RetirementCertificatesTable';
import { ViewCertificateButton } from './Portfolio.ViewCertificateButton';

export interface PortfolioProps {
  credits?: BatchInfoWithBalance[];
  retirements?: NormalizedRetirement[];
  basketTokens: BasketTokens[];
  renderCreditActionButtons?: RenderActionButtonsFunc;
  renderBasketActionButtons?: RenderActionButtonsFunc;
  onTableChange?: UseStateSetter<TablePaginationParams>;
  onRetirementTableChange?: UseStateSetter<TablePaginationParams>;
  initialPaginationParams?: TablePaginationParams;
  retirementsPaginationParams?: TablePaginationParams;
  activePortfolioTab?: number;
  isIgnoreOffset?: boolean;
  hideEcocredits?: boolean;
  hideRetirements?: boolean;
}

const sxs = {
  title: {
    color: 'info.dark',
    mb: { xs: 4.25, sm: 8.5 },
  } as SxProps,
};

export const Portfolio: React.FC<React.PropsWithChildren<PortfolioProps>> = ({
  credits,
  retirements,
  basketTokens,
  renderCreditActionButtons,
  renderBasketActionButtons,
  onTableChange,
  onRetirementTableChange,
  initialPaginationParams,
  retirementsPaginationParams,
  activePortfolioTab = 0,
  isIgnoreOffset = false,
  hideEcocredits,
  hideRetirements,
}) => {
  const navigate = useNavigate();

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
        hidden: hideEcocredits,
      },
      {
        label: 'Retirement Certificates',
        content: (
          <RetirementCertificatesTable
            retirements={retirements}
            renderActionButtons={index => (
              <ViewCertificateButton
                onClick={() =>
                  navigate(`/certificate/${retirements?.[index].nodeId}`)
                }
              />
            )}
            onTableChange={onRetirementTableChange}
            initialPaginationParams={retirementsPaginationParams}
          />
        ),
        hidden: hideRetirements,
      },
      {
        label: 'Basket Tokens',
        content: (
          <BasketsTable
            basketTokens={basketTokens}
            renderActionButtons={renderBasketActionButtons}
          />
        ),
        hidden: hideEcocredits || basketTokens.length === 0,
      },
    ],
    [
      credits,
      retirements,
      renderCreditActionButtons,
      onTableChange,
      onRetirementTableChange,
      initialPaginationParams,
      retirementsPaginationParams,
      isIgnoreOffset,
      navigate,
      hideEcocredits,
      hideRetirements,
    ],
  );

  return (
    <Box>
      <Card>
        <IconTabs
          tabs={tabs}
          size={'xl'}
          sxs={tabsStyles.tabsInsideCard}
          activeTab={activePortfolioTab}
        />
      </Card>
    </Box>
  );
};
