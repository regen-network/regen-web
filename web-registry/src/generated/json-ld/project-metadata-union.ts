import {
  CFCProjectMetadataLD,
  ProjectMetadataLD,
  ToucanProjectMetadataLD,
  VCSProjectMetadataLD,
} from '.';

// A combination of existing Project metadata schemas, to allow more flexible UIs
export type ProjectMetadataLDUnion =
  | ProjectMetadataLD
  | VCSProjectMetadataLD
  | CFCProjectMetadataLD
  | ToucanProjectMetadataLD;

export type ProjectMetadataLDX = ProjectMetadataLD &
  VCSProjectMetadataLD &
  CFCProjectMetadataLD &
  ToucanProjectMetadataLD;
