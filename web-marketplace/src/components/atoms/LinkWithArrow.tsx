import React from 'react';
import { Box } from '@mui/material';
import { SxProps } from '@mui/system';
import { sxToArray } from 'utils/mui/sxToArray';

import SmallArrowIcon from 'web-components/src/components/icons/SmallArrowIcon';
import { Theme } from 'web-components/src/theme/muiTheme';
import { parseText } from 'web-components/src/utils/textParser';

import { Link } from './Link';

export interface LinkWithArrowProps {
  sx?: SxProps<Theme>;
  href?: string | null;
  label: string | JSX.Element;
  className?: string;
  target?: '_blank' | '_self';
}

const LinkWithArrow: React.FC<React.PropsWithChildren<LinkWithArrowProps>> = ({
  sx,
  href,
  label,
  className,
  target,
}) => {
  const defaultTarget =
    !!href && typeof href === 'string' && href.startsWith('/')
      ? '_self'
      : '_blank';

  return (
    <>
      {!!href ? (
        <Link
          href={href}
          className={className}
          sx={sxToArray(sx)}
          target={target || defaultTarget}
          rel="noreferrer"
        >
          {parseText(label)}
          <SmallArrowIcon sx={{ ml: 2, mb: 0.3, height: 9, width: 13 }} />
        </Link>
      ) : (
        <Box className={className} sx={sxToArray(sx)}>
          {parseText(label)}
        </Box>
      )}
    </>
  );
};

export { LinkWithArrow };
