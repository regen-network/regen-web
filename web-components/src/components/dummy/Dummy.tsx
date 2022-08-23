import { Box, SxProps } from '@mui/material';

import { Theme } from '../../theme/muiTheme';
import { DummyVariant } from './Dummy.types';
import { DummyVariantSizeMapping } from './Dummy.utils';

export interface Props {
  label: string;
  variant: DummyVariant;
  sx?: SxProps<Theme>;
}

/* Placeholder component that hold best practices.
To be used as a starter to create new components  */
const Dummy = ({ label, variant, sx = [] }: Props): JSX.Element => {
  return (
    <Box sx={[...(Array.isArray(sx) ? sx : [sx])]}>
      <Box sx={{ fontSize: DummyVariantSizeMapping[variant] }}>{label}</Box>
    </Box>
  );
};

export { Dummy };
