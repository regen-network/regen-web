<<<<<<< HEAD
import React from 'react';
=======
import { SxProps } from '@mui/material';
>>>>>>> 92528156 (David/eslint simple import sort (#1075))

import OutlinedButton from '../buttons/OutlinedButton';
import EditIcon from '../icons/EditIcon';
import { Label } from '../typography';

import { Theme } from '~/theme/muiTheme';

interface ButtonProps {
  onClick: () => void;
}

function EditButton({ onClick }: ButtonProps): JSX.Element {
  return (
    <OutlinedButton
      size="small"
      sx={{
        border: 'none',
        maxWidth: '100px',
        alignSelf: 'flex-end',
      }}
      onClick={onClick}
      startIcon={<EditIcon sx={{ height: 13, width: 13 }} />}
    >
      <Label size="sm" sx={{ color: 'info.dark' }}>
        Edit
      </Label>
    </OutlinedButton>
  );
}

export { EditButton };
