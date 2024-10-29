import React from 'react';

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
  IucnExtinct: '--bc-neutral-700',
  IucnExtinctInWild: '--bc-red-400',
  IucnCriticallyEndangered: '--bc-red-400',
  IucnEndangered: '--bc-orange-400',
  IucnVulnerable: '--bc-yellow-500',
  IucnNearThreatened: '--bc-yellow-300',
  IucnLeastConcern: '--bc-green-400',
  IucnDataDeficient: '--bc-neutral-400',
  IucnNotEvaluated: '--bc-neutral-400',
};

const fontColors: Record<string, string> = {
  IucnExtinct: '--sc-text-over-image',
  IucnExtinctInWild: '--sc-text-header',
  IucnCriticallyEndangered: '--sc-text-header',
  IucnEndangered: '--sc-text-header',
  IucnVulnerable: '--sc-text-header',
  IucnNearThreatened: '--sc-text-header',
  IucnLeastConcern: '--sc-text-header',
  IucnDataDeficient: '--sc-text-header',
  IucnNotEvaluated: '--sc-text-header',
};

export interface IucnCodeIconProps {
  type: keyof typeof codes;
}

const IucnCodeIcon: React.FC<IucnCodeIconProps> = ({ type }) => {
  return (
    <div
      className="flex items-center justify-center w-[50px] h-[50px] rounded-full text-[18px] font-bold"
      style={{
        background: `rgba(var(${colors[type]}) / 1)`,
        color: `rgba(var(${fontColors[type]}) / 1)`,
      }}
    >
      {codes[type]}
    </div>
  );
};

export default IucnCodeIcon;
