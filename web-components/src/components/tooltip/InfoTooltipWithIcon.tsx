import { SxProps, TooltipProps } from '@mui/material';

import { Theme } from '../../theme/muiTheme';
import { cn } from '../../utils/styles/cn';
import InfoIcon from '../icons/InfoIcon';
import InfoIconOutlined from '../icons/InfoIconOutlined';
import InfoTooltip from './InfoTooltip';

interface Props {
  title: TooltipProps['title'];
  outlined?: boolean;
  sx?: SxProps<Theme>;
  className?: string;
  containerClassName?: string;
  placement?: TooltipProps['placement'];
  children?: JSX.Element;
}

export default function InfoTooltipWithIcon({
  title,
  outlined,
  sx,
  className = '',
  placement = 'top',
  containerClassName,
  children,
}: Props): JSX.Element {
  return (
    <InfoTooltip arrow placement={placement} title={title}>
      <div
        className={cn('cursor-pointer inline-flex', containerClassName)}
        data-testid="info-tooltip"
      >
        {outlined ? (
          <InfoIconOutlined sx={sx} className={className} />
        ) : (
          <InfoIcon sx={sx} className={className} />
        )}
        {children}
      </div>
    </InfoTooltip>
  );
}
