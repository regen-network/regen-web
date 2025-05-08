import { computeMedianPrice, Order } from 'utils/price/computeMedianPrice';

import { CreditClassByOnChainIdQuery, Maybe } from 'generated/graphql';
import { EcologicalImpact, Sdg } from 'generated/sanity-graphql';
import {
  DENOM_COINGECKO_ID_MAPPING,
  FetchSimplePriceResponse,
} from 'lib/coingecko';
import {
  Impact,
  MEASURED_CO_BENEFIT_IRI,
  ProjectImpact,
} from 'lib/db/types/json-ld';
import { microToDenom } from 'lib/denom.utils';
import { TranslatorType } from 'lib/i18n/i18n.types';
import { getSanityImgSrc } from 'lib/imgSrc';

import { ProjectWithOrderData } from 'legacy-pages/Projects/AllProjects/AllProjects.types';
import { getPriceToDisplay } from 'legacy-pages/Projects/hooks/useProjectsSellOrders.utils';
import {
  CO_BENEFIT,
  MEASURED_CO_BENEFIT,
  PRIMARY_IMPACT,
  PROJECT_BENEFIT,
} from 'components/organisms/ProjectTopSection/ProjectTopSection.constants';
import { getSdgsImages } from 'components/organisms/ProjectTopSection/ProjectTopSection.utils';

/* getProjectNameFromProjectsData */

export const getProjectNameFromProjectsData = (
  projectId: string,
  projects: ProjectWithOrderData[],
): string | undefined => {
  const project = projects.find(project => project.id === projectId);
  if (!project || !project.name || project.name === projectId) return;
  return project.name;
};

type GetCreditClassAvgPricePerTonLabelParams = {
  geckoPrices: FetchSimplePriceResponse | null | void;
  projectsWithOrderData: ProjectWithOrderData[];
};

export const getCreditClassAvgPricePerTonLabel = ({
  geckoPrices = {},
  projectsWithOrderData,
}: GetCreditClassAvgPricePerTonLabelParams) => {
  // create array of orders with credit quantity and ask price (USD amount)
  const orders: Order[] = [];
  for (const project of projectsWithOrderData) {
    for (const order of project.sellOrders) {
      const amount = microToDenom(order.askAmount);
      const coingeckoId = DENOM_COINGECKO_ID_MAPPING[order.askBaseDenom];
      const denomPrice = geckoPrices?.[coingeckoId]?.usd ?? 0;

      orders.push({
        quantity: order.quantity ? Number(order.quantity) : 0,
        usdPrice: amount * denomPrice,
      });
    }
  }

  const medianPrice = computeMedianPrice(orders);
  const avgPricePerTonLabel = getPriceToDisplay({ price: medianPrice });

  return avgPricePerTonLabel;
};

/* parseCreditClassVersion  */

export const parseCreditClassVersion = (
  creditClassByOnChainId?: Maybe<
    CreditClassByOnChainIdQuery['creditClassByOnChainId']
  >,
) => {
  const creditClassVersion =
    creditClassByOnChainId?.creditClassVersionsById.nodes?.[0];
  const offChainCoBenefitsIRIs =
    creditClassVersion?.metadata?.['regen:coBenefits']?.map(
      (impact: { '@id': string }) => impact['@id'],
    ) || [];
  const offChainPrimaryImpactIRI =
    creditClassVersion?.metadata?.['regen:indicator']?.['@id'];

  return {
    offChainPrimaryImpactIRI,
    offChainCoBenefitsIRIs,
  };
};

/* normalizeImpact */

type NormalizeImpactInput = {
  impact?: Impact;
  projectImpact?: ProjectImpact;
  sanityImpact?: EcologicalImpact;
  sdgs?: Maybe<Maybe<Sdg>[]>;
};

const normalizeImpact = ({
  impact,
  projectImpact,
  sanityImpact,
  sdgs,
}: NormalizeImpactInput) => ({
  name: impact?.['schema:name'] || sanityImpact?.name,
  description: projectImpact?.['schema:description'],
  imgSrc: getSanityImgSrc(sanityImpact?.image) || '/svg/default-impact.svg',
  sdgs: getSdgsImages({ sdgs: sanityImpact?.sdgs || sdgs }),
  standard: getSanityImgSrc(sanityImpact?.standard),
});

/* normalizePrimaryImpact */

export const normalizePrimaryImpact = (
  input: NormalizeImpactInput,
  _: TranslatorType,
) =>
  (input?.impact || input?.sanityImpact) && {
    ...normalizeImpact(input),
    label: _(PRIMARY_IMPACT),
  };

/* normalizeCoBenefit */

export const normalizeCoBenefit = (
  input: NormalizeImpactInput,
  _: TranslatorType,
) => {
  if (input?.impact || input?.sanityImpact) {
    return {
      ...normalizeImpact(input),
      label: !!input?.impact?.['@type']
        ? input.impact['@type'] === MEASURED_CO_BENEFIT_IRI
          ? _(MEASURED_CO_BENEFIT)
          : _(PROJECT_BENEFIT)
        : _(CO_BENEFIT),
      labelSx:
        input?.impact?.['@type'] === MEASURED_CO_BENEFIT_IRI
          ? { maxWidth: { xs: '72%', sm: '58%' } }
          : undefined,
    };
  }
};
