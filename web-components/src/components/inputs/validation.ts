export const requiredMessage: string = 'This field is required';
export const invalidEmailMessage: string = 'Please enter a valid email address';
export const invalidPassword: string =
  'Your password must contain at least 1 letter, 1 number, 1 special character (!@#$%^&*) and at least 8 characters';
export const requirementAgreement: string = 'You must agree to continue';
export const invalidAmount: string = 'Please enter a valid amount';
export const insufficientCredits: string = "You don't have enough credits";

export function validateEmail(email: string): boolean {
  return /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,10})$/i.test(
    email,
  );
}

export function validatePassword(password: string): boolean {
  if (password.length < 8) {
    return false;
  }

  const hasUpperCase: boolean = /[A-Z]/.test(password);
  const hasLowerCase: boolean = /[a-z]/.test(password);
  const hasNumber: boolean = /\d/.test(password);
  const hasSpecialCharacter: boolean = /[!@#$%^&*]+/.test(password);

  return hasUpperCase && hasLowerCase && hasNumber && hasSpecialCharacter;
}

export function validateAmount(
  availableTradableAmount: number,
  amount?: number,
): string | undefined {
  if (!amount) {
    return requiredMessage;
  } else if (Math.sign(amount) !== 1) {
    return invalidAmount;
  } else if (amount > availableTradableAmount) {
    return insufficientCredits;
  }
  return;
}
