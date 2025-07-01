import { Box, SxProps } from '@mui/material';

import { Theme } from '../../../theme/muiTheme';
import { ImageType } from '../../../types/shared/imageType';
import { sxToArray } from '../../../utils/mui/sxToArray';

export interface Props {
  image: ImageType;
  sx?: SxProps<Theme>;
}

const RoundLogo = ({ image, sx = [] }: Props): JSX.Element => {
  return (
    <Box
      component="img"
      src={image.src || ''}
      alt={image.alt}
      sx={[
        {
          borderRadius: '58px',
          border: theme => `1px solid ${theme.palette.grey[100]}`,
          backgroundColor: 'primary.main',
          width: 58,
          height: 58,
          p: 1,
        },
        ...sxToArray(sx),
      ]}
    />
  );
};

export { RoundLogo };
