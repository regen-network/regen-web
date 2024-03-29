import { ComponentProps, MutableRefObject, useImperativeHandle } from 'react';
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  UseFormReturn,
} from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { Box, SxProps } from '@mui/material';
import { sxToArray } from 'utils/mui/sxToArray';

import { Theme } from 'web-components/src/theme/muiTheme';

import { IS_DEV } from 'lib/env';

export type FormRef = MutableRefObject<
  | { submitForm: (draft?: boolean) => void; isFormValid: () => boolean }
  | undefined
>;

interface Props<T extends FieldValues>
  extends Omit<ComponentProps<'form'>, 'onSubmit'> {
  form: UseFormReturn<T>;
  onSubmit?: SubmitHandler<T>;
  sx?: SxProps<Theme>;
  formRef?: FormRef;
  isDraftRef?: MutableRefObject<boolean>;
}

const Form = <T extends FieldValues>({
  form,
  onSubmit,
  children,
  formRef,
  isDraftRef,
  sx = [],
  ...props
}: Props<T>): JSX.Element => {
  useImperativeHandle(formRef, () => ({
    isFormValid() {
      return form.formState.isValid;
    },
    async submitForm(draft?: boolean) {
      if (onSubmit) {
        if (isDraftRef) isDraftRef.current = Boolean(draft);
        await form.handleSubmit(onSubmit)();
      }
    },
  }));

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit && form.handleSubmit(onSubmit)} {...props}>
        {/* <fieldset> passes the form's 'disabled' state to all of its elements,
          allowing us to handle disabled style variants with just css */}
        <Box
          component="fieldset"
          disabled={form.formState.isSubmitting}
          sx={[{ borderWidth: 0, padding: 0, margin: 0 }, ...sxToArray(sx)]}
        >
          {children}
        </Box>
      </form>
      {IS_DEV && <DevTool control={form.control} />}
    </FormProvider>
  );
};

export default Form;
