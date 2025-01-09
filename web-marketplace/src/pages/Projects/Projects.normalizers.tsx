import CreditCardIcon from 'web-components/src/components/icons/CreditCardIcon';
import CryptoIcon from 'web-components/src/components/icons/CryptoIcon';
import { FilterOption } from 'web-components/src/components/organisms/ProjectFilters/ProjectFilters';

import { Project } from 'generated/sanity-graphql';
import { TranslatorType } from 'lib/i18n/i18n.types';

import { SellOrderInfoExtented } from 'hooks/useQuerySellOrders';

import { UNREGISTERED_PATH } from './AllProjects/AllProjects.constants';
import { ProjectWithOrderData } from './AllProjects/AllProjects.types';
import {
  CREDIT_CARD_BUYING_OPTION_ID,
  CREDIT_CARD_BUYING_OPTION_NAME,
  CRYPTO_BUYING_OPTION_ID,
  CRYPTO_BUYING_OPTION_NAME,
} from './Projects.constants';

type NormalizeBuyingOptionsFilterParams = {
  sellOrders?: SellOrderInfoExtented[];
  allOnChainProjects?: ProjectWithOrderData[];
  prefinance: boolean;
  creditClassSelectedFilters: Record<string, boolean>;
  sanityProjects?: Array<Pick<Project, 'fiatSellOrders'>>;
  _: TranslatorType;
  allProjects: ProjectWithOrderData[];
};

export const normalizeBuyingOptionsFilter = ({
  allOnChainProjects,
  prefinance,
  creditClassSelectedFilters,
  allProjects,
  _,
}: NormalizeBuyingOptionsFilterParams): FilterOption[] => {
  const buyingOptionsFilterOptions = [];

  const onlyUnregisteredProjects = isOnlyOneFilterActive(
    creditClassSelectedFilters,
    UNREGISTERED_PATH,
  );
  const selectedCreditClasses = Object.keys(creditClassSelectedFilters).filter(
    key => creditClassSelectedFilters[key],
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

  const someFiatSellOrders = allProjects?.some(project => {
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
      creditClassSelectedFilters[UNREGISTERED_PATH] === true;

    return (
      (hasCardSellOrders && isPartOfSelectedCreditClasses) ||
      (isPrefinanceProject && unregisteredProjectsSelected)
    );
  });
  if (prefinance || someFiatSellOrders) {
    buyingOptionsFilterOptions.push({
      name: _(CREDIT_CARD_BUYING_OPTION_NAME),
      startIcon: (
        <CreditCardIcon className={prefinance ? '' : 'text-brand-400'} />
      ),
      id: CREDIT_CARD_BUYING_OPTION_ID,
      disabled: prefinance,
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

  for (const [key, value] of Object.entries(filters)) {
    if (value) activeCount++;
    // Stop early if more than one true value is found
    if (activeCount > 1) return false;
  }

  // Ensure the target key is the only one set to true
  return activeCount === 1 && filters[targetKey] === true;
}
