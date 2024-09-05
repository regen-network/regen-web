import React from 'react';
import SvgIcon from '@mui/material/SvgIcon';
import { makeStyles } from 'tss-react/mui';

interface PauseIconProps extends React.HTMLProps<HTMLDivElement> {
  width?: string;
  height?: string;
}

type UseStylesParams = {
  width?: string;
  height?: string;
};

const useStyles = makeStyles<UseStylesParams>()((theme, { height, width }) => ({
  root: {
    width: width || 'inherit',
    height: height || 'inherit',
  },
}));

export default function PlayIcon({
  width,
  height,
  className,
}: PauseIconProps): JSX.Element {
  const { classes, cx } = useStyles({ width, height });

  return (
    <SvgIcon viewBox="0 0 70 70" className={cx(className, classes.root)}>
      <g id="Pause button">
        <circle
          id="Ellipse 3"
          cx="35"
          cy="35"
          r="35"
          fill="white"
          fill-opacity="0.9"
        />
        <path
          id="Union"
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M32 20H25V50H32V20ZM45 20H38V50H45V20Z"
          fill="#4FB573"
        />
      </g>
    </SvgIcon>
  );
}
