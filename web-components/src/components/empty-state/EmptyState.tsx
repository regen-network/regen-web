import { Box, SxProps } from '@mui/material';

import { Theme } from '../../theme/muiTheme';
import { Title } from '../typography';

export interface Props {
  message: string;
  icon?: JSX.Element;
  sx?: SxProps<Theme>;
}

/* Placeholder component that hold best practices.
To be used as a starter to create new components  */
const EmptyState = ({ message, icon, sx = [] }: Props): JSX.Element => (
  <Box
    sx={[
      {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid',
        borderColor: 'grey.100',
        height: 245,
        width: '100%',
        borderRadius: '8px',
        backgroundColor: 'primary.main',
        textAlign: 'center',
        p: 3,
      },
      ...(Array.isArray(sx) ? sx : [sx]),
    ]}
  >
    <Box sx={{ mb: 4 }}>{icon}</Box>
    <Title variant="h4" mobileVariant="h5" as="p">
      {message}
    </Title>
  </Box>
);

export { EmptyState };
