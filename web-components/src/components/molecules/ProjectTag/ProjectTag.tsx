import { Box, SxProps } from '@mui/material';

import { Theme } from '../../../theme/muiTheme';
import { sxToArray } from '../../../utils/mui/sxToArray';
import { ProjectTagType } from './ProjectTag.types';

export interface Props {
  tag: ProjectTagType;
  sx?: SxProps<Theme>;
}

const ProjectTag = ({ tag, sx = [] }: Props): JSX.Element => {
  const { icon, name } = tag;

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
          maxWidth: 180,
          backgroundColor: 'primary.main',
        },
        ...sxToArray(sx),
      ]}
    >
      {icon.src && (
        <Box
          component="img"
          src={icon.src}
          alt={icon.alt}
          sx={{
            width: { xs: 30, sm: 40 },
            height: { xs: 30, sm: 40 },
            mr: 2.5,
          }}
        />
      )}
      <Box sx={{ fontWeight: 700, fontSize: { xs: 12, sm: 14 } }}>{name}</Box>
    </Box>
  );
};

export { ProjectTag };
