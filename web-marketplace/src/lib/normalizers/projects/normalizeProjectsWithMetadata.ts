import { getClassImageWithProjectDefault } from 'utils/image/classImage';

import { AccountFieldsFragment, Maybe, Project } from 'generated/graphql';
import { AllCreditClassQuery, CreditClass } from 'generated/sanity-graphql';
import {
  AnchoredProjectMetadataBaseLD,
  CreditClassMetadataLD,
  ProjectPageMetadataLD,
} from 'lib/db/types/json-ld';

import { ProjectWithOrderData } from 'pages/Projects/Projects.types';
import { getDisplayAccount } from 'components/templates/ProjectDetails/ProjectDetails.utils';

interface NormalizeProjectsWithOrderDataParams {
  projectsWithOrderData?: ProjectWithOrderData[];
  projectsMetadata?: (AnchoredProjectMetadataBaseLD | undefined)[];
  projectPagesMetadata?: ProjectPageMetadataLD[];
  programAccounts?: Maybe<AccountFieldsFragment | undefined>[];
  sanityCreditClassData?: AllCreditClassQuery;
  classesMetadata?: (CreditClassMetadataLD | undefined)[];
}

export const normalizeProjectsWithMetadata = ({
  projectsWithOrderData,
  projectsMetadata,
  projectPagesMetadata,
  programAccounts,
  classesMetadata,
}: NormalizeProjectsWithOrderDataParams): ProjectWithOrderData[] => {
  const projectsWithMetadata = projectsWithOrderData?.map(
    (projectWithOrderData: ProjectWithOrderData, index) => {
      const projectMetadata = projectsMetadata?.[index];
      const classMetadata = classesMetadata?.[index];
      const projectPageMetadata = projectPagesMetadata?.[index];
      const programAccount = programAccounts?.[index];
      const sanityClass = projectWithOrderData.sanityCreditClassData;

      return normalizeProjectWithMetadata({
        projectWithOrderData,
        projectMetadata,
        projectPageMetadata,
        programAccount,
        classMetadata,
        sanityClass,
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
}

export const normalizeProjectWithMetadata = ({
  offChainProject,
  projectWithOrderData,
  projectMetadata,
  projectPageMetadata,
  programAccount,
  classMetadata,
  sanityClass,
}: NormalizeProjectWithMetadataParams) => {
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
  } as ProjectWithOrderData;
};
