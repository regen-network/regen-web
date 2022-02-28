import React from 'react';
import { useTheme, makeStyles } from '@mui/styles';

import ArrowDownIcon from 'web-components/lib/components/icons/ArrowDownIcon';
import { TableActionButtons } from 'web-components/lib/components/buttons/TableActionButtons';
import { Theme } from 'web-components/lib/theme/muiTheme';
import { useWallet } from '../lib/wallet';
import { PortfolioTemplate } from '../components/templates';
// import { ReactComponent as Sell } from '../assets/svgs/sell.svg';
import { ReactComponent as PutInBasket } from '../assets/svgs/put-in-basket.svg';
import { ReactComponent as TakeFromBasket } from '../assets/svgs/take-from-basket.svg';
import { ReactComponent as WithdrawIBC } from '../assets/svgs/withdraw-ibc.svg';
import { ReactComponent as DepositIBC } from '../assets/svgs/deposit-ibc.svg';

const useStyles = makeStyles((theme: Theme) => ({
  arrow: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
}));

export const MyEcocredits: React.FC = () => {
  const theme = useTheme();
  const styles = useStyles();
  const walletContext = useWallet();
  const accountAddress = walletContext.wallet?.address;

  return (
    <PortfolioTemplate
      accountAddress={accountAddress}
      renderCreditActionButtons={i => (
        <TableActionButtons
          buttons={[
            // Disabling for now until the marketplace is
            // released on regen-ledger
            // {
            //   icon: <Sell />,
            //   label: 'Sell',
            //   onClick: () => `TODO sell credit ${i}`,
            // },
            {
              icon: (
                <ArrowDownIcon
                  className={styles.arrow}
                  color={theme.palette.secondary.main}
                  direction="next"
                />
              ),
              label: 'Send',
              onClick: () => `TODO send credit ${i}`,
            },
            {
              icon: <PutInBasket />,
              label: 'Put in basket',
              onClick: () => `TODO put in basket${i}`,
            },
            {
              icon: (
                <ArrowDownIcon
                  className={styles.arrow}
                  color={theme.palette.secondary.main}
                  direction="down"
                />
              ),
              label: 'Retire',
              onClick: () => `TODO retire credit ${i}`,
            },
          ]}
        />
      )}
      renderBasketActionButtons={i => (
        <TableActionButtons
          buttons={[
            {
              icon: <TakeFromBasket />,
              label: 'Take from basket',
              onClick: () => `TODO take from basket ${i}`,
            },
            {
              icon: <WithdrawIBC />,
              label: 'Withdraw (IBC)',
              onClick: () => `TODO withdraw ${i}`,
            },
            {
              icon: <DepositIBC />,
              label: 'Deposit (IBC)',
              onClick: () => `TODO deposit ${i}`,
            },
          ]}
        />
      )}
    />
  );
};
