import { CardMedia, CardMediaProps } from '@mui/material';

import { sxToArray } from '../../../utils/mui/sxToArray';
import Card from '../Card';

const Photo = ({ src, sx = [] }: CardMediaProps): JSX.Element => {
  return (
    <Card sx={[{ height: [216, 293] }, ...sxToArray(sx)]}>
      <CardMedia
        sx={{ height: { xs: 216, sm: 293 } }}
        component="img"
        src={src}
      />
    </Card>
  );
};

export { Photo };
