import {
  CFCProjectMetadataLD,
  ProjectMetadataLD,
  ProjectPageMetadataLD,
  ToucanProjectMetadataLD,
  VCSProjectMetadataLD,
} from '.';

// A combination of existing Project metadata schemas, to allow more flexible UIs
export type ProjectMetadataIntersectionLD = ProjectMetadataLD &
  ProjectPageMetadataLD &
  VCSProjectMetadataLD &
  CFCProjectMetadataLD &
  ToucanProjectMetadataLD;
