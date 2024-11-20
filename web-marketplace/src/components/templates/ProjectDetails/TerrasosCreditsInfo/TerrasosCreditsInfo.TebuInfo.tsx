import React from 'react';
import { msg } from '@lingui/macro';
import { useAtom } from 'jotai';

import { SocialCulturalValueType } from 'web-components/src/components/icons/terrasos/SocialCulturalValueIcon';

import { selectedLanguageAtom } from 'lib/atoms/languageSwitcher.atoms';
import { ProjectPageMetadataLD } from 'lib/db/types/json-ld';
import { TranslatorType } from 'lib/i18n/i18n.types';

import { InfoTemplate } from './TerrasosCreditsInfo.InfoTemplate';
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
    <InfoTemplate
      upperContent={projectBatchTotals}
      title={_(msg`Tebu factors`)}
      imgSrc="/svg/tebu-badge.svg"
      imgAlt={_(msg`Tebu badge`)}
      description={_(
        msg`These factors are used to calculate the credits issued for this project.`,
      )}
      learnMoreLink={{ href: learnMoreLink, text: _(msg`Learn more`) }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-20 mt-4 justify-items-center sm:justify-items-start">
        {threatCard}
        {connectivityCard}
        {durationCard}
        {areaActionsCard}
        {socialCulturalCard}
      </div>
    </InfoTemplate>
  );
};

export default TebuInfo;
