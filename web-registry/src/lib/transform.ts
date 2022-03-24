import { IssuanceModalData } from 'web-components/lib/components/modal/IssuanceModal';
import { Party } from 'web-components/lib/components/modal/LedgerModal';
import { DocumentInfo } from 'web-components/lib/components/document';
import { getFormattedPeriod } from 'web-components/lib/utils/format';

import {
  ProjectByHandleQuery,
  PartyFieldsFragment,
  Maybe,
} from '../generated/graphql';
import {
  EntityDisplayValues,
  EntityFieldName,
} from '../components/organisms/EntityDisplayForm';

// buildIssuanceModalData builds some IssuanceModalData to provide
// to a Timeline Event based on some optional credit vintage data.
// TODO get generated type for creditVintage and project from graphql schema.
export function buildIssuanceModalData(
  data?: ProjectByHandleQuery,
  creditVintage?: any,
): IssuanceModalData | null {
  const project = data?.projectByHandle;
  if (project && creditVintage) {
    const documents = project.documentsByProjectId.nodes;
    const issuerWallet = creditVintage.walletByTokenizerId;
    const issuerParty = issuerWallet.partiesByWalletId.nodes[0]; // have party-wallet 1-1 relation?

    const issuees: Party[] = [];
    if (creditVintage.initialDistribution) {
      // Check credit vintage initial distribution to define the issuees
      if (
        creditVintage.initialDistribution[
          'http://regen.network/projectDeveloperDistribution'
        ] > 0 &&
        project.partyByDeveloperId
      ) {
        const projectDeveloper = getParty(project.partyByDeveloperId);
        if (projectDeveloper) issuees.push(projectDeveloper);
      }
      if (
        creditVintage.initialDistribution[
          'http://regen.network/landStewardDistribution'
        ] > 0 &&
        project.partyByStewardId
      ) {
        const landSteward = getParty(project.partyByStewardId);
        if (landSteward) issuees.push(landSteward);
      }
      if (
        creditVintage.initialDistribution[
          'http://regen.network/landOwnerDistribution'
        ] > 0 &&
        project.partyByLandOwnerId
      ) {
        const landOwner = getParty(project.partyByLandOwnerId);
        if (landOwner) issuees.push(landOwner);
      }
    }

    const creditClassVersion =
      creditVintage.creditClassVersionByCreditClassVersionIdAndCreditClassVersionCreatedAt;
    const methodologyVersion =
      creditVintage.methodologyVersionByMethodologyVersionIdAndMethodologyVersionCreatedAt;

    const bufferPoolDist =
      creditVintage.metadata?.['http://regen.network/bufferDistribution']?.[
        'http://regen.network/bufferPool'
      ];
    const permanenceReversalBufferDist =
      creditVintage.metadata?.['http://regen.network/bufferDistribution']?.[
        'http://regen.network/permanenceReversalBuffer'
      ];

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
      projectName: project.metadata?.['http://schema.org/name'] || '',
      standard: {
        documentId:
          creditClassVersion?.metadata?.['http://regen.network/standard']?.[
            'http://regen.network/documentId'
          ],
        name: creditClassVersion?.metadata?.['http://regen.network/standard']?.[
          'http://schema.org/name'
        ],
        version:
          creditClassVersion?.metadata?.['http://regen.network/standard']?.[
            'http://schema.org/version'
          ],
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
  const partyOrg = party.organizationByPartyId;
  const partyUser =
    partyOrg?.organizationMembersByOrganizationId &&
    partyOrg.organizationMembersByOrganizationId.nodes &&
    partyOrg.organizationMembersByOrganizationId.nodes.length &&
    partyOrg.organizationMembersByOrganizationId.nodes[0] &&
    partyOrg.organizationMembersByOrganizationId.nodes[0].userByMemberId;
  const partyAddress =
    party.addressByAddressId &&
    party.addressByAddressId.feature &&
    party.addressByAddressId.feature.place_name;

  return {
    name: party.name,
    location: partyAddress || '',
    description: party.description || '',
    type: party.type,
    image: party.image || '',
    address: (party.walletByWalletId && party.walletByWalletId.addr) || '',
    role:
      (partyUser &&
        partyUser.partyByPartyId?.roles &&
        partyUser.partyByPartyId.roles.length &&
        partyUser.partyByPartyId.roles[0]) ||
      '',
    individual: (partyUser && partyUser.partyByPartyId?.name) || '',
  };
}

const getPartyFromMetadata = (
  metadata: EntityDisplayValues,
  role: EntityFieldName,
): Party | undefined => {
  const metadataRole = metadata[role];
  if (!metadataRole) return undefined;

  return {
    name: metadataRole?.['http://schema.org/name'] || '',
    description: metadataRole?.['http://schema.org/description'] || '',
    type: 'ORGANIZATION', // to provide default image
    individual: '',
    role: '',
    address: '',
  };
};

export function getDisplayParty(
  role: EntityFieldName,
  metadata?: EntityDisplayValues,
  party?: Maybe<PartyFieldsFragment>,
): Party | undefined {
  const showOnProjectPage =
    metadata?.[role]?.['http://regen.network/showOnProjectPage'];
  if (showOnProjectPage) {
    const dbParty = getParty(party);
    if (dbParty) return dbParty;
    return getPartyFromMetadata(metadata, role);
  }
  return undefined;
}
