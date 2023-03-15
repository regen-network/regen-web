import { Box } from '@mui/material';

import EditIcon from '../../../../components/icons/EditIcon';

type Props = {
  value: string;
};

export const ImageFieldBackground = ({ value }: Props) => (
  <Box
    sx={{
      position: 'relative',
      background: `url(${value})`,
      backgroundSize: 'cover',
      width: '100%',
      height: 120,
      border: theme => `2px solid ${theme.palette.info.light}`,
      borderRadius: '5px',
    }}
  >
    <Box
      sx={{
        top: 10,
        right: 10,
        position: 'absolute',
        bgcolor: 'primary.main',
        borderRadius: 9999,
        width: 40,
        height: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <EditIcon sx={{ fontSize: 20 }} />
    </Box>
  </Box>
);
