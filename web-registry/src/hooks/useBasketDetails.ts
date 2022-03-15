import { useState, useEffect } from 'react';

import {
  getBasket,
  getBasketBalances,
  getBasketBalancesWithBatchInfo,
} from '../lib/ecocredit';
import {
  Basket,
  BasketBalance,
  BatchInfoWithProject,
} from '../types/ledger/ecocredit';
import { BasketOverviewProps, CreditClass } from '../components/organisms';

interface BasketExtended {
  classes: CreditClass[];
  displayDenom: string;
  description: string;
  curator: string;
  totalAmount: number;
}

interface BasketDetailsAll {
  basket: Basket | undefined;
  basketExtended: BasketExtended;
  basketBalances: BasketBalance[];
  batchesInfo: BatchInfoWithProject[];
}

type BasketDetailsData = {
  dataOverview: BasketOverviewProps | null;
  dataBasketBatches: BatchInfoWithProject[] | undefined;
};

const useBasketDetails = (
  basketDenom: string | undefined,
): BasketDetailsData => {
  const [data, setData] = useState<BasketDetailsAll | null>(null);
  const [dataOverview, setDataOverview] = useState<BasketOverviewProps | null>(
    null,
  );

  // fetch all the data
  useEffect(() => {
    if (basketDenom === undefined) return;

    async function fetchData(basketDenom: string): Promise<void> {
      try {
        const basket = await getBasket(basketDenom);
        // TODO: Hardcoded. Fetch basket classes display names
        const basketClasses = basket.classes.map(classId => ({
          id: classId,
          name: `Verified Carbon Standard (${classId})`,
        }));
        // TODO: Display basket denom
        const displayDenom = 'eco.C.rNCT';
        // TODO: Basket description (see comment in Figma)
        // https://www.figma.com/file/x5vjWsddiUBzP2N13AFOPw?node-id=32:10028#155844414
        // const description = getBasketDescription(basketDenom);
        const description =
          'The Regen Nature Carbon Ton groups together carbon sequestration ecocredits into one tradeable asset. Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
        // TODO: Basket Curator
        const curator = 'regen1qdqafsy2jfuyq7rxzkdwyytmrxlfn8csq0uetx';
        const balances = await getBasketBalances(basketDenom);
        const batches = await getBasketBalancesWithBatchInfo(balances.balances);

        setData({
          basket: basket.basket,
          basketExtended: {
            classes: basketClasses,
            displayDenom,
            description,
            curator,
            totalAmount: 0,
          },
          basketBalances: balances.balances,
          batchesInfo: batches,
        });
      } catch (error) {
        // TODO Manage error
        console.error(error); // eslint-disable-line no-console
      }
    }

    fetchData(basketDenom);
  }, [basketDenom]);

  // Prepare data for BasketOverview
  useEffect(() => {
    if (data?.basket && data?.basketExtended && data?.batchesInfo) {
      const _dataOverview: BasketOverviewProps = {
        name: data.basket.name,
        displayDenom: data.basketExtended.displayDenom,
        description: data.basketExtended.description,
        totalAmount: data.basketExtended.totalAmount,
        curator: data.basketExtended.curator,
        allowedCreditClasses: data.basketExtended.classes,
      };
      if (data?.basket?.dateCriteria?.minStartDate) {
        _dataOverview.minStartDate = data.basket.dateCriteria.minStartDate;
      }
      if (data?.basket?.dateCriteria?.startDateWindow) {
        _dataOverview.startDateWindow =
          data?.basket?.dateCriteria.startDateWindow;
      }

      if (data?.batchesInfo?.length > 0) {
        _dataOverview.totalAmount = data.batchesInfo.reduce(
          (acc: number, obj: BatchInfoWithProject) =>
            acc + Number(obj.total_amount),
          0,
        );
      }
      setDataOverview(_dataOverview);
    }
  }, [data]);

  return { dataOverview, dataBasketBatches: data?.batchesInfo };
};

export default useBasketDetails;
