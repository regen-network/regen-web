import { inactiveFill, inactiveStroke } from './ColombiaRegionIcon.constants';

export default function RegionPath({
  pathData,
  fill,
  stroke,
}: {
  pathData: string;
  fill?: string;
  stroke?: string;
}) {
  fill = fill ?? inactiveFill;
  stroke = stroke ?? inactiveStroke;

  return (
    <path
      d={pathData}
      fill={fill}
      stroke={stroke}
      strokeWidth="0.2"
      strokeLinejoin="round"
    />
  );
}
