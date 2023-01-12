import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import {
  TextField as TextFieldMUI,
  TextFieldProps as TextFieldPropsMUI,
} from '@mui/material';

type TextFieldProps = {
  name: string;
} & TextFieldPropsMUI;

const TextField: FC<TextFieldProps> = ({ name, ...otherProps }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      defaultValue=""
      render={({ field }) => (
        <TextFieldMUI
          {...otherProps}
          {...field}
          error={!!errors[name]}
          helperText={errors[name] ? (errors[name]?.message as string) : ''}
        />
      )}
    />
  );
};

export default TextField;
