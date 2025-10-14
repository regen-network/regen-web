import { Box, FormControlLabel } from '@mui/material';
import Checkbox from 'web-components/src/components/inputs/new/CheckBox/Checkbox';

export default function CheckboxFilter({
  startIcon,
  endIcon,
  name,
  isSelected,
  onChange,
  disabled,
}: {
  startIcon?: JSX.Element;
  endIcon?: JSX.Element;
  name: string | JSX.Element;
  isSelected: boolean;
  onChange?: () => void;
  disabled?: boolean;
}) {
  return (
    <FormControlLabel
      disabled={disabled}
      className="ml-0 mb-[12px]"
      control={
        <Checkbox
          checked={isSelected}
          onChange={onChange}
          className="p-0 pr-[13px]"
        />
      }
      label={
        <Box display="flex" flexWrap="nowrap" alignItems="center">
          <span className="flex mr-5">{startIcon}</span>
          {name}
          <span className="flex ml-5">{endIcon}</span>
        </Box>
      }
      sx={{ mb: 2, '& .MuiFormControlLabel-label': { fontSize: '14px' } }}
    />
  );
}
