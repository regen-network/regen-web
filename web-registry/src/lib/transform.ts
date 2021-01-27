import { IssuanceModalData } from 'web-components/lib/components/modal/IssuanceModal';
import { Party } from 'web-components/lib/components/party/PartyAddress';

function getParty(party: {
  name: string;
  addressByAddressId?: {
    features?: object;
  };
  organizationByPartyId: {
    description?: string;
    organizationMembersByOrganizationId: {
      nodes: {
        userByMemberId: {
          partyByPartyId: {
            name: string;
            roles?: string[];
          }
        }
      }[];
    } 
  }
}): Party {
  const partyOrg = party.organizationByPartyId;
  const partyUser =
    partyOrg.organizationMembersByOrganizationId &&
    partyOrg.organizationMembersByOrganizationId.nodes &&
    partyOrg.organizationMembersByOrganizationId.nodes.length &&
    partyOrg.organizationMembersByOrganizationId.nodes[0] &&
    partyOrg.organizationMembersByOrganizationId.nodes[0].userByMemberId;
}
// buildModalData builds some IssuanceModalData to provide
// to a Timeline Event based on some optional credit vintage data.
// TODO get generated type for creditVintage and project from graphql schema.
export function buildModalData(creditVintage?: any, project: any): IssuanceModalData | null {
  let modalData = {};
  if (creditVintage) {
    const issuerWallet = creditVintage.walletByIssuerId;
    const issuerParty = issuerWallet.partiesByWalletId.nodes[0]; // have party-wallet 1-1 relation?
    const issuerOrg = issuerParty.organizationByPartyId;
    const issuerUser =
      issuerOrg.organizationMembersByOrganizationId &&
      issuerOrg.organizationMembersByOrganizationId.nodes &&
      issuerOrg.organizationMembersByOrganizationId.nodes.length &&
      issuerOrg.organizationMembersByOrganizationId.nodes[0] &&
      issuerOrg.organizationMembersByOrganizationId.nodes[0].userByMemberId;

    const issuees: Party[] = [];
    if (creditVintage.initialDistribution) {
      if (creditVintage.initialDistribution.projectDeveloper > 0 && project.partyByDeveloperId) {
        const projectDeveloper = 
      }
    }
    modalData = {
      issuer: {
        name: issuerParty.name,
        address: issuerWallet.addr,
        role:
          issuerUser.partyByPartyId.roles &&
          issuerUser.partyByPartyId.roles.length &&
          issuerUser.partyByPartyId.roles[0],
        individual: issuerUser.partyByPartyId.name,
        location: issuerParty.addressByAddressId && issuerParty.addressByAddressId.feature,
        description: issuerOrg && issuerOrg.description,
      },
    };

    return modalData as IssuanceModalData;
  }
  return null;
}
