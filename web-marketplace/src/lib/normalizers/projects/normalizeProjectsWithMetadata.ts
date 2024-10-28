import { GeocodeFeature } from '@mapbox/mapbox-sdk/services/geocoding';
import { getClassImageWithProjectDefault } from 'utils/image/classImage';

import { formatNumber } from 'web-components/src/utils/format';

import {
  AccountFieldsFragment,
  Maybe,
  Project,
  ProjectFieldsFragment,
} from 'generated/graphql';
import {
  AllCreditClassQuery,
  CreditClass,
  Project as SanityProject,
  ProjectByIdQuery,
  ProjectPrefinancing,
} from 'generated/sanity-graphql';
import {
  AnchoredProjectMetadataBaseLD,
  CreditClassMetadataLD,
  ProjectPageMetadataLD,
} from 'lib/db/types/json-ld';
import { Wallet } from 'lib/wallet/wallet';

import {
  ProjectWithOrderData,
  UISellOrderInfo,
} from 'pages/Projects/AllProjects/AllProjects.types';
import { getPriceToDisplay } from 'pages/Projects/hooks/useProjectsSellOrders.utils';
import { CardSellOrder } from 'components/organisms/ChooseCreditsForm/ChooseCreditsForm.types';
import { getDisplayAccount } from 'components/templates/ProjectDetails/ProjectDetails.utils';

interface NormalizeProjectsWithOrderDataParams {
  offChainProjects?: (Maybe<ProjectFieldsFragment> | undefined)[];
  projectsWithOrderData?: ProjectWithOrderData[];
  projectsMetadata?: (AnchoredProjectMetadataBaseLD | undefined)[];
  projectPagesMetadata?: ProjectPageMetadataLD[];
  programAccounts?: Maybe<AccountFieldsFragment | undefined>[];
  sanityCreditClassData?: AllCreditClassQuery;
  classesMetadata?: (CreditClassMetadataLD | undefined)[];
  sanityProjects?: (ProjectByIdQuery['allProject'][0] | undefined)[];
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
    (projectWithOrderData: ProjectWithOrderData, index) => {
      const projectMetadata = projectsMetadata?.[index];
      const classMetadata = classesMetadata?.[index];
      const projectPageMetadata = projectPagesMetadata?.[index];
      const programAccount = programAccounts?.[index];
      const offChainProject = offChainProjects?.[index];
      const sanityProject = sanityProjects?.[index];
      const sanityClass = projectWithOrderData.sanityCreditClassData;

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

interface NormalizeProjectWithMetadataParams {
  offChainProject?: Maybe<Pick<Project, 'id' | 'slug' | 'published'>>;
  projectWithOrderData?: ProjectWithOrderData;
  projectMetadata?: AnchoredProjectMetadataBaseLD | undefined;
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
  sanityProject?: ProjectByIdQuery['allProject'][0] | undefined;
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
  marketType?: string;
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
    sanityProject?.fiatSellOrders,
    filteredSellOrders,
  );

  return {
    ...projectWithOrderData,
    id: projectId,
    type: projectMetadata?.['@type'] ?? projectPageMetadata?.['@type'],
    marketType: projectMetadata?.['marketType'],
    offChainId: offChainProject?.id,
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
      estimatedIssuance: _projectPrefinancing?.estimatedIssuance
        ? formatNumber({
            num: _projectPrefinancing?.estimatedIssuance,
          })
        : undefined,
    },
    cardSellOrders,
    filteredSellOrders,
  } as NormalizeProject;
};

const getCardSellOrders = (
  sanityFiatSellOrders: SanityProject['fiatSellOrders'],
  sellOrders: UISellOrderInfo[],
) =>
  sanityFiatSellOrders
    ?.map(fiatOrder => {
      const sellOrder = sellOrders.find(
        cryptoOrder => cryptoOrder.id.toString() === fiatOrder?.sellOrderId,
      );
      if (sellOrder) {
        return {
          ...fiatOrder,
          ...sellOrder,
        };
      }
      return null;
    })
    .filter(Boolean) || [];
