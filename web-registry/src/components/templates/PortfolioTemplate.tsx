import React from 'react';
import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { QueryBasketsResponse } from '@regen-network/api/lib/generated/regen/ecocredit/basket/v1/query';

import Section from 'web-components/lib/components/section';
import { Title } from 'web-components/lib/components/typography';
import { RenderActionButtonsFunc } from 'web-components/lib/components/table/ActionsTable';
import { Theme } from 'web-components/lib/theme/muiTheme';

import { EcocreditsTable, BasketsTable } from '../../components/organisms';
import useQueryBaskets from '../../hooks/useQueryBaskets';
import type { BatchInfoWithBalance } from '../../types/ledger/ecocredit';
import { BasketTokens } from '../../hooks/useBasketTokens';

interface PortfolioTemplateProps {
  credits?: BatchInfoWithBalance[];
  basketTokens: BasketTokens[];
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
  arrow: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
}));

export const PortfolioTemplate: React.FC<PortfolioTemplateProps> = ({
  credits,
  basketTokens,
  children,
  renderCreditActionButtons,
  renderBasketActionButtons,
}) => {
  const styles = useStyles();

  return (
    <Box sx={{ backgroundColor: 'grey.50', pb: { xs: 21.25, sm: 28.28 } }}>
      <Section title="Portfolio" titleVariant="h2" titleAlign="left">
        {children}
        <Box sx={{ pt: { xs: 9.25, sm: 8.5 } }}>
          <Title className={styles.subtitle} variant="subtitle2">
            basket tokens
          </Title>
          <BasketsTable
            basketTokens={basketTokens}
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
