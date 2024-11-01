import React from 'react';
import cn from 'classnames';

import InfoIconOutlined from '../../icons/InfoIconOutlined';
import InfoTooltip from '../../tooltip/InfoTooltip';
import DashedLine from './TebuCard.Duration.DashedLine';

interface TebuCardDurationProps {
  duration: number;
  title: string;
  minimumValue: number;
  maximumValue: number;
  minimumLabel: string;
  durationUnitLabel: string;
  tooltip?: string;
  maximumPrefix?: string;
}



const TebuCardDuration: React.FC<TebuCardDurationProps> = ({
  title,
  duration,
  minimumValue,
  maximumValue,
  minimumLabel,
  durationUnitLabel,
  tooltip,
  maximumPrefix,
}) => {
  return (
    <div className="mb-[10px]">
      <div className="text-[16px] font-[700] mb-[10px]">{title}</div>
      <div className="relative">
        <div className="mb-[12px] relative h-[14px] bg-bc-neutral-200 rounded-full">
          <div
            className={cn('absolute h-full rounded-tl-full rounded-bl-full', {
              'rounded-tr-full rounded-br-full': duration >= maximumValue,
              'bg-bc-green-500': duration >= maximumValue,
              'bg-bc-green-400':
                duration > minimumValue && duration < maximumValue,
              'bg-bc-yellow-500': duration <= minimumValue,
            })}
            style={{
              width: `${Math.min(duration / maximumValue, 1) * 100}%`,
            }}
          />
          <DashedLine
            className="absolute top-0"
            height={26}
            style={{
              left: `${(minimumValue / maximumValue) * 100}%`,
            }}
          />
          <DashedLine className="absolute top-full right-0" height={12} />
        </div>
        <div className="relative w-full h-[2em] top-0">
          <div
            className="absolute text-[12px] text-right"
            style={{
              right: `${(1 - minimumValue / maximumValue) * 100}%`,
            }}
          >
            <div>
              {minimumValue} {durationUnitLabel}
            </div>
            <div>{minimumLabel}</div>
          </div>
          <div className="absolute text-[12px] text-right right-0">
            <div>
              {maximumPrefix}
              {maximumValue} {durationUnitLabel}
            </div>
            <div>
              {tooltip && (
                <InfoTooltip
                  title={tooltip || ''}
                  sx={{ ml: 2 }}
                  arrow
                  placement="bottom"
                >
                  <div className="cursor-pointer m-0">
                    <InfoIconOutlined className="-mb-3 w-[17px] h-[17px]" />
                  </div>
                </InfoTooltip>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TebuCardDuration;
