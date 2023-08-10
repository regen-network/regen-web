import { ProjectInfo } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';
import { getClassImageWithProjectDefault } from 'utils/image/classImage';

import { ProjectCardProps } from 'web-components/lib/components/cards/ProjectCard';

import { Maybe, PartyFieldsFragment } from 'generated/graphql';
import { AllCreditClassQuery } from 'generated/sanity-graphql';
import {
  AnchoredProjectMetadataBaseLD,
  CreditClassMetadataLD,
  ProjectPageMetadataLD,
} from 'lib/db/types/json-ld';

import {
  findSanityCreditClass,
  getDisplayParty,
} from 'components/templates/ProjectDetails/ProjectDetails.utils';

import { normalizeClassProjectForBatch } from '../classProjectForBatch/normalizeClassProjectForBatch';
import { EMPTY_CLASS_PROJECT_INFO } from '../classProjectForBatch/normalizeClassProjectForBatch.constants';

interface Params {
  projects?: ProjectInfo[] | null;
  projectsMetadata?: (AnchoredProjectMetadataBaseLD | undefined)[];
  projectPagesMetadata?: ProjectPageMetadataLD[];
  programParties?: Maybe<PartyFieldsFragment | undefined>[];
  classesMetadata?: (CreditClassMetadataLD | undefined)[];
  sanityCreditClassData?: AllCreditClassQuery;
}

export const normalizeProjectsWithCreditClass = ({
  projectsMetadata,
  projectPagesMetadata,
  programParties,
  classesMetadata,
  projects,
  sanityCreditClassData,
}: Params): ProjectCardProps[] =>
  projects?.map((project, index) => {
    const projectMetadata = projectsMetadata?.[index];
    const creditClassMetadata = classesMetadata?.[index];
    const projectPageMetadata = projectPagesMetadata?.[index];
    const projectParty = programParties?.[index];
    const hasAllClassInfos =
      (projectMetadata !== undefined && !!sanityCreditClassData) ||
      creditClassMetadata !== undefined;

    const classProjectInfo = hasAllClassInfos
      ? normalizeClassProjectForBatch({
          batch: null,
          sanityCreditClassData,
          projectMetadata,
          creditClassMetadata,
          project,
        })
      : EMPTY_CLASS_PROJECT_INFO;

    const creditClass = findSanityCreditClass({
      sanityCreditClassData,
      creditClassIdOrUrl: project?.classId ?? '',
    });
    const creditClassImage = getClassImageWithProjectDefault({
      metadata: creditClassMetadata,
      sanityClass: creditClass,
    });
    const program = getDisplayParty(
      creditClassMetadata?.['regen:sourceRegistry'],
      projectParty,
    );

    return {
      ...project,
      id: project.id,
      name: projectMetadata?.['schema:name'] ?? '',
      imgSrc:
        projectPageMetadata?.['regen:previewPhoto']?.['schema:url'] ??
        creditClassImage,
      place: projectMetadata?.['schema:location']?.place_name ?? '',
      area: projectMetadata?.['regen:projectSize']?.['qudt:numericValue'] ?? 0,
      areaUnit: projectMetadata?.['regen:projectSize']?.['qudt:unit'] || '',
      registry: {
        name: '',
        nameRaw:
          (creditClassMetadata?.['schema:name'] ||
            classProjectInfo?.className) ??
          '',
        type: 'USER',
        image: '/svg/class-default.svg',
      },
      program,
    };
  }) ?? [];
