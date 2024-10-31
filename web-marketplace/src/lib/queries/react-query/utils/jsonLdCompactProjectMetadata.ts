import { Maybe, ProjectFieldsFragment } from 'generated/graphql';
import { jsonLdCompact } from 'lib/rdf';

type Params = {
  project?: Maybe<ProjectFieldsFragment>;
  languageCode: string;
};

export async function jsonLdCompactProjectMetadata({
  project,
  languageCode,
}: Params): Promise<void> {
  const projectMetadata =
    project?.projectTranslationsById.nodes.find(
      node => node?.languageCode === languageCode,
    )?.metadata ?? project?.metadata;
  if (project && projectMetadata) {
    project.metadata = await jsonLdCompact(projectMetadata);
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
