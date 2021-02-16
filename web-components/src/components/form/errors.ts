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
};

export type SignupCode =
  | 'invalid_password'
  | 'invalid_signup'
  | 'password_dictionary_error'
  | 'password_no_user_info_error'
  | 'password_strength_error'
  | 'unauthorized'
  | 'user_exists'
  | 'username_exists';
