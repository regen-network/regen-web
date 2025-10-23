export interface MultiStepFormApi {
  trigger: (names?: string | string[]) => Promise<boolean>;
  submit: () => Promise<void>;
  isSubmitting: boolean;
  isValid: boolean;
}
