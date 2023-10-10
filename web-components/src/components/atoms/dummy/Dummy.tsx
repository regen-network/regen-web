import { Box, SxProps } from '@mui/material';

import { Theme } from '../../../theme/muiTheme';
import { sxToArray } from '../../../utils/mui/sxToArray';

export interface Props {
  label: string;
  className?: string;
  sx?: SxProps<Theme>;
}

/* Placeholder component that hold best practices.
To be used as a starter to create new components  */
export const Dummy = ({ label, className, sx = [] }: Props): JSX.Element => {
  return (
    <Box sx={[...sxToArray(sx)]} className={className}>
      {label}
    </Box>
  );
};
