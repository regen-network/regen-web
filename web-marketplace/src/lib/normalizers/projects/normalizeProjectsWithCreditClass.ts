import { ProjectInfo } from '@regen-network/api/regen/ecocredit/v1/query';
import { getClassImageWithProjectDefault } from 'utils/image/classImage';

import { ProjectCardProps } from 'web-components/src/components/cards/ProjectCard';

import { AccountFieldsFragment, Maybe } from 'generated/graphql';
import { AllCreditClassQuery } from 'generated/sanity-graphql';
import {
  DRAFT_TEXT,
  getProjectCardBodyTextMapping,
  getProjectCardButtonMapping,
  getProjectCardPurchaseDetailsTitleMapping,
} from 'lib/constants/shared.constants';
import {
  AnchoredProjectMetadataBaseLD,
  CreditClassMetadataLD,
  ProjectPageMetadataLD,
} from 'lib/db/types/json-ld';
import { TranslatorType } from 'lib/i18n/i18n.types';

import {
  findSanityCreditClass,
  getDisplayAccount,
} from 'components/templates/ProjectDetails/ProjectDetails.utils';

import { normalizeClassProjectForBatch } from '../classProjectForBatch/normalizeClassProjectForBatch';
import { EMPTY_CLASS_PROJECT_INFO } from '../classProjectForBatch/normalizeClassProjectForBatch.constants';

interface Params {
  projects?: ProjectInfo[] | null;
  projectsMetadata?: (AnchoredProjectMetadataBaseLD | undefined)[];
  projectPagesMetadata?: ProjectPageMetadataLD[];
  programParties?: Maybe<AccountFieldsFragment | undefined>[];
  classesMetadata?: (CreditClassMetadataLD | undefined)[];
  sanityCreditClassData?: AllCreditClassQuery;
  _: TranslatorType;
}

export const normalizeProjectsWithCreditClass = ({
  projectsMetadata,
  projectPagesMetadata,
  programParties,
  classesMetadata,
  projects,
  sanityCreditClassData,
  _,
}: Params): ProjectCardProps[] =>
  projects?.map((project, index) => {
    const buttons = getProjectCardButtonMapping(_);
    const projectMetadata = projectsMetadata?.[index];
    const creditClassMetadata = classesMetadata?.[index];
    const projectPageMetadata = projectPagesMetadata?.[index];
    const projectAccount = programParties?.[index];
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
    const program = getDisplayAccount(
      creditClassMetadata?.['regen:sourceRegistry'],
      projectAccount,
    );

    return {
      ...project,
      id: project.id,
      name: projectMetadata?.['schema:name'] ?? '',
      imgSrc:
        projectPageMetadata?.['regen:previewPhoto']?.['schema:url'] ||
        projectMetadata?.['regen:previewPhoto']?.['schema:url'] ||
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
      draftText: _(DRAFT_TEXT),
      bodyTexts: getProjectCardBodyTextMapping(_),
      buttons,
      purchaseDetailsTitles: getProjectCardPurchaseDetailsTitleMapping(_),
    };
  }) ?? [];
