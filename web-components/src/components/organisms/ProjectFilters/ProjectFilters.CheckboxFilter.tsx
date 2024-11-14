import { Box, FormControlLabel } from '@mui/material';
import Checkbox from 'web-components/src/components/inputs/new/CheckBox/Checkbox';

export default function CheckboxFilter({
  icon,
  name,
  isSelected,
  onChange,
}: {
  icon: JSX.Element;
  name: string;
  isSelected: boolean;
  onChange?: () => void;
}) {
  return (
    <FormControlLabel
      control={<Checkbox checked={isSelected} onChange={onChange} />}
      label={
        <Box display="flex" flexWrap="nowrap" alignItems="center">
          {name}
          {icon}
        </Box>
      }
      sx={{ mb: 2, '& .MuiFormControlLabel-label': { fontSize: '14px' } }}
    />
  );
}
