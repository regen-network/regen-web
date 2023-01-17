import { ComponentProps } from 'react';
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  UseFormReturn,
} from 'react-hook-form';

interface Props<T extends FieldValues>
  extends Omit<ComponentProps<'form'>, 'onSubmit'> {
  form: UseFormReturn<T>;
  onSubmit: SubmitHandler<T>;
}

const Form = <T extends FieldValues>({
  form,
  onSubmit,
  children,
  ...props
}: Props<T>): JSX.Element => (
  <FormProvider {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} {...props}>
      {/* <fieldset> passes the form's 'disabled' state to all of its elements,
          allowing us to handle disabled style variants with just css */}
      <fieldset disabled={form.formState.isSubmitting}>{children}</fieldset>
    </form>
  </FormProvider>
);

export default Form;
