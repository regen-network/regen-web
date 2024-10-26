import React from 'react';
import cn from 'classnames';

export enum SocialCulturalValueType {
  VeryHigh = 'VeryHigh',
  High = 'High',
  Medium = 'Medium',
  Low = 'Low',
}

export interface SocialCulturalValueIconProps {
  type: SocialCulturalValueType;
}

const getClassNames = (
  type: SocialCulturalValueType,
  valueType: SocialCulturalValueType,
  colorClass: string,
) => {
  return cn('w-[34px] h-[10px]', {
    [colorClass]: type === valueType,
    'bg-ac-neutral-200': type !== valueType,
  });
};

const SocialCulturalValueIcon: React.FC<SocialCulturalValueIconProps> = ({
  type,
}) => {
  return (
    <div className="flex flex-col space-y-2 gap-[2px]">
      <div
        className={getClassNames(
          type,
          SocialCulturalValueType.VeryHigh,
          'bg-bc-green-500',
        )}
      ></div>
      <div
        className={getClassNames(
          type,
          SocialCulturalValueType.High,
          'bg-bc-green-400',
        )}
      ></div>
      <div
        className={getClassNames(
          type,
          SocialCulturalValueType.Medium,
          'bg-bc-yellow-500',
        )}
      ></div>
      <div
        className={getClassNames(
          type,
          SocialCulturalValueType.Low,
          'bg-bc-red-400',
        )}
      ></div>
    </div>
  );
};

export default SocialCulturalValueIcon;
