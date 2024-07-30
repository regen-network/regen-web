import SvgIcon from '@mui/material/SvgIcon';

import { cn } from '../../utils/styles/cn';

interface IconProps {
  className?: string;
  disabled?: boolean;
}

export default function UncheckedIcon({
  className,
  disabled,
}: IconProps): JSX.Element {
  return (
    <SvgIcon
      viewBox="0 0 20 20"
      className={cn(disabled ? 'text-grey-300' : 'text-grey-0', className)}
    >
      <rect
        x="0.5"
        y="0.5"
        width="19"
        height="19"
        rx="0.5"
        fill={'currentColor'}
        stroke="#D2D5D9"
      />
    </SvgIcon>
  );
}
