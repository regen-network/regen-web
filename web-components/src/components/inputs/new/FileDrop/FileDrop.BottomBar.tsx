import { Box, SxProps } from '@mui/material';

import { Body } from '../../../typography';
import { Theme } from '../../../../theme/muiTheme';
import { sxToArray } from '../../../../utils/mui/sxToArray';
import { PHOTO_CREDIT } from './FileDrop.constants';

type Props = {
  caption?: string;
  credit?: string;
  sx?: SxProps<Theme>;
};

export const ImageDropBottomBar = ({ caption, credit, sx = [] }: Props) => (
  <Body
    size="sm"
    mobileSize="sm"
    sx={[
      {
        color: 'primary.main',
        width: '100%',
        cursor: 'pointer',
        background: 'rgba(0, 0, 0, 0.7);',
        borderRadius: '0px 0px 4px 4px',
        py: 2.5,
        px: 5,
      },
      ...sxToArray(sx),
    ]}
  >
    {(caption || credit) && (
      <Box sx={{ display: 'inline-block', mr: 0.5 }}>
        {caption && (
          <Box component="span" sx={{ mr: 1 }}>
            {caption}
          </Box>
        )}
        {credit && (
          <Box
            component="span"
            sx={{ fontWeight: 300 }}
          >{`${PHOTO_CREDIT}: ${credit}`}</Box>
        )}
      </Box>
    )}
  </Body>
);
