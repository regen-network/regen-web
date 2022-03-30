import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { makeStyles, useTheme } from '@mui/styles';
import {
  QueryBasketsResponse,
  QueryBasketResponse,
} from '@regen-network/api/lib/generated/regen/ecocredit/basket/v1/query';

import Section from 'web-components/lib/components/section';
import Title from 'web-components/lib/components/title';
import { Theme } from 'web-components/lib/theme/muiTheme';
import ArrowDownIcon from 'web-components/lib/components/icons/ArrowDownIcon';
import { TableActionButtons } from 'web-components/lib/components/buttons/TableActionButtons';
import { BasketPutModal } from 'web-components/lib/components/modal/BasketPutModal';
import { Option } from 'web-components/lib/components/inputs/SelectTextField';

import { EcocreditsTable, BasketsTable } from '../../components/organisms';
import useQueryBaskets from '../../hooks/useQueryBaskets';
import { useEcocredits } from '../../hooks';
import { useLedger } from '../../ledger';
// import { ReactComponent as Sell } from '../assets/svgs/sell.svg';
import { ReactComponent as PutInBasket } from '../../assets/svgs/put-in-basket.svg';
import { ReactComponent as TakeFromBasket } from '../../assets/svgs/take-from-basket.svg';
// import { ReactComponent as WithdrawIBC } from '../../assets/svgs/withdraw-ibc.svg';
// import { ReactComponent as DepositIBC } from '../../assets/svgs/deposit-ibc.svg';

interface PortfolioTemplateProps extends WithBasketsProps {
  accountAddress?: string;
  basketsWithClasses?: (QueryBasketResponse | undefined)[];
  own?: boolean;
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
  arrow: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
}));

export const PortfolioTemplate: React.FC<PortfolioTemplateProps> = ({
  accountAddress,
  baskets,
  basketsWithClasses,
  own,
  children,
}) => {
  const styles = useStyles();
  const theme = useTheme();
  const { api } = useLedger();
  console.log(api?.msgClient);

  const credits = useEcocredits(accountAddress);
  const [creditBaskets, setCreditBaskets] = useState<
    (QueryBasketResponse | undefined)[][]
  >([]);
  const [basketPutOpen, setBasketPutOpen] = useState<number>(-1);

  useEffect(() => {
    // Get available baskets to put credits into
    if (own && basketsWithClasses && basketsWithClasses.length > 0) {
      setCreditBaskets(
        credits.map(c =>
          basketsWithClasses.filter(b => b?.classes.includes(c.class_id)),
        ),
      );
    }
  }, [own, credits, basketsWithClasses]);

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
            renderActionButtons={
              own
                ? (i: number) => (
                    <TableActionButtons
                      buttons={[
                        {
                          icon: <TakeFromBasket />,
                          label: 'Take from basket',
                          // eslint-disable-next-line no-console
                          onClick: () =>
                            console.log(`TODO take from basket ${i}`),
                        },
                        // This will be handled from osmosis
                        // so hiding these for now
                        // {
                        //   icon: <WithdrawIBC />,
                        //   label: 'Withdraw (IBC)',
                        //   onClick: () => `TODO withdraw ${i}`,
                        // },
                        // {
                        //   icon: <DepositIBC />,
                        //   label: 'Deposit (IBC)',
                        //   onClick: () => `TODO deposit ${i}`,
                        // },
                      ]}
                    />
                  )
                : undefined
            }
          />
        </Box>
        <Box sx={{ pt: 12.75 }}>
          <Title className={styles.subtitle} variant="subtitle2">
            ecocredits
          </Title>
          <EcocreditsTable
            credits={credits}
            renderActionButtons={
              own
                ? (i: number) => {
                    const buttons = [
                      // Disabling for now until the marketplace is
                      // released on regen-ledger
                      // {
                      //   icon: <Sell />,
                      //   label: 'Sell',
                      //   // eslint-disable-next-line no-console
                      //   onClick: () => console.log(`TODO sell credit ${i}`),
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
                        // eslint-disable-next-line no-console
                        onClick: () => console.log(`TODO send credit ${i}`),
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
                        // eslint-disable-next-line no-console
                        onClick: () => console.log(`TODO retire credit ${i}`),
                      },
                    ];

                    // Only add ability to put credits into basket
                    // if there's at least one basket that accepts those credits
                    if (creditBaskets[i] && creditBaskets[i].length > 0) {
                      buttons.splice(1, 0, {
                        // buttons.splice(2, 0, { TODO: Replace once we had 'Sell'
                        icon: <PutInBasket />,
                        label: 'Put in basket',
                        onClick: () => setBasketPutOpen(i),
                      });
                    }
                    return <TableActionButtons buttons={buttons} />;
                  }
                : undefined
            }
          />
        </Box>
        {basketPutOpen > -1 && (
          <BasketPutModal
            basketOptions={
              creditBaskets[basketPutOpen]
                .map(b => ({
                  label: b?.basket?.name,
                  value: b?.basket?.basketDenom,
                }))
                .filter(v => v.label && v.value) as Option[]
            }
            availableTradableAmount={Number(
              credits[basketPutOpen].tradable_amount,
            )}
            batchDenom={credits[basketPutOpen].batch_denom}
            open={basketPutOpen > -1}
            onClose={() => setBasketPutOpen(-1)}
            onSubmit={() => alert('submit')}
          />
        )}
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
