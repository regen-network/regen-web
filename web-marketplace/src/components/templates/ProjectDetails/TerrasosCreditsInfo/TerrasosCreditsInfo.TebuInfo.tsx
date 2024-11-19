import React from 'react';
import { msg } from '@lingui/macro';
import { ButtonBase } from '@mui/material';
import { useAtom } from 'jotai';

import SmallArrowIcon from 'web-components/src/components/icons/SmallArrowIcon';
import { SocialCulturalValueType } from 'web-components/src/components/icons/terrasos/SocialCulturalValueIcon';

import { selectedLanguageAtom } from 'lib/atoms/languageSwitcher.atoms';
import { ProjectPageMetadataLD } from 'lib/db/types/json-ld';
import { TranslatorType } from 'lib/i18n/i18n.types';

import {
  getAreaActionsCard,
  getConnectivityCard,
  getDurationCard,
  getManagementAreasValues,
  getSocialCulturalCard,
  getThreatCard,
} from './TerrasosCreditsInfo.utils';

interface TebuInfoProps {
  projectBatchTotals?: JSX.Element;
  _: TranslatorType;
  projectMetadata: ProjectPageMetadataLD;
}

const TebuInfo: React.FC<TebuInfoProps> = ({
  projectBatchTotals,
  projectMetadata,
  _,
}) => {
  const [selectedLanguage] = useAtom(selectedLanguageAtom);
  const learnMoreLink = `//terrasos.co/${selectedLanguage}/what-is-tebu`;

  const conservationStatus = projectMetadata?.['regen:conservationStatus'];
  const threatCard = conservationStatus && getThreatCard(_, conservationStatus);

  const ecologicalConnectivityIndex =
    projectMetadata?.['regen:ecologicalConnectivityIndex'];
  const connectivityCard =
    ecologicalConnectivityIndex &&
    getConnectivityCard(_, ecologicalConnectivityIndex);

  const duration = projectMetadata?.['regen:projectDuration'];
  // TODO: set this based on methodology schema version
  const minimumDuration = 20;
  const maximumDuration = 30;
  const durationCard =
    duration && getDurationCard(_, duration, minimumDuration, maximumDuration);

  const managementAreas = projectMetadata?.['regen:managementAreas'];
  const { preservationArea, restorationArea } =
    getManagementAreasValues(managementAreas);
  // TODO: validate management areas
  const areaActionsCard =
    preservationArea &&
    restorationArea &&
    getAreaActionsCard(_, preservationArea, restorationArea);

  // TODO: update data standard to use levels instead of float values
  const socialCulturalIndex = projectMetadata?.['regen:socialCulturalIndex'];
  const socialCulturalCard =
    false && getSocialCulturalCard(_, SocialCulturalValueType.High);

  return (
    <div className="px-30 pb-40 border-solid border border-sc-card-standard-stroke rounded-b-[10px] bg-card-standard-background">
      {!!projectBatchTotals && projectBatchTotals}
      <div className={!projectBatchTotals ? 'mt-30 sm:mt-50' : undefined}>
        <div className="font-montserrat text-[32px] font-bold gap-[10px] flex items-center">
          {_(msg`Tebu factors`)}
          <img
            src="/svg/tebu-badge.svg"
            alt={_(msg`Tebu badge`)}
            className="h-[50px] w-[50px]"
          />
        </div>
        <div className="my-[10px]">
          {_(
            msg`These factors are used to calculate the credits issued for this project.`,
          )}
        </div>
        <ButtonBase
          href={learnMoreLink}
          target="_blank"
          className="cursor-pointer font-montserrat text-sc-text-link font-extrabold text-[14px] tracking-[1px] uppercase mb-[30px]"
        >
          {_(msg`Learn more`)}
          <SmallArrowIcon sx={{ width: '7px', ml: '4px' }} />
        </ButtonBase>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[20px] mt-4 justify-items-center sm:justify-items-start">
          {threatCard}
          {connectivityCard}
          {durationCard}
          {areaActionsCard}
          {socialCulturalCard}
        </div>
      </div>
    </div>
  );
};

export default TebuInfo;
