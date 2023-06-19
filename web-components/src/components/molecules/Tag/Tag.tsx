import { Box, SxProps } from '@mui/material';

import { Theme } from '../../../theme/muiTheme';
import { ImageType } from '../../../types/shared/imageType';
import { sxToArray } from '../../../utils/mui/sxToArray';

export interface Props {
  icon: ImageType;
  label: string;
  sx?: SxProps<Theme>;
}

const Tag = ({ icon, label, sx = [] }: Props): JSX.Element => {
  return (
    <Box
      sx={[
        {
          border: theme => `1px solid ${theme.palette.grey[100]}`,
          borderRadius: '40px',
          display: 'flex',
          alignItems: 'center',
          padding: '5px 15px 5px 10px',
          width: 'fit-content',
        },
        ...sxToArray(sx),
      ]}
    >
      <Box
        component="img"
        src={icon.src}
        alt={icon.alt}
        sx={{ width: { xs: 30, sm: 40 }, height: { xs: 30, sm: 40 }, mr: 2.5 }}
      />
      <Box sx={{ fontWeight: 700, fontSize: { xs: 12, sm: 14 } }}>{label}</Box>
    </Box>
  );
};

export { Tag };
