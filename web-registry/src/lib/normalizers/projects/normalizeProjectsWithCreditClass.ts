import { ProjectInfo } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';

import { ProjectCardProps } from 'web-components/lib/components/cards/ProjectCard';

import { AllCreditClassQuery } from 'generated/sanity-graphql';
import {
  AnchoredProjectMetadataBaseLD,
  ProjectPageMetadataLD,
} from 'lib/db/types/json-ld';

import { findSanityCreditClass } from 'components/templates/ProjectDetails/ProjectDetails.utils';

import { normalizeClassProjectForBatch } from '../classProjectForBatch/normalizeClassProjectForBatch';
import { EMPTY_CLASS_PROJECT_INFO } from '../classProjectForBatch/normalizeClassProjectForBatch.constants';

import DefaultProject from 'assets/default-project.jpg';

interface Params {
  projects?: ProjectInfo[] | null;
  metadatas?: (AnchoredProjectMetadataBaseLD | undefined)[];
  projectPageMetadatas?: ProjectPageMetadataLD[];
  sanityCreditClassData?: AllCreditClassQuery;
}

export const normalizeProjectsWithCreditClass = ({
  metadatas,
  projectPageMetadatas,
  projects,
  sanityCreditClassData,
}: Params): ProjectCardProps[] =>
  projects?.map((project, index) => {
    const metadata = metadatas?.[index];
    const projectPageMetadata = projectPageMetadatas?.[index];
    const hasAllClassInfos = metadata !== undefined && !!sanityCreditClassData;

    const classProjectInfo = hasAllClassInfos
      ? normalizeClassProjectForBatch({
          batch: null,
          sanityCreditClassData,
          metadata,
          project,
        })
      : EMPTY_CLASS_PROJECT_INFO;

    const creditClass = findSanityCreditClass({
      sanityCreditClassData,
      creditClassIdOrUrl: project?.classId ?? '',
    });
    const creditClassImage =
      creditClass?.image?.image?.asset?.url ?? creditClass?.image?.imageHref;

    return {
      ...project,
      id: project.id,
      name: metadata?.['schema:name'] ?? '',
      imgSrc:
        projectPageMetadata?.['regen:previewPhoto'] ??
        creditClassImage ??
        DefaultProject,
      place: metadata?.['schema:location']?.place_name ?? '',
      area: metadata?.['regen:projectSize']?.['qudt:numericValue'] ?? 0,
      areaUnit: metadata?.['regen:projectSize']?.['qudt:unit'] || '',
      registry: {
        name: '',
        nameRaw: classProjectInfo?.className ?? '',
        type: 'USER',
        image: classProjectInfo?.icon,
      },
    };
  }) ?? [];
