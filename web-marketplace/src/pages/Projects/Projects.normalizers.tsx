import CreditCardIcon from 'web-components/src/components/icons/CreditCardIcon';
import { FilterOptions } from 'web-components/src/components/organisms/ProjectFilters/ProjectFilters';

import { Project } from 'generated/sanity-graphql';
import { TranslatorType } from 'lib/i18n/i18n.types';

import {
  ProjectWithOrderData,
  UISellOrderInfo,
} from './AllProjects/AllProjects.types';
import {
  CREDIT_CARD_BUYING_OPTION_ID,
  CREDIT_CARD_BUYING_OPTION_NAME,
  CRYPTO_BUYING_OPTION_ID,
  CRYPTO_BUYING_OPTION_NAME,
} from './Projects.constants';

type NormalizeBuyingOptionsFilterParams = {
  sellOrders?: UISellOrderInfo[];
  allOnChainProjects?: ProjectWithOrderData[];

  sanityProjects?: Array<Pick<Project, 'fiatSellOrders'>>;
  _: TranslatorType;
};

export const normalizeBuyingOptionsFilter = ({
  sellOrders,
  allOnChainProjects,
  sanityProjects,
  _,
}: NormalizeBuyingOptionsFilterParams): FilterOptions[] => {
  const buyingOptionsFilterOptions = [];

  if (allOnChainProjects && allOnChainProjects.length > 0) {
    buyingOptionsFilterOptions.push({
      name: _(CRYPTO_BUYING_OPTION_NAME),
      startIcon: <></>, //TODO
      id: CRYPTO_BUYING_OPTION_ID,
    });
  }

  const allSellOrdersIds = sellOrders?.map(order => order?.id);
  const someFiatSellOrders = sanityProjects?.some(project => {
    const fiatSellOrderIds = project?.fiatSellOrders?.map(
      order => order?.sellOrderId,
    );
    return fiatSellOrderIds?.some(id => id && allSellOrdersIds?.includes(id));
  });
  if (someFiatSellOrders) {
    buyingOptionsFilterOptions.push({
      name: _(CREDIT_CARD_BUYING_OPTION_NAME),
      startIcon: <CreditCardIcon className="text-brand-400" />,
      id: CREDIT_CARD_BUYING_OPTION_ID,
    });
  }

  return buyingOptionsFilterOptions;
};
