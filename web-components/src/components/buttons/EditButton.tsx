import { SxProps } from '@mui/material';
import { Theme } from '~/theme/muiTheme';
import OutlinedButton from '../buttons/OutlinedButton';
import EditIcon from '../icons/EditIcon';
import { Label } from '../typography';
import { TextButton } from './TextButton';

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

export const EditButton2 = ({
  onClick,
  sx = [],
}: {
  onClick: () => void;
  sx?: SxProps<Theme>;
}): JSX.Element => {
  return (
    <TextButton
      sx={[
        {
          color: 'info.dark',
          maxWidth: '100px',
          display: 'flex',
          flexWrap: 'nowrap',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      textSize="sm"
      onClick={onClick}
      startIcon={<EditIcon sx={{ height: 13 }} />}
    >
      Edit
    </TextButton>
  );
};

export { EditButton };
