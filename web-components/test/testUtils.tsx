import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

// Custom hook to setup react hook form context
export function useCustomForm(defaultValues) {
  return useForm({
    defaultValues,
  });
}

// Provider component
export const FormContextProvider = ({ children, defaultValues }) => {
  const methods = useCustomForm(defaultValues);

  return <FormProvider {...methods}>{children}</FormProvider>;
};
