import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { act, render, RenderOptions } from '@testing-library/react';
import React, { ReactNode } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

// Custom hook to setup react hook form context
export function useCustomForm(defaultValues: any) {
  return useForm({
    defaultValues,
  });
}

// Form Provider
export const FormContextProvider = ({
  children,
  defaultValues,
}: {
  children: any;
  defaultValues: any;
}) => {
  const methods = useCustomForm(defaultValues);

  return <FormProvider {...methods}>{children}</FormProvider>;
};

// Lingui Provider
interface LinguiProviderProps {
  children: ReactNode;
}

const LinguiProvider: React.FC<LinguiProviderProps> = ({ children }) => {
  act(() => {
    i18n.activate('en');
  });
  return <I18nProvider i18n={i18n}>{children}</I18nProvider>;
};

// https://testing-library.com/docs/react-testing-library/setup/#custom-render
const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: LinguiProvider, ...options });

// re-export everything
export * from '@testing-library/react';
export * from '@testing-library/user-event';

// override the render method
export { customRender as render };
