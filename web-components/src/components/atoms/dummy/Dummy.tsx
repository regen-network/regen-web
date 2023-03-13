import { Box, SxProps } from '@mui/material';

import { sxToArray } from 'src/utils/mui/sxToArray';

import { Theme } from '../../../theme/muiTheme';

export interface Props {
  label: string;
  sx?: SxProps<Theme>;
}

/* Placeholder component that hold best practices.
To be used as a starter to create new components  */
const Dummy = ({ label, sx = [] }: Props): JSX.Element => {
  return <Box sx={[...(Array.isArray(sx) ? sx : [sx])]}>{label}</Box>;
};

export { Dummy };
