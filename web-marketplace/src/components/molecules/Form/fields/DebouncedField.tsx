import { useEffect, useState } from 'react';
import { Box } from '@mui/material';

import TextField from 'web-components/src/components/inputs/new/TextField/TextField';
import { RegenTextFieldProps } from 'web-components/src/components/inputs/new/TextField/TextField.types';

import { UseStateSetter } from 'types/react/use-state';

import { useDebounce } from 'components/organisms/RolesForm/hooks/useDebounce';

interface Props extends RegenTextFieldProps {
  value: string;
  startAdornment?: string;
  setValue: (value: string) => void;
  setDebouncedValue: UseStateSetter<string>;
}

export const DebouncedField = ({
  value,
  startAdornment,
  setValue,
  setDebouncedValue,
  ...props
}: Props) => {
  const [inputValue, setInputValue] = useState<string>(value || '');
  const debouncedValue = useDebounce(inputValue);

  useEffect(
    () => setDebouncedValue(debouncedValue),
    [debouncedValue, setDebouncedValue],
  );

  return (
    <>
      <TextField
        {...props}
        value={value}
        onChange={event => {
          if (event) {
            event.stopPropagation();
            setValue(event.target.value);
            setInputValue(event.target.value);
          }
        }}
        startAdornment={
          startAdornment && (
            <Box
              sx={{
                color: 'info.main',
                backgroundColor: 'info.light',
                borderRadius: '2px 0px 0px 2px',
                border: '1px solid',
                borderLeft: 0,
                borderColor: 'grey.100',
                fontSize: 14,
                fontWeight: 400,
                height: 60,
                paddingX: 3.75,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {startAdornment}
            </Box>
          )
        }
        sx={{
          '& > .MuiInputBase-root': startAdornment
            ? {
                paddingLeft: 0,
              }
            : {},
        }}
      />
    </>
  );
};
