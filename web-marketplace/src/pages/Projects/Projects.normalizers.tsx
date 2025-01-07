import { FilterOptions } from 'web-components/src/components/organisms/ProjectFilters/ProjectFilters';

import { Project } from 'generated/sanity-graphql';
import { TranslatorType } from 'lib/i18n/i18n.types';
import { Wallet } from 'lib/wallet/wallet';

import { SellOrderInfoExtented } from 'hooks/useQuerySellOrders';

import { UISellOrderInfo } from './AllProjects/AllProjects.types';
import {
  CREDIT_CARD_BUYING_OPTION_ID,
  CREDIT_CARD_BUYING_OPTION_NAME,
  CRYPTO_BUYING_OPTION_ID,
  CRYPTO_BUYING_OPTION_NAME,
} from './Projects.constants';

type NormalizeBuyingOptionsFilterParams = {
  filteredSellOrders?: UISellOrderInfo[];
  sanityProjects?: Array<Pick<Project, 'fiatSellOrders'>>;
  _: TranslatorType;
};

export const normalizeBuyingOptionsFilter = ({
  filteredSellOrders,
  sanityProjects,
  _,
}: NormalizeBuyingOptionsFilterParams): FilterOptions[] => {
  const buyingOptionsFilterOptions = [];

  if (filteredSellOrders && filteredSellOrders.length > 0) {
    buyingOptionsFilterOptions.push({
      name: _(CRYPTO_BUYING_OPTION_NAME),
      icon: <></>, //TODO
      id: CRYPTO_BUYING_OPTION_ID,
    });
  }
  console.log('filteredSellOrders', filteredSellOrders);
  const allSellOrdersIds = filteredSellOrders?.map(order => order?.id);
  console.log('sanityProjects', sanityProjects);
  const someFiatSellOrders = sanityProjects?.some(project => {
    const fiatSellOrderIds = project?.fiatSellOrders?.map(
      order => order?.sellOrderId,
    );
    console.log(
      project.id,
      fiatSellOrderIds?.some(id => id && allSellOrdersIds?.includes(id)),
    );
    return fiatSellOrderIds?.some(id => id && allSellOrdersIds?.includes(id));
  });
  if (someFiatSellOrders) {
    buyingOptionsFilterOptions.push({
      name: _(CREDIT_CARD_BUYING_OPTION_NAME),
      icon: <></>, //TODO
      id: CREDIT_CARD_BUYING_OPTION_ID,
    });
  }

  return buyingOptionsFilterOptions;
};
