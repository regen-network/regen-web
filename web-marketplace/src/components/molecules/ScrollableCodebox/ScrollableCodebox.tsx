import { Box, SxProps } from '@mui/material';

import { Theme } from 'web-components/src/theme/muiTheme';

/** simple div to allow display of json data for now */
export const ScrollableCodebox = (props: {
  sx?: SxProps<Theme>;
  code: string;
}): JSX.Element => {
  const { sx = [], code } = props;
  return (
    <Box
      sx={[
        {
          height: 205,
          px: 3,
          width: '100%',
          border: 1,
          borderColor: 'grey.100',
          backgroundColor: 'grey.50',
          borderRadius: '2px',
          color: 'info.dark',
          overflowY: 'scroll',
          overflowX: 'none',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <pre>{code}</pre>
    </Box>
  );
};
