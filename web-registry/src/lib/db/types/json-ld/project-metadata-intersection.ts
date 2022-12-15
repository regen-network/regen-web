import {
  CFCProjectMetadataLD,
  ProjectMetadataLD,
  ProjectPageMetadataLD,
  ToucanProjectMetadataLD,
  VCSProjectMetadataLD,
} from '.';

/** A combination of existing anchored Project metadata schemas */
export type AnchoredProjectMetadataIntersectionLD = ProjectMetadataLD &
  VCSProjectMetadataLD &
  CFCProjectMetadataLD &
  ToucanProjectMetadataLD;

/** A combination of all existing Project metadata schemas, to allow more flexible UIs */
export type ProjectMetadataIntersectionLD =
  AnchoredProjectMetadataIntersectionLD & ProjectPageMetadataLD;
