import React from 'react';
import { msg } from '@lingui/macro';
import { Box, ButtonBase } from '@mui/material';

import TebuCard from 'web-components/src/components/cards/TebuCard';
import SmallArrowIcon from 'web-components/src/components/icons/SmallArrowIcon';
import { SocialCulturalValueType } from 'web-components/src/components/icons/terrasos/SocialCulturalValueIcon';

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
  projectPageMetadata: ProjectPageMetadataLD;
}

const TebuInfo: React.FC<TebuInfoProps> = ({
  projectBatchTotals,
  projectPageMetadata,
  _,
}) => {
  console.log({ projectPageMetadata });

  const conservationStatus = projectPageMetadata?.['regen:conservationStatus'];
  const threatCard = conservationStatus && getThreatCard(_, conservationStatus);

  const ecologicalConnectivityIndex =
    projectPageMetadata?.['regen:ecologicalConnectivityIndex'];
  const connectivityCard =
    ecologicalConnectivityIndex &&
    getConnectivityCard(_, ecologicalConnectivityIndex);

  const duration = projectPageMetadata?.['regen:projectDuration'];
  // TODO: set this based on methodology schema version
  const minimumDuration = 20;
  const maximumDuration = 30;
  const durationCard =
    duration && getDurationCard(_, duration, minimumDuration, maximumDuration);

  const managementAreas = projectPageMetadata?.['regen:managementAreas'];
  const { preservationArea, restorationArea } =
    getManagementAreasValues(managementAreas);
  // TODO: validate management areas
  const areaActionsCard =
    preservationArea &&
    restorationArea &&
    getAreaActionsCard(_, preservationArea, restorationArea);

  const socialCulturalIndex =
    projectPageMetadata?.['regen:socialCulturalIndex'];
  const socialCulturalCard =
    true && getSocialCulturalCard(_, SocialCulturalValueType.High);
  return (
    <Box
      sx={{
        p: 8,
        backgroundColor: 'primary.main',
        border: '1px solid',
        borderColor: 'info.light',
        borderRadius: '0 0 8px 8px',
      }}
    >
      {!!projectBatchTotals && projectBatchTotals}
      <div>
        <div className="font-montserrat text-[32px] font-bold mt-[50px]">
          {_(msg`Tebu factors`)}
          {/* TODO: Tebu icon */}
        </div>
        <div>
          {_(
            msg`These factors are used to calculate the credits issued for this project.`,
          )}
        </div>
        <ButtonBase
          // TODO: add href
          href="#"
          className="cursor-pointer font-montserrat text-sc-text-link font-extrabold text-[14px] tracking-[1px] uppercase"
        >
          {_(msg`Learn more`)}
          <SmallArrowIcon sx={{ width: '7px', ml: '4px' }} />
        </ButtonBase>

        {/* TODO: tebu factors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[20px] mt-4">
          {threatCard}
          {connectivityCard}
          {durationCard}
          {areaActionsCard}
          {socialCulturalCard}
        </div>
      </div>
    </Box>
  );
};

export default TebuInfo;
