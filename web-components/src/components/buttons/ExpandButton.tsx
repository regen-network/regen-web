import React from 'react';
import { ButtonProps, useTheme } from '@mui/material';

import OutlinedButton from '../buttons/OutlinedButton';
import ArrowDownIcon from '../icons/ArrowDownIcon';
import type { Theme } from '../../theme/muiTheme';

interface Props extends ButtonProps {
  expanded?: boolean;
  text?: string;
}

const ExpandButton: React.FC<Props> = ({
  expanded,
  sx,
  text = 'read',
  ...buttonProps
}) => {
  const theme = useTheme<Theme>();

  return (
    <OutlinedButton
      {...buttonProps}
      size={buttonProps.size || 'medium'}
      sx={{
        border: 'none !important',
        ...sx,
      }}
      endIcon={
        <ArrowDownIcon
          direction={expanded ? 'up' : 'down'}
          color={theme.palette.secondary.main}
        />
      }
    >
      {`${text} ${expanded ? 'less' : 'more'}`}
    </OutlinedButton>
  );
};

export { ExpandButton };
