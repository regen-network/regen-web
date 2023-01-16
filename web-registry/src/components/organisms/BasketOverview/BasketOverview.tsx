import React from 'react';
import { Grid } from '@mui/material';
import { ERROR_BANNER } from 'config/contents';
import { useAtom } from 'jotai';

import { Flex } from 'web-components/lib/components/box';
import OutlinedButton from 'web-components/lib/components/buttons/OutlinedButton';
import OnBoardingCard from 'web-components/lib/components/cards/OnBoardingCard';
import Section from 'web-components/lib/components/section';
import InfoTooltip from 'web-components/lib/components/tooltip/InfoTooltip';
import {
  Body,
  Subtitle,
  Title,
} from 'web-components/lib/components/typography';
import { formatNumber } from 'web-components/lib/utils/format';
import { truncate } from 'web-components/lib/utils/truncate';

import { errorBannerTextAtom } from 'lib/atoms/error.atoms';
import { useWallet } from 'lib/wallet/wallet';

import { basketDetailAtom } from 'pages/BasketDetails/BasketDetails.store';

import forestImg from '../../../assets/forest-token.png';
import { getAccountUrl } from '../../../lib/block-explorer';
import { OptimizedImage } from '../../atoms/OptimizedImage';
import {
  PUT_BASKET_HREF,
  PUT_BASKET_LABEL,
  PUT_BASKET_TOOLTIP,
  TAKE_BASKET_HREF,
  TAKE_BASKET_LABEL,
  TAKE_BASKET_TOOLTIP,
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
import { BasketOverviewTooltip } from './BasketOverview.Tooltip';
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
  const { wallet } = useWallet();
  const [, setBasketDetailAtom] = useAtom(basketDetailAtom);
  const [, setErrorBannerTextAtom] = useAtom(errorBannerTextAtom);
  const { isLoadingPutData, creditBatchDenoms } = basketPutData;
  const { isLoadingTakeData, basketToken } = basketTakeData;
  const hasAddress = !!wallet?.address;
  const isPutButtonDisabled =
    (isLoadingPutData || creditBatchDenoms.length === 0) && hasAddress;
  const isTakeButtonDisabled =
    (isLoadingTakeData ||
      Number(basketToken.balance?.balance?.amount ?? 0) === 0) &&
    hasAddress;

  return (
    <>
      <BasketSectionContainer>
        <Section className={styles.content} isPaddingTopMobile={false}>
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
                    data={truncate(curator.name)}
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
                <InfoTooltip
                  title={
                    isPutButtonDisabled ? (
                      <BasketOverviewTooltip
                        text={PUT_BASKET_TOOLTIP}
                        href={PUT_BASKET_HREF}
                      />
                    ) : (
                      ''
                    )
                  }
                  arrow
                  placement="top"
                >
                  <span>
                    <OutlinedButton
                      sx={{ mr: 5 }}
                      onClick={() => {
                        if (hasAddress) {
                          setBasketDetailAtom(
                            atom => void (atom.isPutModalOpen = true),
                          );
                        } else {
                          setErrorBannerTextAtom(ERROR_BANNER);
                        }
                      }}
                      disabled={isPutButtonDisabled}
                    >
                      {PUT_BASKET_LABEL}
                    </OutlinedButton>
                  </span>
                </InfoTooltip>
                <InfoTooltip
                  title={
                    isTakeButtonDisabled ? (
                      <BasketOverviewTooltip
                        text={TAKE_BASKET_TOOLTIP}
                        href={TAKE_BASKET_HREF}
                      />
                    ) : (
                      ''
                    )
                  }
                  arrow
                  placement="top"
                >
                  <span>
                    <OutlinedButton
                      onClick={() => {
                        if (hasAddress) {
                          setBasketDetailAtom(
                            atom => void (atom.isTakeModalOpen = true),
                          );
                        } else {
                          setErrorBannerTextAtom(ERROR_BANNER);
                        }
                      }}
                      disabled={isTakeButtonDisabled}
                    >
                      {TAKE_BASKET_LABEL}
                    </OutlinedButton>
                  </span>
                </InfoTooltip>
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
