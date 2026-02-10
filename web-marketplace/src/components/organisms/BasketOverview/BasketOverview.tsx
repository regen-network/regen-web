import React from 'react';
import { msg, plural } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Grid } from '@mui/material';
import Image from 'next/image';

import OnBoardingCard from 'web-components/src/components/cards/OnBoardingCard';
import Section from 'web-components/src/components/section';
import {
  Body,
  Subtitle,
  Title,
} from 'web-components/src/components/typography';
import { formatNumber } from 'web-components/src/utils/format';
import { cn } from 'web-components/src/utils/styles/cn';
import { truncate } from 'web-components/src/utils/truncate';

import toucanBasket from '../../../../public/png/toucan-basket.png';
import topoImg from '../../../../public/svg/background-contour-2.svg';
import { getAccountUrl } from '../../../lib/block-explorer';
import { MAXIMUM_FRACTION_DIGITS } from '../SellOrdersTable/SellOrdersTable.constants';
import { BasketItem } from './BasketOverview.Item';
import { BasketItemWithLinkList } from './BasketOverview.ItemWithLinkList';
import {
  BasketImageContainer,
  BasketTextContainer,
  useBasketOverviewStyles,
} from './BasketOverview.styles';
import { CreditClass, Curator } from './BasketOverview.types';
import { getDateCriteria } from './BasketOverview.utils';

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
  const { _ } = useLingui();
  const { classes: styles } = useBasketOverviewStyles();

  // Temporarily hiding CTA buttons until the modals are fixed (see comment in BasketOverview.modals.tsx)
  // and since they should be disabled permanently for basket with denom process.env.NEXT_PUBLIC_BRIDGE_BASKET
  // which is the only basket on mainnet so far

  // const basketPutData = useBasketPutData();
  // const basketTakeData = useBasketTakeData();
  // const { isConnected, activeWalletAddr } = useWallet();
  // const [, setBasketDetailAtom] = useAtom(basketDetailAtom);
  // const setConnectWalletModalAtom = useSetAtom(connectWalletModalAtom);
  // const setSwitchWalletModalAtom = useSetAtom(switchWalletModalAtom);
  // const { isLoadingPutData, creditBatchDenoms } = basketPutData;
  // const { isLoadingTakeData, basketToken } = basketTakeData;
  // const hasAddress = !!activeWalletAddr;
  // const isPutButtonDisabled =
  //   (isLoadingPutData || creditBatchDenoms.length === 0) && hasAddress;
  // const isTakeButtonDisabled =
  //   (isLoadingTakeData ||
  //     Number(basketToken.balance?.balance?.amount ?? 0) === 0) &&
  //   hasAddress;

  return (
    <>
      <div className="relative flex justify-center border-solid border-0 border-b border-grey-300 bg-grey-100">
        <Image
          src={topoImg.src}
          fill
          alt={''}
          className="object-cover"
          sizes="100vw"
        />
        <Section className={styles.content} isPaddingTopMobile={false}>
          <Grid container>
            <BasketImageContainer item xs={12} sm={5}>
              <Image
                className={cn(styles.image, 'w-full h-auto')}
                src={toucanBasket}
                alt={name}
                sizes="100vw"
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
                    label={_(msg`total amount`)}
                    data={formatNumber({
                      num: totalAmount,
                      maximumFractionDigits: MAXIMUM_FRACTION_DIGITS,
                    })}
                  />
                  <BasketItem
                    label="curator"
                    data={truncate(curator.name)}
                    link={getAccountUrl(curator.address as string)}
                  />
                  <BasketItemWithLinkList
                    label={plural(allowedCreditClasses.length, {
                      one: 'allowed credit class',
                      other: 'allowed credit classes',
                    })}
                    data={allowedCreditClasses}
                    link={'/credit-classes/'}
                  />
                  <BasketItem
                    label={
                      startDateWindow
                        ? _(msg`start date window`)
                        : _(msg`min start date`)
                    }
                    data={getDateCriteria(_, minStartDate, startDateWindow)}
                  />
                </Grid>
              </OnBoardingCard>
              {/* <Flex>
                <InfoTooltip
                  title={
                    isPutButtonDisabled ? (
                      <BasketOverviewTooltip
                        text={_(PUT_BASKET_TOOLTIP)}
                        href={_(PUT_BASKET_HREF)}
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
                          if (isConnected) {
                            setBasketDetailAtom(
                              atom => void (atom.isPutModalOpen = true),
                            );
                          } else {
                            setSwitchWalletModalAtom(
                              atom => void (atom.open = true),
                            );
                          }
                        } else {
                          setConnectWalletModalAtom(
                            atom => void (atom.open = true),
                          );
                        }
                      }}
                      disabled={isPutButtonDisabled}
                    >
                      {_(PUT_BASKET_LABEL)}
                    </OutlinedButton>
                  </span>
                </InfoTooltip>
                <InfoTooltip
                  title={
                    isTakeButtonDisabled ? (
                      <BasketOverviewTooltip
                        text={_(TAKE_BASKET_TOOLTIP)}
                        href={_(TAKE_BASKET_HREF)}
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
                          setConnectWalletModalAtom(
                            atom => void (atom.open = true),
                          );
                        }
                      }}
                      disabled={isTakeButtonDisabled}
                    >
                      {_(TAKE_BASKET_LABEL)}
                    </OutlinedButton>
                  </span>
                </InfoTooltip>
              </Flex> */}
            </BasketTextContainer>
          </Grid>
        </Section>
      </div>
      {/* <BasketOverviewModals
        basketPutData={basketPutData}
        basketTakeData={basketTakeData}
      /> */}
    </>
  );
};
