import { ReactNode } from 'react';
import { Box } from '@mui/material';

import { LinkType } from '../../../types/shared/linkType';

type Props = {
  children: ReactNode;
  link: LinkType;
};

export const LinkWrapper = ({ link, children }: Props) => {
  const hasLink = link.href && link.href !== '';

  return (
    <>
      {hasLink && (
        <Box
          component="a"
          href={link.href}
          target="_blank"
          rel="noreferrer"
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {children}
        </Box>
      )}
      {!hasLink && <>{children}</>}
    </>
  );
};
