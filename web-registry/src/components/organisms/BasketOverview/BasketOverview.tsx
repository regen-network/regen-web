import React from 'react';
import { Grid } from '@mui/material';
import { useAtom } from 'jotai';

import { Flex } from 'web-components/lib/components/box';
import OutlinedButton from 'web-components/lib/components/buttons/OutlinedButton';
import OnBoardingCard from 'web-components/lib/components/cards/OnBoardingCard';
import Section from 'web-components/lib/components/section';
import {
  Body,
  Subtitle,
  Title,
} from 'web-components/lib/components/typography';
import { formatNumber } from 'web-components/lib/utils/format';

import { basketDetailAtom } from 'pages/BasketDetails/BasketDetails.store';

import forestImg from '../../../assets/forest-token.png';
import { getAccountUrl } from '../../../lib/block-explorer';
import { OptimizedImage } from '../../atoms/OptimizedImage';
import {
  PUT_BASKET_LABEL,
  TAKE_BASKET_LABEL,
} from './BasketOverview.constants';
import { BasketItem } from './BasketOverview.Item';
import { BasketItemWithLinkList } from './BasketOverview.ItemWithLinkList';
import { BasketOverviewModals } from './BasketOverview.modals';
import {
  BasketImageContainer,
  BasketSectionContainer,
  BasketTextContainer,
  useBasketOverviewStyles,
} from './BasketOverview.styles';
import { CreditClass, Curator } from './BasketOverview.types';
import { getDateCriteria } from './BasketOverview.utils';
import { useBasketPutData } from './hooks/useBasketPutData';
import { useBasketTakeData } from './hooks/useBasketTakeData';

export type BasketOverviewProps = {
  name: string;
  displayDenom: string;
  description: string;
  totalAmount: number;
  curator: Curator;
  allowedCreditClasses: CreditClass[];
  minStartDate?: string;
  startDateWindow?: string;
};

export const BasketOverview: React.FC<
  React.PropsWithChildren<BasketOverviewProps>
> = ({
  name,
  displayDenom,
  description,
  totalAmount,
  curator,
  allowedCreditClasses,
  minStartDate,
  startDateWindow,
}) => {
  const { classes: styles } = useBasketOverviewStyles();
  const basketPutData = useBasketPutData();
  const basketTakeData = useBasketTakeData();
  const [, setBasketDetailAtom] = useAtom(basketDetailAtom);
  const { isLoadingPutData, creditBatchDenoms } = basketPutData;
  const { isLoadingTakeData, basketToken } = basketTakeData;
  const isPutButtonDisabled =
    isLoadingPutData || creditBatchDenoms.length === 0;
  const isTakeButtonDisabled =
    isLoadingTakeData ||
    Number(basketToken.balance?.balance?.amount ?? 0) === 0;

  return (
    <>
      <BasketSectionContainer>
        <Section className={styles.content}>
          <Grid container>
            <BasketImageContainer item xs={12} sm={5}>
              <OptimizedImage
                className={styles.image}
                src={forestImg}
                alt={name}
              />
            </BasketImageContainer>
            <BasketTextContainer item xs={12} sm={7}>
              <Title variant="h1" sx={{ mb: [0, 2] }}>
                {name}
              </Title>
              <Subtitle mt={2} color="info.main">
                {displayDenom}
              </Subtitle>
              <Body size="xl" mt={2}>
                {description}
              </Body>
              <OnBoardingCard className={styles.card}>
                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                  <BasketItem
                    label="total amount"
                    data={formatNumber({ num: totalAmount })}
                  />
                  <BasketItem
                    label="curator"
                    data={curator.name}
                    link={getAccountUrl(curator.address as string)}
                  />
                  <BasketItemWithLinkList
                    label={`allowed credit class${
                      allowedCreditClasses.length > 1 ? 'es' : ''
                    }`}
                    data={allowedCreditClasses}
                    link={'/credit-classes/'}
                  />
                  <BasketItem
                    label={
                      startDateWindow ? 'start date window' : 'min start date'
                    }
                    data={getDateCriteria(minStartDate, startDateWindow)}
                  />
                </Grid>
              </OnBoardingCard>
              <Flex>
                <OutlinedButton
                  sx={{ mr: 5 }}
                  onClick={() =>
                    setBasketDetailAtom(
                      atom => void (atom.isPutModalOpen = true),
                    )
                  }
                  disabled={isPutButtonDisabled}
                >
                  {PUT_BASKET_LABEL}
                </OutlinedButton>
                <OutlinedButton
                  onClick={() =>
                    setBasketDetailAtom(
                      atom => void (atom.isTakeModalOpen = true),
                    )
                  }
                  disabled={isTakeButtonDisabled}
                >
                  {TAKE_BASKET_LABEL}
                </OutlinedButton>
              </Flex>
            </BasketTextContainer>
          </Grid>
        </Section>
      </BasketSectionContainer>
      <BasketOverviewModals
        basketPutData={basketPutData}
        basketTakeData={basketTakeData}
      />
    </>
  );
};
