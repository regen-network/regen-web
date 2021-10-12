export const errors = {
  invalid_password:
    'Your password must contain 1 letter, 1 number, 1 special character, and at least 8 characters total',
  invalid_signup: 'This email address is invalid',
  password_dictionary_error: 'This password is too common',
  password_no_user_info_error: 'This password is invalid',
  password_strength_error: 'Password strength: too weak',
  unauthorized: 'You are not authorized to access this application',
  user_exists: 'This email already exists, please try logging in',
  username_exists: 'The username you are attempting to sign up with is already in use',
  access_denied: 'Access denied',
  invalid_user_password: 'This email and password combination is not correct, please try again',
  mfa_invalid_code: 'The multi-factor authentication (MFA) code provided by the user is invalid/expired',
  mfa_registration_required:
    'The administrator has required multi-factor authentication, but the user has not enrolled',
  mfa_required: 'The user must provide the multi-factor authentication code to authenticate',
  password_leaked: 'Your password was leaked, please reset your password',
  PasswordHistoryError: 'The password provided for sign up/update has already been used',
  PasswordStrengthError: 'This is not a strong enough password',
  too_many_attempts: 'Too many sign in attempts, please try again later',
};

export type LoginCode =
  | 'access_denied'
  | 'invalid_user_password'
  | 'mfa_invalid_code'
  | 'mfa_registration_required'
  | 'mfa_required'
  | 'password_leaked'
  | 'PasswordHistoryError'
  | 'PasswordStrengthError'
  | 'too_many_attempts'
  | 'unauthorized';

export type SignupCode =
  | 'invalid_password'
  | 'invalid_signup'
  | 'password_dictionary_error'
  | 'password_no_user_info_error'
  | 'password_strength_error'
  | 'unauthorized'
  | 'user_exists'
  | 'username_exists';

export function getErrorMessage(message: string): string {
  return message === `duplicate key value violates unique constraint "user_email_key"`
    ? errors.invalid_signup
    : message;
}
