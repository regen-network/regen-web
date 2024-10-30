import type { MessageDescriptor } from '@lingui/core';
import { msg, Trans } from '@lingui/macro';

import TebuCard from 'web-components/src/components/cards/TebuCard';
import AreaActionsBody from 'web-components/src/components/cards/TebuCard/TebuCard.AreaActionsBody';
import ConnectivityBody from 'web-components/src/components/cards/TebuCard/TebuCard.ConnectivityBody';
import DurationBody from 'web-components/src/components/cards/TebuCard/TebuCard.Duration';
import SocialCulturalBody from 'web-components/src/components/cards/TebuCard/TebuCard.SocialCulturalBody';
import ThreatBody from 'web-components/src/components/cards/TebuCard/TebuCard.ThreatBody';
import { Level } from 'web-components/src/components/icons/terrasos/EcologicalConnectivityLevelIcon/EcologicalConnectivityLevelIcon';
import { IucnType } from 'web-components/src/components/icons/terrasos/IucnRedCodeIcon';
import { SocialCulturalValueType } from 'web-components/src/components/icons/terrasos/SocialCulturalValueIcon';

import { IucnStatus, ProjectPageMetadataLD } from 'lib/db/types/json-ld';
import { TranslatorType } from 'lib/i18n/i18n.types';

type IucnMapType = Record<
  IucnStatus,
  // { type: IucnType; factor: string | number }
  // { type: IucnType; factor: string | number; description: MessageDescriptor }
  { type: IucnType; factor: string | number; description: JSX.Element }
>;
// const iucnMap: IucnMapType = {
//   EXTINCT: {
//     type: IucnType.IucnExtinct,
//     factor: 'n/a',
//   },
//   EXTINCT_IN_WILD: {
//     type: IucnType.IucnExtinctInWild,
//     factor: 'n/a',
//   },
//   CRITICALLY_ENDANGERED: {
//     type: IucnType.IucnCriticallyEndangered,
//     factor: 0.2,
//   },
//   ENDANGERED: {
//     type: IucnType.IucnEndangered,
//     factor: 0.18,
//   },
//   VULNERABLE: {
//     type: IucnType.IucnVulnerable,
//     factor: 0.16,
//   },
//   NEAR_THREATENED: {
//     type: IucnType.IucnNearThreatened,
//     factor: 0.12,
//   },
//   LEAST_CONCERN: {
//     type: IucnType.IucnLeastConcern,
//     factor: 0.12,
//   },
//   DATA_DEFICIENT: {
//     type: IucnType.IucnDataDeficient,
//     factor: 0.12,
//   },
//   NOT_EVALUATED: {
//     type: IucnType.IucnNotEvaluated,
//     factor: 'n/a',
//   },
// };
const iucnMap: IucnMapType = {
  EXTINCT: {
    type: IucnType.IucnExtinct,
    factor: 'n/a',
    description: <Trans>
        A taxon is extinct when there is no reasonable doubt that the last
        individual has died.
      </Trans>,
  },
  EXTINCT_IN_WILD: {
    type: IucnType.IucnExtinctInWild,
    factor: 'n/a',
    description: <Trans>
        A taxon is extinct in the wild when it is known only to survive in
        cultivation, in captivity or as a naturalized population (or
        populations) well outside the past range.
      </Trans>,
  },
  CRITICALLY_ENDANGERED: {
    type: IucnType.IucnCriticallyEndangered,
    factor: 0.2,
    description: <Trans>
        Ecosystem with declining areas, severe degradation, and disrupted
        processes facing an <strong>extremely high collapse risk</strong>.
      </Trans>,
  },
  ENDANGERED: {
    type: IucnType.IucnEndangered,
    factor: 0.18,
    description: <Trans>
        Ecosystems where information about the levels of environmental
        degradation and disruption of biotic processes indicate that there is
        a<strong>very high risk of collapse</strong>.
      </Trans>,
  },
  VULNERABLE: {
    type: IucnType.IucnVulnerable,
    factor: 0.16,
    description: <Trans>
        An ecosystem considered to be facing a{' '}
        <strong>high risk of collapse</strong>.
      </Trans>,
  },
  NEAR_THREATENED: {
    type: IucnType.IucnNearThreatened,
    factor: 0.12,
    description: <Trans>
        Ecosystem that does not qualify for Critically Endangered, Endangered,
        or Vulnerable, but{' '}
        <strong>
          likely to qualify for a threatened category in the near future.
        </strong>
      </Trans>,
  },
  LEAST_CONCERN: {
    type: IucnType.IucnLeastConcern,
    factor: 0.12,
    description: <Trans>
        Ecosystems that unequivocally do not meet any of the criteria for the
        threat categories.
      </Trans>,
  },
  DATA_DEFICIENT: {
    type: IucnType.IucnDataDeficient,
    factor: 0.12,
    description: <Trans>
        An ecosystem has insufficient data when there is{' '}
        <strong>
          no adequate information to make a direct or indirect assessment
        </strong>{' '}
        of its risk of collapse.
      </Trans>,
  },
  NOT_EVALUATED: {
    type: IucnType.IucnNotEvaluated,
    factor: 'n/a',
    description: <Trans>
        Ecosystems that have not yet been assessed. For these cases, the
        Protocol proposes an alternative that allows describing the conditions
        of the territory.
      </Trans>,
  },
};

// type IucnStatus =
//   | 'EXTINCT'
//   | 'EXTINCT_IN_WILD'
//   | 'CRITICALLY_ENDANGERED'
//   | 'ENDANGERED'
//   | 'VULNERABLE'
//   | 'NEAR_THREATENED'
//   | 'LEAST_CONCERN'
//   | 'DATA_DEFICIENT'
//   | 'NOT_EVALUATED';

export function getThreatCard(
  _: TranslatorType,
  conservationStatus: IucnStatus,
): JSX.Element {
  // return {
  //   header: _(msg`Threat Category of Ecosystem`),
  //   body: (
  //     <ThreatBody
  //       title={_(msg`Threat Category of Ecosystem`)}
  //       description={_(
  //         msg`This factor is used to calculate the credits issued for this project.`,
  //       )}
  //     />
  //   ),
  // };
  const { type, factor, description } = iucnMap[conservationStatus];
  const factorValue =
    typeof factor === 'number' ? factor.toString() : _(msg`factor`);
  return (
    <TebuCard
      header={_(msg`Threat Category of Ecosystem`)}
      headerTooltip={_(msg`Header Tooltip`)}
      footerLabels={[
        {
          label: _(msg`Factor:`),
          value: factorValue,
        },
      ]}
    >
      <ThreatBody
        title={_(msg`Threat Category of Ecosystem`)}
        type={type}
        // description={_(
        //   msg`This factor is used to calculate the credits issued for this project.`,
        // )}
        description={description}
      />
    </TebuCard>
  );
}

export const connectivityFactors = [
  {
    level: Level.HighlySignificant,
    factor: 0.2,
    min: 76,
    max: 100,
  },
  {
    level: Level.Significant,
    factor: 0.18,
    min: 51,
    max: 75,
  },
  {
    level: Level.Moderate,
    factor: 0.16,
    min: 26,
    max: 50,
  },
  {
    level: Level.ContributesMinimally,
    factor: 0.12,
    min: 0,
    max: 25,
  },
];

export function getConnectivityFactor(rank: number) {
  // find the factor that matches the rank in the array between the min and max values
  const { level, factor } =
    connectivityFactors.find(
      factor => rank >= factor.min && rank <= factor.max,
    ) || connectivityFactors[3];
  return { level, factor };
}

export function getConnectivityCard(
  _: TranslatorType,
  connectivityIndex: number,
): JSX.Element {
  const { level, factor } = getConnectivityFactor(connectivityIndex);
  return (
    <TebuCard
      header={_(msg`Ecological Connectivity Index`)}
      headerTooltip={_(msg`Header Tooltip`)}
      footerLabels={[
        {
          label: _(msg`Factor:`),
          value: factor.toString(),
        },
      ]}
    >
      <ConnectivityBody
        title={_(msg`Ecological Connectivity Index`)}
        description={_(
          msg`This factor is used to calculate the credits issued for this project.`,
        )}
        type={level}
      />
    </TebuCard>
  );
}

const durationFactors = [
  {
    duration: 50,
    factor: 0.2,
  },
  {
    duration: 45,
    factor: 0.19,
  },
  {
    duration: 40,
    factor: 0.18,
  },
  {
    duration: 35,
    factor: 0.17,
  },
  {
    duration: 30,
    factor: 0.16,
  },
  {
    duration: 25,
    factor: 0.14,
  },
  {
    duration: 20,
    factor: 0.12,
  },
];

export function getDurationCard(
  _: TranslatorType,
  duration: string,
  minimumDuration: number,
  maximumDuration: number,
): JSX.Element {
  // parse iso duration string to get the years with regex
  const years = Number(duration.match(/P(\d+)Y/)?.[1]);
  const { factor } =
    durationFactors.find(({ duration }) => years >= duration) ||
    durationFactors[durationFactors.length - 1];

  return (
    <TebuCard
      header={_(msg`Project Duration`)}
      headerTooltip={_(msg`Header Tooltip`)}
      footerLabels={[
        {
          label: _(msg`Factor:`),
          value: factor.toString(),
        },
      ]}
    >
      <DurationBody
        title={`${years} year project duration`}
        minimumValue={minimumDuration}
        maximumValue={maximumDuration}
        minimumLabel="minimum"
        durationUnitLabel="years"
        duration={years}
        tooltip={_(msg`Duration Tooltip`)}
      />
    </TebuCard>
  );
}

const PRESERVATION = 'CONSERVATION';
const RESTORATION = 'ECOSYSTEM_RESTORATION';

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
      headerTooltip={_(msg`Header Tooltip`)}
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

// TODO: update descriptions
const socialCulturalFactors = [
  {
    type: SocialCulturalValueType.VeryHigh,
    factor: 0.2,
    description: msg`The community has political and economic rights to the project`,
  },
  {
    type: SocialCulturalValueType.High,
    factor: 0.18,
    description: msg`The community has political and economic rights to the project`,
  },
  {
    type: SocialCulturalValueType.Medium,
    factor: 0.16,
    description: msg`The community has political and economic rights to the project`,
  },
  {
    type: SocialCulturalValueType.Low,
    factor: 0,
    description: msg`The community has political and economic rights to the project`,
  },
];

export function getSocialCulturalCard(
  _: TranslatorType,
  type: SocialCulturalValueType,
): JSX.Element {
  const { factor, description } =
    socialCulturalFactors.find(factor => factor.type === type) ||
    socialCulturalFactors[3];

  return (
    <TebuCard
      header={_(msg`Social and Cultural Index`)}
      headerTooltip={_(msg`Header Tooltip`)}
      footerLabels={[
        {
          label: _(msg`Factor:`),
          value: factor.toString(),
        },
      ]}
    >
      <SocialCulturalBody
        title={_(msg`Social and Cultural Index`)}
        description={_(description)}
        type={type}
      />
    </TebuCard>
  );
}
