import React from 'react';

const description = (
  <span>
    Ecosystem with declining areas, severe degradation, and disrupted processes
    facing a <b>very high collapse risk</b>.
  </span>
);

export const statuses = {
  extinct: {
    meaning: 'rfs:IucnExtinct',
    label: 'Extinct',
    code: 'EX',
    color: '--bc-neutral-400',
  },
  extinctInWild: {
    meaning: 'rfs:IucnExtinctInWild',
    label: 'Extinct in the Wild',
    code: 'EW',
    color: '--bc-neutral-400',
  },
  criticallyEndangered: {
    meaning: 'rfs:IucnCriticallyEndangered',
    label: 'Critically Endangered',
    code: 'CR',
    color: '--bc-red-400',
  },
  endangered: {
    meaning: 'rfs:IucnEndangered',
    label: 'Endangered',
    code: 'EN',
    color: '--bc-orange-400',
  },
  vulnerable: {
    meaning: 'rfs:IucnVulnerable',
    label: 'Vulnerable',
    code: 'VU',
    color: '--bc-yellow-500',
  },
  nearThreatened: {
    meaning: 'rfs:IucnNearThreatened',
    label: 'Near Threatened',
    code: 'NT',
    color: '--bc-yellow-300',
  },
  leastConcern: {
    meaning: 'rfs:IucnLeastConcern',
    label: 'Least Concern',
    code: 'LC',
    color: '--bc-green-400',
  },
  dataDeficient: {
    meaning: 'rfs:IucnDataDeficient',
    label: 'Data Deficient',
    code: 'DD',
    color: '--bc-neutral-400',
  },
  notEvaluated: {
    meaning: 'rfs:IucnNotEvaluated',
    label: 'Not Evaluated',
    code: 'NE',
    color: '--bc-neutral-400',
  },
};

export enum IucnType {
  IucnExtinct = 'IucnExtinct',
  IucnExtinctInWild = 'IucnExtinctInWild',
  IucnCriticallyEndangered = 'IucnCriticallyEndangered',
  IucnEndangered = 'IucnEndangered',
  IucnVulnerable = 'IucnVulnerable',
  IucnNearThreatened = 'IucnNearThreatened',
  IucnLeastConcern = 'IucnLeastConcern',
  IucnDataDeficient = 'IucnDataDeficient',
  IucnNotEvaluated = 'IucnNotEvaluated',
}

const codes = {
  IucnExtinct: 'EX',
  IucnExtinctInWild: 'EW',
  IucnCriticallyEndangered: 'CR',
  IucnEndangered: 'EN',
  IucnVulnerable: 'VU',
  IucnNearThreatened: 'NT',
  IucnLeastConcern: 'LC',
  IucnDataDeficient: 'DD',
  IucnNotEvaluated: 'NE',
};

const colors: Record<string, string> = {
  IucnExtinct: '--bc-neutral-400',
  IucnExtinctInWild: '--bc-neutral-400',
  IucnCriticallyEndangered: '--bc-red-400',
  IucnEndangered: '--bc-orange-400',
  IucnVulnerable: '--bc-yellow-500',
  IucnNearThreatened: '--bc-yellow-300',
  IucnLeastConcern: '--bc-green-400',
  IucnDataDeficient: '--bc-neutral-400',
  IucnNotEvaluated: '--bc-neutral-400',
};

export interface IucnCodeIconProps {
  type: keyof typeof codes;
}

const IucnCodeIcon: React.FC<IucnCodeIconProps> = ({ type }) => {
  return (
    <div
      className="flex items-center justify-center w-[50px] h-[50px] rounded-full text-[18px] font-bold text-bc-neutral-700"
      style={{
        background: `rgba(var(${colors[type]}) / 1)`,
      }}
    >
      {codes[type]}
    </div>
  );
};

export default IucnCodeIcon;
