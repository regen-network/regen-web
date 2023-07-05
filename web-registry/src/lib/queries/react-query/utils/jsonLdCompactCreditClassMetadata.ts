import { CreditClassByOnChainIdQuery, Maybe } from 'generated/graphql';
import { jsonLdCompact } from 'lib/rdf';

export async function jsonLdCompactCreditClassMetadata(
  creditClass?: Maybe<CreditClassByOnChainIdQuery>,
): Promise<void> {
  const creditClassVersion =
    creditClass?.creditClassByOnChainId?.creditClassVersionsById.nodes[0];
  if (creditClassVersion?.metadata) {
    creditClassVersion.metadata = await jsonLdCompact(
      creditClassVersion.metadata,
    );
  }
}
