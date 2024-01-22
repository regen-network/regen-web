import { forwardRef } from 'react';
import { Link as MuiLink } from '@mui/material';
import Link from 'next/link';

import { LinkProps } from 'web-components/src/components/tabs/IconTabs';
import { getLinkTarget } from 'web-components/src/utils/linkTarget';

import { isInternalLink } from '@/lib/utils/sanity/button';

type Props = LinkProps;

export const LinkComponent = forwardRef<HTMLAnchorElement, Props>(
  ({ children, ...linkProps }, ref) => (
    <MuiLink
      target={getLinkTarget(!isInternalLink(linkProps.href))}
      component={Link}
      ref={ref}
      {...linkProps}
    >
      {children}
    </MuiLink>
  ),
);

LinkComponent.displayName = 'LinkComponent';
