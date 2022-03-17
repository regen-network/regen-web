import React from 'react';
import { useTheme } from '@mui/styles';
import { SxProps } from '@mui/material';

import { Label } from '../label';
import OutlinedButton from '../buttons/OutlinedButton';
import ArrowDownIcon from '../icons/ArrowDownIcon';
import { Theme } from '../../theme/muiTheme';

interface Props {
  sx?: SxProps<Theme>;
  onClick: () => void;
  expanded?: boolean;
  text?: string;
}

const ExpandButton: React.FC<Props> = ({ onClick, expanded, text, sx }) => {
  const theme = useTheme<Theme>();

  return (
    <OutlinedButton
      onClick={onClick}
      sx={{
        ...sx,
        border: 'none !important',
      }}
      endIcon={
        expanded ? (
          <ArrowDownIcon direction="up" color={theme.palette.secondary.main} />
        ) : (
          <ArrowDownIcon
            direction="down"
            color={theme.palette.secondary.main}
          />
        )
      }
    >
      <Label sx={{ fontSize: { xs: '14px', sm: '18px' } }}>
        {`${text || 'read'} ${expanded ? 'less' : 'more'}`}
      </Label>
    </OutlinedButton>
  );
};

export { ExpandButton };
