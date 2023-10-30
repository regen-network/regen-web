export type ConfirmationCodeProps = {
  /**
   * A label for the confirmation code input field.
   */
  ariaLabel?: string;

  /**
   * Whether the confirmation code input field should be focused when the component mounts.
   */
  autoFocus?: boolean;

  /**
   * A CSS class name to apply to the root element of the component.
   */
  className?: string;

  /**
   * Whether the confirmation code input field should be disabled.
   */
  disabled?: boolean;

  /**
   * A CSS class name to apply to the input element of the component.
   */
  inputClassName?: string;

  /**
   * Whether the confirmation code should be displayed as a password field.
   */
  isPassword?: boolean;

  /**
   * The length of the confirmation code.
   */
  length?: number;

  /**
   * A placeholder value to display in the confirmation code input field.
   */
  placeholder?: string;

  /**
   * A callback function that is called when the value of the confirmation code input field changes.
   * @param res The new value of the confirmation code input field.
   */
  onChange: (res: string) => void;
};

export type InputProps = {
  type: 'tel';
  inputMode: 'numeric';
  pattern: string;
  min?: string;
  max?: string;
};

/**
 * A ref object for the ConfirmationCode component.
 */
export type ConfirmationCodeRef = {
  /**
   * A function that sets focus on the confirmation code input field.
   */
  focus: () => void;

  /**
   * A function that clears the value of the confirmation code input field.
   */
  clear: () => void;
};
