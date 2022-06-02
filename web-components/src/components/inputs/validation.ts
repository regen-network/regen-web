export const requiredMessage: string = 'This field is required';
export const invalidEmailMessage: string = 'Please enter a valid email address';
export const invalidPassword: string =
  'Your password must contain at least 1 letter, 1 number, 1 special character (!@#$%^&*) and at least 8 characters';
export const requirementAgreement: string = 'You must agree to continue';
export const invalidAmount: string = 'Please enter a valid amount';
export const insufficientCredits: string = `You don't have enough credits`;
export const invalidDate: string = `Invalid date`;
export const invalidURL: string = `Please enter a valid URL`;
export const invalidVCSRetirement: string = `Please enter a valid VCS retirement serial number`;
export const invalidVCSID: string = `Please enter a valid VCS Project ID`;
export const invalidJSON: string = 'Please enter valid JSON-LD';

export const numericOnlyRE = /^\d*$/gm;

// RegEx based on https://verra.org/wp-content/uploads/2020/09/VCU-Serial-Number-Help-Format.pdf
// TODO: it is possible to do additional validation to make sure dates and project ID match serial number. See link above.
export const vcsRetirementSerialRE =
  /^(\d{1,}-\d{1,999999999999999}-\d{1,999999999999999}-(((VCS|JNR)-VCU)|VCU)-\d{3}-[A-Z]{3}-[A-Z]{2}-\d{2}-\d*-\d{8}-\d{8}-(0|1))$/gm;

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
  customInsufficientCredits?: string,
): string | undefined {
  if (!amount) {
    return requiredMessage;
  } else if (Math.sign(amount) !== 1) {
    return invalidAmount;
  } else if (amount > availableTradableAmount) {
    return customInsufficientCredits || insufficientCredits;
  }
  return;
}

export function isValidJSON(str: string): boolean {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}
