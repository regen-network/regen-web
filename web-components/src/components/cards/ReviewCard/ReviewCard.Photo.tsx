import { CardMedia, CardMediaProps } from '@mui/material';

import { sxToArray } from '../../../utils/mui/sxToArray';
import { FileDropBottomBar } from '../../inputs/new/FileDrop/FileDrop.BottomBar';
import Card from '../Card';

const Photo = ({
  src,
  caption,
  credit,
  sx = [],
}: CardMediaProps & { caption?: string; credit?: string }): JSX.Element => {
  return (
    <Card sx={[{ height: [216, 293], position: 'relative' }, ...sxToArray(sx)]}>
      <CardMedia
        sx={{ height: { xs: 216, sm: 293 } }}
        component="img"
        src={src}
      />
      {(caption || credit) && (
        <FileDropBottomBar
          caption={caption}
          credit={credit}
          sx={{ position: 'absolute', bottom: 0 }}
        />
      )}
    </Card>
  );
};

export { Photo };
