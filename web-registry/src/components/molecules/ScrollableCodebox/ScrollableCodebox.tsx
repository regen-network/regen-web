import { SxProps, Box } from '@mui/material';
import { Theme } from 'web-components/lib/theme/muiTheme';

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
      <pre>
        {code}
        {/* <code>{code}</code> */}
      </pre>
    </Box>
  );
};
