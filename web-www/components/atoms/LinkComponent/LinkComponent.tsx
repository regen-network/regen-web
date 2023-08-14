import { PropsWithChildren } from 'react';
import { Link as MuiLink } from '@mui/material';
import Link from 'next/link';

import { LinkProps } from 'web-components/lib/components/tabs/IconTabs';
import { getLinkTarget } from 'web-components/lib/utils/linkTarget';

import { isInternalLink } from '@/lib/utils/sanity/button';

type Props = LinkProps & PropsWithChildren;

export const LinkComponent = ({ children, ...linkProps }: Props) => (
  <MuiLink
    target={getLinkTarget(!isInternalLink(linkProps.href))}
    component={Link}
    {...linkProps}
  >
    {children}
  </MuiLink>
);
