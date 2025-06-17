import { MessageDescriptor } from '@lingui/core';
import { msg } from '@lingui/core/macro';
import { Trans } from '@lingui/react/macro';

import { Level } from 'web-components/src/components/icons/terrasos/EcologicalConnectivityLevelIcon/EcologicalConnectivityLevelIcon';
import { IucnType } from 'web-components/src/components/icons/terrasos/IucnRedCodeIcon';
import { SocialCulturalValueType } from 'web-components/src/components/icons/terrasos/SocialCulturalValueIcon';

import { IucnStatus } from 'lib/db/types/json-ld';

const titles = {
  IucnExtinct: msg`Extinct`,
  IucnExtinctInWild: msg`Extinct In Wild`,
  IucnCriticallyEndangered: msg`Critically Endangered`,
  IucnEndangered: msg`Endangered`,
  IucnVulnerable: msg`Vulnerable`,
  IucnNearThreatened: msg`Near Threatened`,
  IucnLeastConcern: msg`Least Concern`,
  IucnDataDeficient: msg`Data Deficient`,
  IucnNotEvaluated: msg`Not Evaluated`,
};

export type IucnMapType = Record<
  IucnStatus,
  {
    title: MessageDescriptor;
    type: IucnType;
    factor: string | number;
    description: JSX.Element;
  }
>;
export const iucnFactors: IucnMapType = {
  EXTINCT: {
    title: titles[IucnType.IucnExtinct],
    type: IucnType.IucnExtinct,
    factor: 'n/a',
    description: (
      <Trans>
        A taxon is extinct when there is no reasonable doubt that the last
        individual has died.
      </Trans>
    ),
  },
  EXTINCT_IN_WILD: {
    title: titles[IucnType.IucnExtinctInWild],
    type: IucnType.IucnExtinctInWild,
    factor: 'n/a',
    description: (
      <Trans>
        A taxon is extinct in the wild when it is known only to survive in
        cultivation, in captivity or as a naturalized population (or
        populations) well outside the past range.
      </Trans>
    ),
  },
  CRITICALLY_ENDANGERED: {
    title: titles[IucnType.IucnCriticallyEndangered],
    type: IucnType.IucnCriticallyEndangered,
    factor: 0.2,
    description: (
      <Trans>
        Ecosystem with declining areas, severe degradation, and disrupted
        processes facing an <strong>extremely high collapse risk</strong>.
      </Trans>
    ),
  },
  ENDANGERED: {
    title: titles[IucnType.IucnEndangered],
    type: IucnType.IucnEndangered,
    factor: 0.18,
    description: (
      <Trans>
        Ecosystems where information about the levels of environmental
        degradation and disruption of biotic processes indicate that there is a
        <strong>very high risk of collapse</strong>.
      </Trans>
    ),
  },
  VULNERABLE: {
    title: titles[IucnType.IucnVulnerable],
    type: IucnType.IucnVulnerable,
    factor: 0.16,
    description: (
      <Trans>
        An ecosystem considered to be facing a{' '}
        <strong>high risk of collapse</strong>.
      </Trans>
    ),
  },
  NEAR_THREATENED: {
    title: titles[IucnType.IucnNearThreatened],
    type: IucnType.IucnNearThreatened,
    factor: 0.12,
    description: (
      <Trans>
        Ecosystem that does not qualify for Critically Endangered, Endangered,
        or Vulnerable, but{' '}
        <strong>
          likely to qualify for a threatened category in the near future.
        </strong>
      </Trans>
    ),
  },
  LEAST_CONCERN: {
    title: titles[IucnType.IucnLeastConcern],
    type: IucnType.IucnLeastConcern,
    factor: 0.12,
    description: (
      <Trans>
        Ecosystems that unequivocally do not meet any of the criteria for the
        threat categories.
      </Trans>
    ),
  },
  DATA_DEFICIENT: {
    title: titles[IucnType.IucnDataDeficient],
    type: IucnType.IucnDataDeficient,
    factor: 0.12,
    description: (
      <Trans>
        An ecosystem has insufficient data when there is{' '}
        <strong>
          no adequate information to make a direct or indirect assessment
        </strong>{' '}
        of its risk of collapse.
      </Trans>
    ),
  },
  NOT_EVALUATED: {
    title: titles[IucnType.IucnNotEvaluated],
    type: IucnType.IucnNotEvaluated,
    factor: 'n/a',
    description: (
      <Trans>
        Ecosystems that have not yet been assessed. For these cases, the
        Protocol proposes an alternative that allows describing the conditions
        of the territory.
      </Trans>
    ),
  },
};

export const connectivityFactors = [
  {
    level: Level.HighlySignificant,
    factor: 0.2,
    min: 75,
    max: 100.1,
    title: msg`Highly significant`,
  },
  {
    level: Level.Significant,
    factor: 0.18,
    min: 50,
    max: 75,
    title: msg`Significant`,
  },
  {
    level: Level.Moderate,
    factor: 0.16,
    min: 25,
    max: 50,
    title: msg`Moderate`,
  },
  {
    level: Level.ContributesMinimally,
    factor: 0.12,
    min: 0,
    max: 25,
    title: msg`Contributes minimally`,
  },
];

export const durationFactors = [
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

// TODO: update descriptions
export const socialCulturalFactors = [
  {
    type: SocialCulturalValueType.VeryHigh,
    title: msg`Very high`,
    factor: 0.2,
    description: msg`The community has political and economic rights to the project.`,
  },
  {
    type: SocialCulturalValueType.High,
    title: msg`High`,
    factor: 0.18,
    description: msg`The community has economic rights to the project.`,
  },
  {
    type: SocialCulturalValueType.Medium,
    title: msg`Medium`,
    factor: 0.16,
    description: msg`The community participates in the construction of the project's Management Plan, reflected in binding actions.`,
  },
  {
    type: SocialCulturalValueType.Low,
    title: msg`Low`,
    factor: 0,
    description: msg`There is no community involvement in the construction of the project's Management Plan.`,
  },
];

export const PRESERVATION = 'CONSERVATION';
export const RESTORATION = 'ECOSYSTEM_RESTORATION';
export const DEFAULT_DURATION_TOOLTIP = msg`Eligible projects implement preservation and/or restoration activities in different proportion/rates. Tebu recognizes restoration activities have a higher cost by assigning a greater value to restoration actions.`;
export const V4_DURATION_TOOLTIP = msg`Credits issuance is calculated based on a weighted scale between 20 and 50 years.`;
