import { MessageDescriptor } from '@lingui/core';
import { msg, plural } from '@lingui/core/macro';

import TebuCard from 'web-components/src/components/cards/TebuCard';
import AreaActionsBody from 'web-components/src/components/cards/TebuCard/TebuCard.AreaActionsBody';
import ConnectivityBody from 'web-components/src/components/cards/TebuCard/TebuCard.ConnectivityBody';
import DurationBody from 'web-components/src/components/cards/TebuCard/TebuCard.Duration';
import SocialCulturalBody from 'web-components/src/components/cards/TebuCard/TebuCard.SocialCulturalBody';
import ThreatBody from 'web-components/src/components/cards/TebuCard/TebuCard.ThreatBody';
import { SocialCulturalValueType } from 'web-components/src/components/icons/terrasos/SocialCulturalValueIcon';

import { IucnStatus, ProjectPageMetadataLD } from 'lib/db/types/json-ld';
import { TranslatorType } from 'lib/i18n/i18n.types';

import {
  connectivityFactors,
  durationFactors,
  iucnFactors,
  PRESERVATION,
  RESTORATION,
  socialCulturalFactors,
} from './TerrasosCreditsInfo.constants';

export function getThreatCard(
  _: TranslatorType,
  conservationStatus: IucnStatus,
): JSX.Element {
  const { title, type, factor, description } = iucnFactors[conservationStatus];
  const factorValue =
    typeof factor === 'number' ? factor.toString() : _(msg`factor`);
  return (
    <TebuCard
      header={_(msg`Threat Category of Ecosystem`)}
      headerTooltip={_(
        msg`Categories of the IUCN Red List of Ecosystems assess ecosystem health and risk at a global scale. Tebu promotes protecting the most threatened ecosystems by giving a higher score to those at higher risk.`,
      )}
      footerLabels={[
        {
          label: _(msg`Factor:`),
          value: factorValue,
        },
      ]}
    >
      <ThreatBody title={_(title)} type={type} description={description} />
    </TebuCard>
  );
}

export function getConnectivityFactor(rank: number) {
  // find the factor that matches the rank in the array between the min and max values
  const { level, factor, title } =
    connectivityFactors.find(
      factor => rank >= factor.min && rank < factor.max,
    ) || connectivityFactors[3];
  return { level, factor, title };
}

export function getConnectivityCard(
  _: TranslatorType,
  connectivityIndex: number,
): JSX.Element {
  const { level, factor, title } = getConnectivityFactor(connectivityIndex);
  return (
    <TebuCard
      header={_(msg`Ecological Connectivity Level`)}
      headerTooltip={_(
        msg`Connectivity allows the flow of species and ecological processes that support biodiversity across a larger area. Tebu promotes projects that contribute to the restoration of maintenance of the ecological connectivity at a landscape scale.`,
      )}
      footerLabels={[
        {
          label: _(msg`Factor:`),
          value: factor.toString(),
        },
      ]}
    >
      <ConnectivityBody
        title={_(title)}
        description={_(
          msg`This factor is used to calculate the credits issued for this project.`,
        )}
        type={level}
      />
    </TebuCard>
  );
}

export function getDurationCard(
  _: TranslatorType,
  duration: string,
  minimumDuration: number,
  maximumDuration: number,
  tooltip: MessageDescriptor,
): JSX.Element {
  const years = Number(duration.match(/P(\d+)Y/)?.[1]);
  const { factor } =
    durationFactors.find(({ duration }) => years >= duration) ||
    durationFactors[durationFactors.length - 1];
  const maxDurationPrefix = maximumDuration === 50 ? '>' : '';

  return (
    <TebuCard
      header={_(msg`Project Duration`)}
      headerTooltip={_(tooltip)}
      footerLabels={[
        {
          label: _(msg`Factor:`),
          value: factor.toString(),
        },
      ]}
    >
      <DurationBody
        title={_(
          msg`${plural(years, {
            one: `${years} year project duration`,
            other: `${years} year project duration`,
          })}`,
        )}
        minDurationLabel={_(
          msg`${plural(minimumDuration, {
            one: `${minimumDuration} year minimum`,
            other: `${minimumDuration} years minimum`,
          })}`,
        )}
        maxDurationLabel={_(
          msg`${plural(minimumDuration, {
            one: `${maxDurationPrefix}${maximumDuration} year`,
            other: `${maxDurationPrefix}${maximumDuration} years`,
          })}`,
        )}
        minimumValue={minimumDuration}
        maximumValue={maximumDuration}
        duration={years}
      />
    </TebuCard>
  );
}

export function getManagementAreasValues(
  managementAreas: ProjectPageMetadataLD['regen:managementAreas'],
) {
  const preservationArea = managementAreas?.find(
    area => area['regen:projectActivity'] === PRESERVATION,
  )?.['dcterms:extent']?.['qudt:numericValue'];
  const restorationArea = managementAreas?.find(
    area => area['regen:projectActivity'] === RESTORATION,
  )?.['dcterms:extent']?.['qudt:numericValue'];
  return { preservationArea, restorationArea };
}

export function getAreaActionsCard(
  _: TranslatorType,
  preservationArea: number,
  restorationArea: number,
): JSX.Element {
  return (
    <TebuCard
      header={_(msg`Area Actions`)}
      headerTooltip={_(
        msg`Eligible projects implement preservation and/or restoration activities in different proportion/rates. Tebu recognizes restoration activities have a higher cost by assigning a greater value to restoration actions.`,
      )}
      footerLabels={[
        {
          label: _(msg`Restoration Factor:`),
          value: '0.20',
        },
        {
          label: _(msg`Preservation Factor:`),
          value: '0.16',
        },
      ]}
    >
      <AreaActionsBody
        preservationArea={preservationArea}
        restorationArea={restorationArea}
        preservationLabel={_(msg`Preservation`)}
        restorationLabel={_(msg`Restoration`)}
      />
    </TebuCard>
  );
}

export function getSocialCulturalCard(
  _: TranslatorType,
  type: SocialCulturalValueType,
): JSX.Element {
  const { factor, title, description } =
    socialCulturalFactors.find(factor => factor.type === type) ||
    socialCulturalFactors[3];

  return (
    <TebuCard
      header={_(msg`Social and Cultural Index`)}
      headerTooltip={_(
        msg`The integration of local communities' knowledge, social structures, and equitable participation to ensure both ecosystem conservation and community benefits.`,
      )}
      footerLabels={[
        {
          label: _(msg`Factor:`),
          value: factor.toString(),
        },
      ]}
    >
      <SocialCulturalBody
        title={_(title)}
        description={_(description)}
        type={type}
      />
    </TebuCard>
  );
}
