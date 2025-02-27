import CreditCardIcon from 'web-components/src/components/icons/CreditCardIcon';
import CryptoIcon from 'web-components/src/components/icons/CryptoIcon';
import type { FilterOption } from 'web-components/src/components/organisms/ProjectFilters/ProjectFilters';

import { TranslatorType } from 'lib/i18n/i18n.types';

import { UNREGISTERED_PATH } from './AllProjects/AllProjects.constants';
import { ProjectWithOrderData } from './AllProjects/AllProjects.types';
import {
  CREDIT_CARD_BUYING_OPTION_ID,
  CREDIT_CARD_BUYING_OPTION_NAME,
  CRYPTO_BUYING_OPTION_ID,
  CRYPTO_BUYING_OPTION_NAME,
} from './Projects.constants';

type NormalizeBuyingOptionsFilterParams = {
  allOnChainProjects?: ProjectWithOrderData[];
  prefinance: boolean;
  creditClassFilters: Record<string, boolean>;
  _: TranslatorType;
  allProjects: ProjectWithOrderData[];
};

export const normalizeBuyingOptionsFilter = ({
  allOnChainProjects,
  prefinance,
  creditClassFilters,
  allProjects,
  _,
}: NormalizeBuyingOptionsFilterParams): FilterOption[] => {
  const buyingOptionsFilterOptions = [];

  const selectedCreditClasses = Object.keys(creditClassFilters).filter(
    key => creditClassFilters[key],
  );

  const showCreditCardBuyingOption = allProjects?.some(project => {
    const allCardSellOrders = project?.allCardSellOrders?.map(
      order => order?.id,
    );
    const hasCardSellOrders = allCardSellOrders && allCardSellOrders.length > 0;
    const isPartOfSelectedCreditClasses =
      project.creditClassId &&
      selectedCreditClasses.includes(project.creditClassId);

    const isPrefinanceProject =
      project?.projectPrefinancing?.isPrefinanceProject;
    const unregisteredProjectsSelected =
      creditClassFilters[UNREGISTERED_PATH] === true;

    return (
      (hasCardSellOrders && isPartOfSelectedCreditClasses) ||
      (isPrefinanceProject && unregisteredProjectsSelected)
    );
  });
  if (prefinance || showCreditCardBuyingOption) {
    buyingOptionsFilterOptions.push({
      name: _(CREDIT_CARD_BUYING_OPTION_NAME),
      startIcon: (
        <CreditCardIcon className={prefinance ? '' : 'text-brand-400'} />
      ),
      id: CREDIT_CARD_BUYING_OPTION_ID,
      disabled: prefinance,
    });
  }

  const onlyUnregisteredProjects = isOnlyOneFilterActive(
    creditClassFilters,
    UNREGISTERED_PATH,
  );

  if (
    !onlyUnregisteredProjects &&
    !prefinance &&
    allOnChainProjects &&
    allOnChainProjects.length > 0
  ) {
    buyingOptionsFilterOptions.push({
      name: _(CRYPTO_BUYING_OPTION_NAME),
      startIcon: <CryptoIcon />,
      id: CRYPTO_BUYING_OPTION_ID,
    });
  }

  return buyingOptionsFilterOptions;
};

// Function to check if only one specific filter is true
function isOnlyOneFilterActive(
  filters: Record<string, boolean>,
  targetKey: string,
) {
  let activeCount = 0;

  for (const value of Object.values(filters)) {
    if (value) activeCount++;
    // Stop early if more than one true value is found
    if (activeCount > 1) return false;
  }

  // Ensure the target key is the only one set to true
  return activeCount === 1 && filters[targetKey] === true;
}
