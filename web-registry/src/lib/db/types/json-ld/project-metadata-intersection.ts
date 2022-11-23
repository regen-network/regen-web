import {
  CFCProjectMetadataLD,
  NonQueryableProjectMetadataLD,
  ProjectMetadataLD,
  ToucanProjectMetadataLD,
  VCSProjectMetadataLD,
} from '.';

// A combination of existing Project metadata schemas, to allow more flexible UIs
export type ProjectMetadataIntersectionLD = ProjectMetadataLD &
  NonQueryableProjectMetadataLD &
  VCSProjectMetadataLD &
  CFCProjectMetadataLD &
  ToucanProjectMetadataLD;
