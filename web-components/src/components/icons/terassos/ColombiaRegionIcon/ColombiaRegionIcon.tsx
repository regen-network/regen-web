import SvgIcon from '@mui/material/SvgIcon';
import classNames from 'classnames';

import { sxToArray } from '../../../../utils/mui/sxToArray';
import {
  activeFill,
  activeStroke,
  regionPaths,
  selectedFill,
  selectedStroke,
} from './ColombiaRegionIcon.constants';
import RegionPath from './ColombiaRegionIcon.RegionPath';
import { RegionIndicatorIconProps } from './ColombiaRegionIcon.types';

export default function RegionIndicatorIcon({
  region,
  sx,
  isSelected = false,
  className,
  ...props
}: RegionIndicatorIconProps): JSX.Element {
  const activeRegionPath = Object.entries(regionPaths).filter(
    ([key, _]) => key === region,
  )[0][1];
  const otherRegionPaths = Object.entries(regionPaths)
    .filter(([key, _]) => key !== region)
    .map(([_, value]) => value);
  return (
    <SvgIcon
      sx={sx}
      className={classNames('mr-1 w-[30px] h-[30px]', className)}
      width="30"
      height="30"
      viewBox="0 0 30 30"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_1479_22775)">
        {otherRegionPaths.map((path: string, index: number) => (
          <RegionPath key={index} pathData={path} />
        ))}
        <RegionPath
          pathData={activeRegionPath}
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
