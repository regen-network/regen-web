import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import {
  act,
  render as rtlRender,
  RenderOptions,
} from '@testing-library/react';
import { ReactElement, ReactNode } from 'react';
import { FormProvider, useForm, UseFormReturn } from 'react-hook-form';

// Custom hook to setup react hook form context
export function useCustomForm(
  formDefaultValues: Record<string, any>,
): UseFormReturn {
  return useForm({
    defaultValues: formDefaultValues,
  });
}

// Form Provider
interface FormContextProviderProps {
  children: ReactNode;
  formDefaultValues: Record<string, any>;
}

const FormContextProvider = ({
  children,
  formDefaultValues,
}: FormContextProviderProps) => {
  const methods = useCustomForm(formDefaultValues);

  return <FormProvider {...methods}>{children}</FormProvider>;
};

// Lingui Provider
interface LinguiProviderProps {
  children: ReactNode;
}

const LinguiProvider = ({ children }: LinguiProviderProps) => {
  act(() => {
    i18n.activate('en');
  });

  return <I18nProvider i18n={i18n}>{children}</I18nProvider>;
};

// Combined Provider
interface CombinedProvidersProps {
  children: ReactNode;
  formDefaultValues?: Record<string, any>;
}

const CombinedProviders = ({
  children,
  formDefaultValues,
}: CombinedProvidersProps) => (
  <LinguiProvider>
    {formDefaultValues ? (
      <FormContextProvider formDefaultValues={formDefaultValues}>
        {children}
      </FormContextProvider>
    ) : (
      children
    )}
  </LinguiProvider>
);

// RTL Custom render function
//
// How to use the customRender function with FormContextProvider and default values
// Example usage:
//
// import { render, screen } from 'test-utils';
// import { SomeComponent } from './SomeComponent';
//
// test('renders SomeComponent', () => {
//   render(<SomeComponent props={[]} />, {
//     formDefaultValues: {
//       you_form_value: 'here',
//   });
//   expect(screen.getByText(/something/i)).toBeInTheDocument();
// });
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  formDefaultValues?: Record<string, any>;
}

const customRender = (ui: ReactElement, options?: CustomRenderOptions) => {
  const { formDefaultValues, ...restOptions } = options || {};
  return rtlRender(ui, {
    wrapper: ({ children }) => (
      <CombinedProviders formDefaultValues={formDefaultValues}>
        {children}
      </CombinedProviders>
    ),
    ...restOptions,
  });
};

// Re-export everything
export * from '@testing-library/react';
export * from '@testing-library/user-event';

// Important:
// In tests import `render` from 'test-utils' instead of '@testing-library/react'.
// Override the render method
export { customRender as render };
