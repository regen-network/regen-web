import { DocumentInfo } from 'web-components/lib/components/document';
import { IssuanceModalData } from 'web-components/lib/components/modal/IssuanceModal';
import { Party } from 'web-components/lib/components/modal/LedgerModal';
import { getFormattedPeriod } from 'web-components/lib/utils/format';

import {
  AnchoredProjectMetadataBaseLD,
  ProjectStakeholder,
} from 'lib/db/types/json-ld';

import {
  Maybe,
  PartyFieldsFragment,
  ProjectFieldsFragment,
} from '../generated/graphql';

// buildIssuanceModalData builds some IssuanceModalData to provide
// to a Timeline Event based on some optional credit vintage data.
// TODO get generated type for creditVintage from graphql schema.
export function buildIssuanceModalData(
  project?: Maybe<ProjectFieldsFragment>,
  creditVintage?: any,
): IssuanceModalData | null {
  if (project && creditVintage) {
    const documents = project.documentsByProjectId.nodes;
    const issuerWallet = creditVintage.walletByTokenizerId;
    const issuerParty = issuerWallet.partiesByWalletId.nodes[0]; // have party-wallet 1-1 relation?

    const issuees: Party[] = [];
    if (creditVintage.initialDistribution) {
      // Check credit vintage initial distribution to define the issuees
      if (
        creditVintage.initialDistribution[
          'https://schema.regen.network#projectDeveloperDistribution'
        ] > 0 &&
        project.partyByDeveloperId
      ) {
        const projectDeveloper = getParty(project.partyByDeveloperId);
        if (projectDeveloper) issuees.push(projectDeveloper);
      }
    }

    const creditClassVersion =
      creditVintage.creditClassVersionByCreditClassVersionIdAndCreditClassVersionCreatedAt;
    const methodologyVersion =
      creditVintage.methodologyVersionByMethodologyVersionIdAndMethodologyVersionCreatedAt;

    const bufferPoolDist =
      creditVintage.metadata?.[
        'https://schema.regen.network#bufferDistribution'
      ]?.['https://schema.regen.network#bufferPool'];
    const permanenceReversalBufferDist =
      creditVintage.metadata?.[
        'https://schema.regen.network#bufferDistribution'
      ]?.['https://schema.regen.network#permanenceReversalBuffer'];

    let numberOfCredits: number = creditVintage.units;
    let bufferPool: number | undefined;
    let permanenceReversalBuffer: number | undefined;
    if (bufferPoolDist) {
      bufferPool = bufferPoolDist * creditVintage.units;
      numberOfCredits = numberOfCredits - bufferPool;
    }
    if (permanenceReversalBufferDist) {
      permanenceReversalBuffer =
        permanenceReversalBufferDist * creditVintage.units;
      numberOfCredits = numberOfCredits - permanenceReversalBuffer;
    }

    const monitoringPeriods: DocumentInfo[] = documents
      .filter(doc => doc?.type === 'Monitoring')
      .map(doc => {
        return {
          name: doc?.name || '',
          info:
            doc?.name && doc.name.toLowerCase().indexOf('monitoring') > -1
              ? 'monitoring report'
              : 'data' || '',
          link: doc?.url || '',
        };
      });

    return {
      issuer: getParty(issuerParty),
      issuees,
      timestamp: creditVintage.createdAt,
      numberOfCredits,
      bufferPool,
      permanenceReversalBuffer,
      creditUnit: '1 ton of CO2e', // TODO replace with db data
      vintageId: {
        name: creditVintage.id.substring(0, 8),
        info: 'certificate',
        link: creditVintage.certificateLink,
      },
      txHash: creditVintage.txHash,
      vintagePeriod: getFormattedPeriod(
        creditVintage.startDate,
        creditVintage.endDate,
      ),
      monitoringPeriods,
      projectName: project.metadata?.['schema:name'] || '',
      standard: {
        documentId:
          creditClassVersion?.metadata?.[
            'https://schema.regen.network#standard'
          ]?.['https://schema.regen.network#documentId'],
        name: creditClassVersion?.metadata?.[
          'https://schema.regen.network#standard'
        ]?.['http://schema.org/name'],
        version:
          creditClassVersion?.metadata?.[
            'https://schema.regen.network#standard'
          ]?.['http://schema.org/version'],
      },
      creditClass: {
        documentId: creditClassVersion?.documentId,
        name: creditClassVersion?.name,
        version: creditClassVersion?.version,
      },
      methodology: {
        documentId: methodologyVersion?.documentId,
        name: methodologyVersion?.name,
        version: methodologyVersion?.version,
      },
    };
  }
  return null;
}

export function getParty(
  party?: Maybe<PartyFieldsFragment>,
): Party | undefined {
  if (!party) {
    return undefined;
  }

  return {
    name: party.name,
    description: party.description,
    type: party.type,
    image: party.image,
    address: party.walletByWalletId?.addr || '',
    link: party?.websiteLink,
  };
}

type StakeholderType =
  | 'regen:projectDeveloper'
  | 'regen:landSteward'
  | 'regen:landOwner'
  | 'regen:projectOriginator';

const getPartyFromMetadata = (
  metadata: AnchoredProjectMetadataBaseLD,
  role: StakeholderType,
): Party | undefined => {
  const metadataRole: ProjectStakeholder | undefined = metadata[role];
  if (!metadataRole) return undefined;

  return {
    name: metadataRole?.['schema:name'] || '',
    description: metadataRole?.['schema:description'] || '',
    type: metadataRole?.['@type'].includes('regen:Organization') // covers Organization or OrganizationDisplay
      ? 'ORGANIZATION' // to provide default image
      : 'USER',
    image: metadataRole?.['schema:image'],
    location: metadataRole?.['schema:location']?.place_name || '',
    address: metadataRole?.['regen:adress'] || '',
    link: metadataRole?.['schema:url'] || '',
  };
};

export function getDisplayParty(
  role: StakeholderType,
  metadata?: AnchoredProjectMetadataBaseLD,
  party?: Maybe<PartyFieldsFragment>,
): Party | undefined {
  const showOnProjectPage = metadata?.[role]?.['regen:showOnProjectPage'];
  if (showOnProjectPage) {
    const dbParty = getParty(party);
    if (dbParty) return dbParty;
    // If no party info available for this role, check the metadata
    return getPartyFromMetadata(metadata, role);
  }
  return undefined;
}
