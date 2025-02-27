import { ComponentProps, MutableRefObject, useImperativeHandle } from 'react';
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  UseFormReturn,
} from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { Box, SxProps } from '@mui/material';
import { IS_DEV } from 'web-marketplace/src/lib/env';

import { Theme } from 'web-components/src/theme/muiTheme';
import { sxToArray } from 'web-components/src/utils/mui/sxToArray';

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
  fieldsetClassName?: string;
}

const Form = <T extends FieldValues>({
  form,
  onSubmit,
  children,
  formRef,
  isDraftRef,
  sx = [],
  fieldsetClassName = '',
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
          className={fieldsetClassName}
        >
          {children}
        </Box>
      </form>
      {IS_DEV && <DevTool control={form.control} />}
    </FormProvider>
  );
};

export default Form;
