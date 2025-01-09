import { isValidElement } from 'react';
import { Box, SxProps } from '@mui/material';

import { Theme } from '../../../theme/muiTheme';
import { sxToArray } from '../../../utils/mui/sxToArray';
import { isImageType, ProjectTagType } from './ProjectTag.types';

export interface Props {
  tag: ProjectTagType;
  sx?: SxProps<Theme>;
  onClick?: () => void;
  fontSize?: any;
}

const ProjectTag = ({
  tag,
  sx = [],
  onClick,
  fontSize = { xs: 12, sm: 14 },
}: Props): JSX.Element => {
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
      onClick={onClick}
    >
      {icon && isImageType(icon) && (
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
      {isValidElement(icon) && icon}
      <Box sx={{ fontWeight: 700, fontSize }}>{name}</Box>
    </Box>
  );
};

export { ProjectTag };
