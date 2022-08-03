import React from 'react';

import OutlinedButton from '../buttons/OutlinedButton';
import EditIcon from '../icons/EditIcon';
import { Label } from '../typography';

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
