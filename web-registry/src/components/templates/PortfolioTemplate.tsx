import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';

import Section from 'web-components/lib/components/section';
import Title from 'web-components/lib/components/title';
import { renderActionButtonsFunc } from 'web-components/lib/components/table/ActionsTable';
import { Theme } from 'web-components/lib/theme/muiTheme';

import { getEcocreditsForAccount } from '../../lib/ecocredit';
import { ledgerRestUri } from '../../ledger';
import { EcocreditsTable, BasketsTable } from '../../components/organisms';
import type { TableCredits, TableBaskets } from '../../types/ledger/ecocredit';

interface PortfolioTemplateProps {
  accountAddress?: string;
  renderCreditActionButtons?: renderActionButtonsFunc;
  renderBasketActionButtons?: renderActionButtonsFunc;
}

const useStyles = makeStyles((theme: Theme) => ({
  subtitle: {
    color: theme.palette.info.dark,
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontWeight: 800,
    [theme.breakpoints.up('sm')]: {
      marginBottom: theme.spacing(8.5),
    },
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(4.25),
    },
  },
}));

export const PortfolioTemplate: React.FC<PortfolioTemplateProps> = ({
  accountAddress,
  renderCreditActionButtons,
  renderBasketActionButtons,
  children,
}) => {
  const styles = useStyles();
  const [credits, setCredits] = useState<TableCredits[]>([]);
  const [baskets, setBaskets] = useState<TableBaskets[]>([]);

  useEffect(() => {
    if (!ledgerRestUri || !accountAddress) return;
    const fetchData = async (): Promise<void> => {
      const credits = await getEcocreditsForAccount(accountAddress);
      setCredits(credits);
    };
    fetchData();

    // Hardcoded basket data for testing purposes
    // TODO fetch from ledger instead
    setBaskets([
      {
        id: '1',
        basket_denom: 'eco.uC.rNCT',
        display_denom: 'eco.C.rNCT',
        name: 'rNCT',
        disable_auto_retire: false,
        credit_type_abbrev: 'C',
        date_criteria: {
          start_date_window: '1000',
        },
        exponent: '6',
        balance: {
          denom: 'eco.uC.rNCT',
          amount: '10000000',
        },
      },
    ]);
  }, [accountAddress]);

  return (
    <Box sx={{ backgroundColor: 'grey.50', pb: { xs: 21.25, sm: 28.28 } }}>
      <Section title="Portfolio" titleVariant="h2" titleAlign="left">
        {children}
        <Box sx={{ pt: { xs: 9.25, sm: 8.5 } }}>
          <Title className={styles.subtitle} variant="subtitle2">
            basket tokens
          </Title>
          <BasketsTable
            baskets={baskets}
            renderActionButtons={renderBasketActionButtons}
          />
        </Box>
        <Box sx={{ pt: 12.75 }}>
          <Title className={styles.subtitle} variant="subtitle2">
            ecocredits
          </Title>
          <EcocreditsTable
            credits={credits}
            renderActionButtons={renderCreditActionButtons}
          />
        </Box>
      </Section>
    </Box>
  );
};
