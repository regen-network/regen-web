import { useState, useEffect } from 'react';

import { getBasket, getBasketBalances, getBatchInfo } from '../lib/ecocredit';
import {
  Basket,
  BasketBalance,
  BatchInfoWithProject,
} from '../types/ledger/ecocredit';
import { BasketOverviewProps } from '../components/organisms';

interface BasketExtended {
  classes: string[];
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
        // TODO: Display basket denom
        // const displayDenom = 'eco.C.rNCT';
        // TODO: Basket description (see comment in Figma)
        // https://www.figma.com/file/x5vjWsddiUBzP2N13AFOPw?node-id=32:10028#155844414
        // const description = getBasketDescription(basketDenom);
        const description =
          'The Regen Nature Carbon Ton groups together carbon sequestration ecocredits into one tradeable asset. Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
        // TODO: Basket Curator
        const curator = 'Regen Network Development, Inc';
        const balances = await getBasketBalances(basketDenom);
        const batches: BatchInfoWithProject[] = [];
        balances.balances.map(async batchBalance => {
          getBatchInfo(batchBalance.batchDenom).then(batchInfo => {
            // TODO: fetch the project name / display name, corresponding to the batch
            const projectName = 'cavan-station';
            const projectDisplayName = 'Cavan Station';
            batches.push({
              project_name: projectName,
              project_display: projectDisplayName,
              ...batchInfo.info,
            });
          });
        });

        setData({
          basket: basket.basket,
          basketExtended: {
            classes: basket.classes,
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
    if (data?.basket) {
      const _dataOverview: BasketOverviewProps = {
        name: data.basket.name,
        basketDenom: data.basket.basketDenom,
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
