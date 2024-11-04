import {
  AnchoredProjectMetadataBaseLD,
  CFCProjectMetadataLD,
  ProjectPageMetadataLD,
  ToucanProjectMetadataLD,
  VCSProjectMetadataLD,
} from '.';
import { TerrasosProjectMetadataLD } from './terrasos-project-metadata';

/** A combination of existing anchored Project metadata schemas */
export type AnchoredProjectMetadataLD = AnchoredProjectMetadataBaseLD &
  VCSProjectMetadataLD &
  CFCProjectMetadataLD &
  ToucanProjectMetadataLD;

/** A combination of all existing Project metadata schemas, to allow more flexible UIs */
export type ProjectMetadataLD = AnchoredProjectMetadataLD &
  ProjectPageMetadataLD &
  TerrasosProjectMetadataLD;

/** A combination of Project metadata for legacy projects (projects that are not on-chain)
 * For these projects, all metadata is stored off-chain
 */
export type LegacyProjectMetadataLD = AnchoredProjectMetadataBaseLD &
  ProjectPageMetadataLD;
