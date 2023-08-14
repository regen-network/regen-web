import { Maybe, ProjectFieldsFragment } from 'generated/graphql';
import { jsonLdCompact } from 'lib/rdf';

export async function jsonLdCompactProjectMetadata(
  project?: Maybe<ProjectFieldsFragment>,
): Promise<void> {
  if (project?.metadata) {
    project.metadata = await jsonLdCompact(project.metadata);
  }
  const creditClassVersionMetadata =
    project?.creditClassByCreditClassId?.creditClassVersionsById.nodes[0]
      ?.metadata;
  if (
    project?.creditClassByCreditClassId?.creditClassVersionsById.nodes[0] &&
    creditClassVersionMetadata
  ) {
    project.creditClassByCreditClassId.creditClassVersionsById.nodes[0].metadata =
      await jsonLdCompact(creditClassVersionMetadata);
  }
}
