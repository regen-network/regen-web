export type PostPrivacyType =
  | 'private'
  | 'private_files'
  | 'private_locations'
  | 'public';

export type FilesPreviews = {
  [fileUrl: string]: string;
};
