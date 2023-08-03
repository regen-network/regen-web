import { EEUR_DENOM, EVMOS_DENOM, REGEN_DENOM } from 'config/allowedBaseDenoms';
import { TRANSPARENT_PIXEL } from 'utils/image/transparentPixel';
import { computeMedianPrice, Order } from 'utils/price/computeMedianPrice';

import { ProjectImpactCardProps } from 'web-components/lib/components/cards/ProjectImpactCard/ProjectImpactCard';

import { CreditClassByOnChainIdQuery, Maybe } from 'generated/graphql';
import { EcologicalImpact } from 'generated/sanity-graphql';
import { microToDenom } from 'lib/denom.utils';
import { getSanityImgSrc } from 'lib/imgSrc';

import { GECKO_PRICES } from 'pages/Projects/hooks/useProjectsSellOrders.types';
import { getPriceToDisplay } from 'pages/Projects/hooks/useProjectsSellOrders.utils';
import { ProjectWithOrderData } from 'pages/Projects/Projects.types';
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
  const coBenefitsIRIs =
    creditClassVersion?.metadata?.['regen:coBenefits']?.map(
      (impact: { '@id': string }) => impact['@id'],
    ) || [];
  const primaryImpactIRI =
    creditClassVersion?.metadata?.['regen:indicator']?.['@id'];

  return {
    primaryImpactIRI,
    coBenefitsIRIs,
  };
};

/* normalizeProjectImpactCard */

export const normalizeProjectImpactCards = (
  impact: EcologicalImpact[],
): ProjectImpactCardProps[] => {
  const hasStandardLogo = impact.some(item => !!item.standard);
  const standardDefaultValue = hasStandardLogo ? TRANSPARENT_PIXEL : undefined;

  return impact.map(({ name, image, standard, sdgs }, index: number) => ({
    name,
    imgSrc: getSanityImgSrc(image),
    sdgs: getSdgsImages({ sdgs }),
    standard: getSanityImgSrc(standard, standardDefaultValue),
    monitored: index === 0,
  }));
};
