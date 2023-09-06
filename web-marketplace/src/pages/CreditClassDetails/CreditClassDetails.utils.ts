import { EEUR_DENOM, EVMOS_DENOM, REGEN_DENOM } from 'config/allowedBaseDenoms';
import { computeMedianPrice, Order } from 'utils/price/computeMedianPrice';

import { CreditClassByOnChainIdQuery, Maybe } from 'generated/graphql';
import { EcologicalImpact, Sdg } from 'generated/sanity-graphql';
import {
  Impact,
  MEASURED_CO_BENEFIT_IRI,
  ProjectImpact,
} from 'lib/db/types/json-ld';
import { microToDenom } from 'lib/denom.utils';
import { getSanityImgSrc } from 'lib/imgSrc';

import { GECKO_PRICES } from 'pages/Projects/hooks/useProjectsSellOrders.types';
import { getPriceToDisplay } from 'pages/Projects/hooks/useProjectsSellOrders.utils';
import { ProjectWithOrderData } from 'pages/Projects/Projects.types';
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
  geckoPrices?: GECKO_PRICES;
  projectsWithOrderData: ProjectWithOrderData[];
};

export const getCreditClassAvgPricePerTonLabel = ({
  geckoPrices = {},
  projectsWithOrderData,
}: GetCreditClassAvgPricePerTonLabelParams) => {
  const { eeurPrice, regenPrice, usdcPrice, evmosPrice } = geckoPrices;

  // create array of orders with credit quantity and ask price (USD amount)
  const orders: Order[] = [];
  for (const project of projectsWithOrderData) {
    for (const order of project.sellOrders) {
      const amount = microToDenom(order.askAmount);
      let denomPrice = usdcPrice ?? 1;

      if (order.askBaseDenom === REGEN_DENOM) {
        denomPrice = regenPrice ?? 0;
      }
      if (order.askBaseDenom === EEUR_DENOM) {
        denomPrice = eeurPrice ?? 0;
      }
      if (order.askBaseDenom === EVMOS_DENOM) {
        denomPrice = evmosPrice ?? 0;
      }
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

export const normalizePrimaryImpact = (input: NormalizeImpactInput) =>
  (input?.impact || input?.sanityImpact) && {
    ...normalizeImpact(input),
    label: PRIMARY_IMPACT,
  };

/* normalizeCoBenefit */

export const normalizeCoBenefit = (input: NormalizeImpactInput) =>
  (input?.impact || input?.sanityImpact) && {
    ...normalizeImpact(input),
    label: !!input?.impact?.['@type']
      ? input.impact['@type'] === MEASURED_CO_BENEFIT_IRI
        ? MEASURED_CO_BENEFIT
        : PROJECT_BENEFIT
      : CO_BENEFIT,
    labelSx:
      input?.impact?.['@type'] === MEASURED_CO_BENEFIT_IRI
        ? { maxWidth: { xs: '72%', sm: '58%' } }
        : undefined,
  };
