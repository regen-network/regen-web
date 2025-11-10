import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Box } from '@mui/material';
import { tabsStyles } from 'styles/tabs';

import Card from 'web-components/src/components/cards/Card';
import {
  RenderActionButtonsFunc,
  TablePaginationParams,
} from 'web-components/src/components/table/ActionsTable';
import { IconTabProps } from 'web-components/src/components/tabs/IconTab';
import { IconTabs } from 'web-components/src/components/tabs/IconTabs';

import type { BatchInfoWithBalance } from 'types/ledger/ecocredit';
import { BasketTokens } from 'types/ledger/ecocredit';
import { UseStateSetter } from 'types/react/use-state';
import { NormalizedRetirement } from 'lib/normalizers/retirements/normalizeRetirement';

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
}

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
}) => {
  const { _ } = useLingui();
  const navigate = useNavigate();

  const hasMorePages =
    (initialPaginationParams?.count ?? 0) >
    (initialPaginationParams?.rowsPerPage ?? 0);
  const noEcocredits = !credits || (!credits?.length && !hasMorePages);

  const tabs: IconTabProps[] = useMemo(
    () => [
      {
        label: _(msg`Ecocredits`),
        content: (
          <EcocreditsTable
            credits={credits}
            renderActionButtons={renderCreditActionButtons}
            onTableChange={onTableChange}
            initialPaginationParams={initialPaginationParams}
            isIgnoreOffset={isIgnoreOffset}
            noEcocredits={noEcocredits}
          />
        ),
      },
      {
        label: _(msg`Retirement Certificates`),
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
        hidden: !retirements?.length,
      },
      {
        label: _(msg`Basket Tokens`),
        content: (
          <BasketsTable
            basketTokens={basketTokens}
            renderActionButtons={renderBasketActionButtons}
          />
        ),
        hidden: basketTokens.length === 0,
      },
    ],
    [
      _,
      credits,
      renderCreditActionButtons,
      onTableChange,
      initialPaginationParams,
      isIgnoreOffset,
      noEcocredits,
      retirements,
      onRetirementTableChange,
      retirementsPaginationParams,
      basketTokens,
      renderBasketActionButtons,
      navigate,
    ],
  );

  return (
    <Box>
      <Card className="shadow-none rounded-[10px] border-solid border-bc-neutral-300 border-[1px]">
        <IconTabs
          hideIndicator
          tabs={tabs}
          size={'xl'}
          sxs={tabsStyles.tabsInsideCard}
          activeTab={activePortfolioTab}
        />
      </Card>
    </Box>
  );
};
