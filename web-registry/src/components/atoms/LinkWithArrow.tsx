import React from 'react';
import { SxProps } from '@mui/system';

import SmallArrowIcon from 'web-components/lib/components/icons/SmallArrowIcon';
import { Theme } from 'web-components/lib/theme/muiTheme';
import { parseText } from 'web-components/lib/utils/textParser';

import { Link } from './Link';

export interface LinkWithArrowProps {
  sx?: SxProps<Theme>;
  href: string;
  label: string | JSX.Element;
  className?: string;
  target?: '_blank' | '_self';
}

const LinkWithArrow: React.FC<LinkWithArrowProps> = ({
  sx,
  href,
  label,
  className,
  target,
}) => {
  const defaultTarget = href?.startsWith('/') ? '_self' : '_blank';
  return (
    <Link
      href={href}
      className={className}
      sx={{
        color: 'info.dark',
        ...sx,
      }}
      target={target || defaultTarget}
      rel="noreferrer"
    >
      {parseText(label)}
      {href && <SmallArrowIcon sx={{ ml: 2, mb: 0.3, height: 9, width: 13 }} />}
    </Link>
  );
};

export { LinkWithArrow };
