export const requiredMessage: string = 'This field is required';
export const invalidEmailMessage: string = 'Please enter a valid email address';

export function validateEmail(email: string): boolean {
  return /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,10})$/i.test(email);
}
