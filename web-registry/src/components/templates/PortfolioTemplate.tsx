import React from 'react';
import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { QueryBasketsResponse } from '@regen-network/api/lib/generated/regen/ecocredit/basket/v1/query';

import Section from 'web-components/lib/components/section';
import Title from 'web-components/lib/components/title';
import { RenderActionButtonsFunc } from 'web-components/lib/components/table/ActionsTable';
import { Theme } from 'web-components/lib/theme/muiTheme';

import { EcocreditsTable, BasketsTable } from '../../components/organisms';
import { BasketTakeModal } from '../../components/molecules';
import useQueryBaskets from '../../hooks/useQueryBaskets';
import { useEcocredits, useTakeBasketTokens } from '../../hooks';
import { useLedger } from '../../ledger';
// import { ReactComponent as Sell } from '../assets/svgs/sell.svg';
import { ReactComponent as PutInBasket } from '../../assets/svgs/put-in-basket.svg';
import { ReactComponent as TakeFromBasket } from '../../assets/svgs/take-from-basket.svg';
// import { ReactComponent as WithdrawIBC } from '../../assets/svgs/withdraw-ibc.svg';
// import { ReactComponent as DepositIBC } from '../../assets/svgs/deposit-ibc.svg';
import { useWallet } from '../../lib/wallet';
import type { BatchInfoWithBalance } from '../../types/ledger/ecocredit';

interface PortfolioTemplateProps extends WithBasketsProps {
  accountAddress?: string;
  credits?: BatchInfoWithBalance[];
  renderCreditActionButtons?: RenderActionButtonsFunc;
  renderBasketActionButtons?: RenderActionButtonsFunc;
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
  credits,
  baskets,
  children,
  renderCreditActionButtons,
  renderBasketActionButtons,
}) => {
  const styles = useStyles();

  // const openModal = (rowIndex: number): void => {
  //   if (!accountAddress) return;
  //   const selectedBasket = basketsWithClasses?.[rowIndex]?.basket;
  //   if (selectedBasket?.basketDenom) {
  //     setSelectedBasketDenom(selectedBasket.basketDenom);
  //   }
  // };

  // const handleTakeCredits = async (values: MsgTake): Promise<void> => {
  //   const msgClient = api?.msgClient;
  //   if (!msgClient?.broadcast || !accountAddress) return Promise.reject();

  //   console.log('MsgTake ', values);
  //   const txBytes = await signTake(
  //     accountAddress,
  //     values.basketDenom,
  //     values.amount,
  //     values.retirementLocation,
  //     values.retireOnTake,
  //   );
  //   // onTxQueued(txBytes);
  //   console.log('txBytes ', txBytes);

  //   if (txBytes) {
  //     const hash = await msgClient.broadcast(txBytes);
  //     // eslint-disable-next-line
  //     console.log('hash', hash);
  //   }
  // };

  return (
    <Box sx={{ backgroundColor: 'grey.50', pb: { xs: 21.25, sm: 28.28 } }}>
      <Section title="Portfolio" titleVariant="h2" titleAlign="left">
        {children}
        <Box sx={{ pt: { xs: 9.25, sm: 8.5 } }}>
          <Title className={styles.subtitle} variant="subtitle2">
            basket tokens
          </Title>
          <BasketsTable
            address={accountAddress}
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
        {/* {baskets && !!selectedBasketDenom && !!accountAddress && (
          <BasketTakeModal
            open={!!selectedBasketDenom}
            accountAddress={accountAddress}
            basketDenom={selectedBasketDenom}
            baskets={baskets}
            onClose={() => setSelectedBasketDenom('')}
            onSubmit={handleTakeCredits}
          />
        )} */}
      </Section>
    </Box>
  );
};

export interface WithBasketsProps {
  baskets?: QueryBasketsResponse;
}

export function withBaskets<P>(
  WrappedComponent: React.ComponentType<P & WithBasketsProps>,
): React.FC<P & WithBasketsProps> {
  const ComponentWithBaskets: React.FC<P> = (props: P) => {
    const baskets = useQueryBaskets();
    return <WrappedComponent {...props} baskets={baskets} />;
  };
  return ComponentWithBaskets;
}
