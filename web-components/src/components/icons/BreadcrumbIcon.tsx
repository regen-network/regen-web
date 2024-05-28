import { useTheme } from '@mui/material';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import { makeStyles } from 'tss-react/mui';

import { directionRotate } from './ArrowDownIcon';

interface Props {
  className?: string;
  direction?: 'next' | 'prev' | 'down' | 'up';
  onClick?: SvgIconProps['onClick'];
  color?: string;
}

interface StyleProps {
  rotate: string;
}

const useStyles = makeStyles<StyleProps>()((theme, { rotate }) => ({
  root: {
    transform: `rotate(${rotate})`,
  },
}));

export default function BreadcrumbIcon({
  direction = 'down',
  className,
  onClick,
  color,
}: Props): JSX.Element {
  const rotate: string = directionRotate[direction];
  const { classes, cx } = useStyles({ rotate });
  const theme = useTheme();
  color = color || 'currentColor' || theme.palette.secondary.main;

  return (
    <SvgIcon
      fill="none"
      viewBox="0 0 33 20"
      className={cx(className, classes.root)}
      onClick={onClick}
    >
      <rect
        width="4.27533"
        height="23.6375"
        rx="0.25"
        transform="matrix(0.697571 0.716516 -0.697571 0.716516 30.0176 0)"
        fill={color || 'currentColor'}
      />
      <rect
        width="4.27533"
        height="23.6375"
        rx="0.25"
        transform="matrix(-0.697571 0.716516 0.697571 0.716516 2.98236 0)"
        fill={color || 'currentColor'}
      />
    </SvgIcon>
  );
}
