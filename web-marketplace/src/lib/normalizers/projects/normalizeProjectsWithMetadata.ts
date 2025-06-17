import { GeocodeFeature } from '@mapbox/mapbox-sdk/services/geocoding';
import {
  ProjectWithOrderData,
  UISellOrderInfo,
} from 'legacy-pages/Projects/AllProjects/AllProjects.types';
import { getPriceToDisplay } from 'legacy-pages/Projects/hooks/useProjectsSellOrders.utils';
import { getClassImageWithProjectDefault } from 'utils/image/classImage';

import {
  AccountFieldsFragment,
  Maybe,
  Project,
  ProjectSellOrdersFieldsFragment,
  SellOrder,
} from 'generated/graphql';
import {
  AllCreditClassQuery,
  CreditClass,
  ProjectPrefinancing,
} from 'generated/sanity-graphql';
import {
  AnchoredProjectMetadataLD,
  CreditClassMetadataLD,
  ProjectPageMetadataLD,
} from 'lib/db/types/json-ld';
import { ProjectByIdItemType } from 'lib/queries/react-query/sanity/getProjectByIdQuery/getProjectByIdQuery.types';
import { Wallet } from 'lib/wallet/wallet';

import { MIN_USD_CURRENCY_AMOUNT } from 'components/molecules/CreditsAmount/CreditsAmount.constants';
import { CardSellOrder } from 'components/organisms/ChooseCreditsForm/ChooseCreditsForm.types';
import { getDisplayAccount } from 'components/templates/ProjectDetails/ProjectDetails.utils';

interface NormalizeProjectsWithOrderDataParams {
  offChainProjects?: (OffChainProjectToNormalize | undefined)[];
  projectsWithOrderData?: Array<
    NormalizeProject | ProjectWithOrderData | undefined
  >;
  projectsMetadata?: (AnchoredProjectMetadataLD | undefined)[];
  projectPagesMetadata?: ProjectPageMetadataLD[];
  programAccounts?: Maybe<AccountFieldsFragment | undefined>[];
  sanityCreditClassData?: AllCreditClassQuery;
  classesMetadata?: (CreditClassMetadataLD | undefined)[];
  sanityProjects?: (ProjectByIdItemType | undefined)[];
  wallet?: Wallet;
}

export const normalizeProjectsWithMetadata = ({
  offChainProjects,
  projectsWithOrderData,
  projectsMetadata,
  projectPagesMetadata,
  programAccounts,
  classesMetadata,
  sanityProjects,
  wallet,
}: NormalizeProjectsWithOrderDataParams): NormalizeProject[] => {
  const projectsWithMetadata = projectsWithOrderData?.map(
    (projectWithOrderData, index) => {
      const projectMetadata = projectsMetadata?.[index];
      const classMetadata = classesMetadata?.[index];
      const projectPageMetadata = projectPagesMetadata?.[index];
      const programAccount = programAccounts?.[index];
      const offChainProject = offChainProjects?.[index];
      const sanityProject = sanityProjects?.[index];
      const sanityClass = projectWithOrderData?.sanityCreditClassData;

      return normalizeProjectWithMetadata({
        offChainProject,
        projectWithOrderData,
        projectMetadata,
        projectPageMetadata,
        programAccount,
        classMetadata,
        sanityClass,
        sanityProject,
        wallet,
      });
    },
  );

  return projectsWithMetadata ?? [];
};

type OffChainProjectToNormalize = Maybe<
  Pick<Project, 'id' | 'slug' | 'published'> & ProjectSellOrdersFieldsFragment
>;

interface NormalizeProjectWithMetadataParams {
  offChainProject?: OffChainProjectToNormalize;
  projectWithOrderData?: NormalizeProject | ProjectWithOrderData;
  projectMetadata?: AnchoredProjectMetadataLD | undefined;
  projectPageMetadata?: ProjectPageMetadataLD;
  programAccount?: Maybe<AccountFieldsFragment | undefined>;
  classMetadata?: CreditClassMetadataLD | undefined;
  sanityClass?: CreditClass;
  projectPrefinancing?: Maybe<
    Pick<
      ProjectPrefinancing,
      | 'isPrefinanceProject'
      | 'price'
      | 'estimatedIssuance'
      | 'stripePaymentLink'
    >
  >;
  sanityProject?: ProjectByIdItemType;
  wallet?: Wallet;
}

export type NormalizeProject = ProjectWithOrderData & {
  id?: string;
  type?: string;
  offChainId?: string;
  slug?: string;
  name?: string;
  href?: string;
  imgSrc?: string;
  location?: GeocodeFeature;
  place?: string;
  program?: Maybe<AccountFieldsFragment>;
  area?: number;
  cardSellOrders?: Array<CardSellOrder>;
  filteredSellOrders?: Array<UISellOrderInfo>;
  marketType?: string[];
  complianceCredits: {
    creditsAvailable: number;
    creditsRetired: number;
    creditsRegistered: number;
  };
  ecosystemType?: string[];
};
export const normalizeProjectWithMetadata = ({
  offChainProject,
  projectWithOrderData,
  projectMetadata,
  projectPageMetadata,
  programAccount,
  classMetadata,
  sanityClass,
  sanityProject,
  projectPrefinancing,
  wallet,
}: NormalizeProjectWithMetadataParams): NormalizeProject => {
  const creditClassImage = getClassImageWithProjectDefault({
    metadata: classMetadata,
    sanityClass,
  });
  const program = getDisplayAccount(
    classMetadata?.['regen:sourceRegistry'],
    programAccount,
  );
  const projectId = projectWithOrderData?.id || offChainProject?.id;

  const _projectPrefinancing =
    projectPrefinancing || sanityProject?.projectPrefinancing;

  const filteredSellOrders = (projectWithOrderData?.sellOrders || []).filter(
    sellOrder => sellOrder.seller !== wallet?.address,
  );

  const cardSellOrders = getCardSellOrders(
    filteredSellOrders,
    offChainProject?.sellOrdersByProjectId?.nodes,
  );

  return {
    ...projectWithOrderData,
    id: projectId,
    type:
      projectMetadata?.['@type'] ??
      projectPageMetadata?.['@type'] ??
      (projectWithOrderData as NormalizeProject)?.type,
    marketType:
      projectMetadata?.['regen:marketType'] ??
      projectPageMetadata?.['regen:marketType'] ??
      (projectWithOrderData as NormalizeProject)?.marketType,
    ecosystemType:
      projectMetadata?.['regen:ecosystemType'] ??
      projectPageMetadata?.['regen:ecosystemType'] ??
      (projectWithOrderData as NormalizeProject)?.ecosystemType,
    offChainId: offChainProject?.id ?? projectWithOrderData?.offChainId,
    slug: offChainProject?.slug ?? projectWithOrderData?.slug,
    draft: !projectWithOrderData && !offChainProject?.published,
    name:
      projectMetadata?.['schema:name'] ||
      projectWithOrderData?.name ||
      offChainProject?.slug ||
      offChainProject?.id ||
      projectWithOrderData?.id,
    href: projectId ? `/project/${projectId}` : undefined,
    imgSrc:
      projectPageMetadata?.['regen:previewPhoto']?.['schema:url'] ||
      projectMetadata?.['regen:previewPhoto']?.['schema:url'] ||
      projectWithOrderData?.imgSrc ||
      creditClassImage,
    location: projectMetadata?.['schema:location'],
    place:
      projectMetadata?.['schema:location']?.place_name ||
      projectWithOrderData?.place,
    program,
    area:
      projectMetadata?.['regen:projectSize']?.['qudt:numericValue'] ||
      projectWithOrderData?.area,
    areaUnit:
      projectMetadata?.['regen:projectSize']?.['qudt:unit'] ||
      projectWithOrderData?.areaUnit ||
      '',
    projectPrefinancing: {
      ..._projectPrefinancing,
      price: _projectPrefinancing?.price
        ? getPriceToDisplay({
            price: _projectPrefinancing?.price,
          })
        : undefined,
    },
    region:
      projectMetadata?.['regen:region'] ||
      projectPageMetadata?.['regen:region'] ||
      projectWithOrderData?.region,
    cardSellOrders,
    filteredSellOrders,
    complianceCredits: sanityProject?.complianceCredits ?? {
      creditsAvailable: 0,
      creditsRetired: 0,
      creditsRegistered: 0,
    },
  } as NormalizeProject;
};

export const getCardSellOrders = (
  sellOrders: UISellOrderInfo[],
  fiatSellOrders?: ProjectSellOrdersFieldsFragment['sellOrdersByProjectId']['nodes'],
) => {
  const cardSellOrders = (
    fiatSellOrders
      ? fiatSellOrders.reduce((acc: CardSellOrder[], fiatOrder) => {
          const sellOrder = sellOrders.find(
            cryptoOrder => cryptoOrder.id.toString() === fiatOrder?.onChainId,
          );
          if (sellOrder && fiatOrder) {
            acc.push({
              price: fiatOrder.price,
              ...sellOrder,
            } as CardSellOrder);
          }
          return acc;
        }, [])
      : []
  ).sort((a, b) => a.price - b.price);

  let hasMinUsdAmount = false;
  let currentSum = 0;

  for (const order of cardSellOrders) {
    currentSum = Number(
      (currentSum + order.price * Number(order.quantity)).toFixed(2),
    );
    if (currentSum >= MIN_USD_CURRENCY_AMOUNT) {
      hasMinUsdAmount = true;
      break;
    }
  }

  return hasMinUsdAmount ? cardSellOrders : [];
};
