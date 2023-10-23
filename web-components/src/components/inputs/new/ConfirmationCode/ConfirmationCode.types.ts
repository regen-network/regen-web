export type InputMode = 'text' | 'numeric';

export type InputType = 'text' | 'tel' | 'password';

export type InputProps = {
  type: InputType;
  inputMode: InputMode;
  pattern: string;
  min?: string;
  max?: string;
};

export type ConfirmationCodeRef = {
  focus: () => void;
  clear: () => void;
};
