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
  AllPrefinanceProjectQuery,
  CreditClass,
  ProjectPrefinancing,
} from 'generated/sanity-graphql';
import {
  AnchoredProjectMetadataBaseLD,
  CreditClassMetadataLD,
  ProjectPageMetadataLD,
} from 'lib/db/types/json-ld';

import { ProjectWithOrderData } from 'pages/Projects/AllProjects/AllProjects.types';
import { getPriceToDisplay } from 'pages/Projects/hooks/useProjectsSellOrders.utils';
import { getDisplayAccount } from 'components/templates/ProjectDetails/ProjectDetails.utils';

interface NormalizeProjectsWithOrderDataParams {
  offChainProjects?: (Maybe<ProjectFieldsFragment> | undefined)[];
  projectsWithOrderData?: ProjectWithOrderData[];
  projectsMetadata?: (AnchoredProjectMetadataBaseLD | undefined)[];
  projectPagesMetadata?: ProjectPageMetadataLD[];
  programAccounts?: Maybe<AccountFieldsFragment | undefined>[];
  sanityCreditClassData?: AllCreditClassQuery;
  prefinanceProjectsData?: AllPrefinanceProjectQuery;
  classesMetadata?: (CreditClassMetadataLD | undefined)[];
}

export const normalizeProjectsWithMetadata = ({
  offChainProjects,
  projectsWithOrderData,
  projectsMetadata,
  projectPagesMetadata,
  programAccounts,
  classesMetadata,
  prefinanceProjectsData,
}: NormalizeProjectsWithOrderDataParams): ProjectWithOrderData[] => {
  const projectsWithMetadata = projectsWithOrderData?.map(
    (projectWithOrderData: ProjectWithOrderData, index) => {
      const projectMetadata = projectsMetadata?.[index];
      const classMetadata = classesMetadata?.[index];
      const projectPageMetadata = projectPagesMetadata?.[index];
      const programAccount = programAccounts?.[index];
      const offChainProject = offChainProjects?.[index];
      const sanityClass = projectWithOrderData.sanityCreditClassData;
      const prefinanceProject = prefinanceProjectsData?.allProject?.find(
        project =>
          project.projectId === projectWithOrderData.offChainId ||
          project.projectId === projectWithOrderData.id || // on-chain id
          project.projectId === projectWithOrderData.slug,
      );

      return normalizeProjectWithMetadata({
        offChainProject,
        projectWithOrderData,
        projectMetadata,
        projectPageMetadata,
        programAccount,
        classMetadata,
        sanityClass,
        projectPrefinancing: prefinanceProject?.projectPrefinancing,
      });
    },
  );

  return projectsWithMetadata ?? [];
};

interface NormalizeProjectWithMetadataParams {
  offChainProject?: Maybe<Pick<Project, 'id' | 'slug'>>;
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
}

export type NormalizeProject = ProjectWithOrderData & {
  id?: string;
  offChainId?: string;
  slug?: string;
  name?: string;
  href?: string;
  imgSrc?: string;
  location?: GeocodeFeature;
  place?: string;
  program?: Maybe<AccountFieldsFragment>;
  area?: number;
  projectPrefinancing?: ProjectPrefinancing;
};
export const normalizeProjectWithMetadata = ({
  offChainProject,
  projectWithOrderData,
  projectMetadata,
  projectPageMetadata,
  programAccount,
  classMetadata,
  sanityClass,
  projectPrefinancing,
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

  return {
    ...projectWithOrderData,
    id: projectId,
    offChainId: offChainProject?.id,
    slug: offChainProject?.slug ?? projectWithOrderData?.slug,
    name:
      projectMetadata?.['schema:name'] ||
      projectWithOrderData?.name ||
      offChainProject?.slug ||
      offChainProject?.id ||
      projectWithOrderData?.id,
    href: projectId ? `/project/${projectId}` : undefined,
    imgSrc:
      projectPageMetadata?.['regen:previewPhoto']?.['schema:url'] ||
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
      ...projectPrefinancing,
      price: projectPrefinancing?.price
        ? getPriceToDisplay({
            price: projectPrefinancing?.price,
          })
        : undefined,
      estimatedIssuance: projectPrefinancing?.estimatedIssuance
        ? formatNumber({
            num: projectPrefinancing?.estimatedIssuance,
          })
        : undefined,
    },
  } as NormalizeProject;
};
