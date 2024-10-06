import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

import { sxToArray } from '../../../../utils/mui/sxToArray';
import {
  activeFill,
  activeStroke,
  AMAZON_PATH,
  ANDEAN_PATH,
  CARIBBEAN_PATH,
  inactiveFill,
  inactiveStroke,
  ORINOCO_PATH,
  PACIFIC_PATH,
  selectedFill,
  selectedStroke,
} from './ColombiaRegionIcon.constants';

export type Region = 'PACIFIC' | 'ORINOCO' | 'CARIBBEAN' | 'AMAZON' | 'ANDEAN';

interface RegionPaths {
  PACIFIC: string;
  ORINOCO: string;
  CARIBBEAN: string;
  AMAZON: string;
  ANDEAN: string;
}

export const regionPaths: RegionPaths = {
  PACIFIC: PACIFIC_PATH,
  ORINOCO: ORINOCO_PATH,
  CARIBBEAN: CARIBBEAN_PATH,
  AMAZON: AMAZON_PATH,
  ANDEAN: ANDEAN_PATH,
};

interface RegionIndicatorIconProps extends SvgIconProps {
  region: Region;
  isSelected?: boolean;
}

const RegionPath = ({
  path,
  fill = inactiveFill,
  stroke = inactiveStroke,
}: {
  path: string;
  fill?: string;
  stroke?: string;
}) => (
  <path
    d={path}
    fill={fill}
    stroke={stroke}
    strokeWidth="0.2"
    strokeLinejoin="round"
  />
);

export default function RegionIndicatorIcon({
  region,
  sx,
  isSelected = false,
  ...props
}: RegionIndicatorIconProps): JSX.Element {
  const activeRegionPath = Object.entries(regionPaths).filter(
    ([key, value]) => key === region,
    // TODO: review this
  )[0][1];
  const otherRegionPaths = Object.entries(regionPaths)
    .filter(([key, value]) => key !== region)
    .map(([_, value]) => value);
  return (
    <SvgIcon
      sx={[
        { color: '#4FB573', mr: 1, width: '30px', height: '30px' },
        ...sxToArray(sx),
      ]}
      width="30"
      height="30"
      viewBox="0 0 30 30"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_1479_22775)">
        {otherRegionPaths.map((path: string, index: number) => (
          <RegionPath key={index} path={path} />
        ))}
        <RegionPath
          path={activeRegionPath}
          fill={isSelected ? selectedFill : activeFill}
          stroke={isSelected ? selectedStroke : activeStroke}
        />
      </g>
      <defs>
        <clipPath id="clip0_1479_22775">
          <rect width="30" height="30" fill="white" />
        </clipPath>
      </defs>
    </SvgIcon>
  );
}
