import ArrowDownIcon from '../../ArrowDownIcon';

export enum Level {
  HighlySignificant = 'HighlySignificant',
  Significant = 'Significant',
  Moderate = 'Moderate',
  ContributesMinimally = 'ContributesMinimally',
}

export interface EcologicalConnectivityLevelIconProps {
  level: Level;
}

const config = {
  HighlySignificant: {
    meaning: 'rfs:HighlySignificant',
    label: 'Highly Significant',
    color: '--bc-green-500',
    rotation: '180deg',
  },
  Significant: {
    meaning: 'rfs:Significant',
    label: 'Significant',
    color: '--bc-green-400',
    rotation: '180deg',
  },
  Moderate: {
    meaning: 'rfs:Moderate',
    label: 'Moderate',
    color: '--bc-yellow-500',
    rotation: '-90deg',
  },
  ContributesMinimally: {
    meaning: 'rfs:ContributesMinimally',
    label: 'Contributes Minimally',
    color: '--bc-orange-400',
    rotation: '0deg',
  },
};

export const EcologicalConnectivityLevelIcon = ({
  level,
}: EcologicalConnectivityLevelIconProps) => {
  const { color, rotation } = config[level];
  return (
    <div
      style={{
        transform: `rotate(${rotation})`,
        background: `rgba(var(${color}) / 1)`,
      }}
      className="flex items-center justify-center w-[50px] h-[50px] rounded-full text-[18px] font-bold text-bc-neutral-700"
    >
      <ArrowDownIcon className="w-[24px] h-[24px]" />
    </div>
  );
};

export default EcologicalConnectivityLevelIcon;
