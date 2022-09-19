import { SxProps } from '@mui/material';

export const tableStyles = {
  ellipsisColumn: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: 'block',
    maxWidth: '125px',
  } as SxProps,
  ellipsisContentColumn: {
    whiteSpace: 'nowrap',
    display: 'block',
    maxWidth: '125px',
    '& p': {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  } as SxProps,
};
