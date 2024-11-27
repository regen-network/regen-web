import { ReactElement } from 'react';
import { Box, SxProps } from '@mui/material';

import { Theme } from '../../theme/muiTheme';
import { Title } from '../typography';

export interface Props {
  message: string;
  icon?: JSX.Element;
  sx?: SxProps<Theme>;
  children?: ReactElement;
  className?: string;
}

/* Placeholder component that hold best practices.
To be used as a starter to create new components  */
const EmptyState = ({
  message,
  icon,
  children,
  sx = [],
  className,
}: Props): JSX.Element => (
  <Box
    className={className}
    sx={[
      {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid',
        borderColor: 'grey.100',
        width: '100%',
        borderRadius: '8px',
        backgroundColor: 'primary.main',
        textAlign: 'center',
        pt: [8.5, 9],
        px: 8.5,
        pb: [15, 10.5],
      },
      ...(Array.isArray(sx) ? sx : [sx]),
    ]}
  >
    <Box sx={{ mb: 4 }}>{icon}</Box>
    <Title variant="h4" mobileVariant="h5" as="p">
      {message}
    </Title>
    {children && <Box sx={{ mt: 8 }}>{children}</Box>}
  </Box>
);

export { EmptyState };
