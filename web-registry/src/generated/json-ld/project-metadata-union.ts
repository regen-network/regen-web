import {
  CFCProjectMetadataLD,
  ProjectMetadataLD,
  VCSProjectMetadataLD,
} from '.';

// A combination of existing Project metadata schemas, to allow more flexible UIs
export type ProjectMetadataLDUnion =
  | ProjectMetadataLD
  | VCSProjectMetadataLD
  | CFCProjectMetadataLD;
