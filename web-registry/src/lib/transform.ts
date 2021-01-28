import { IssuanceModalData } from 'web-components/lib/components/modal/IssuanceModal';
import { Party } from 'web-components/lib/components/party/PartyAddress';

// buildModalData builds some IssuanceModalData to provide
// to a Timeline Event based on some optional credit vintage data.
// TODO get generated type for creditVintage and project from graphql schema.
export function buildModalData(project: any, creditVintage?: any): IssuanceModalData | null {
  let modalData = {};
  if (creditVintage) {
    const issuerWallet = creditVintage.walletByIssuerId;
    const issuerParty = issuerWallet.partiesByWalletId.nodes[0]; // have party-wallet 1-1 relation?

    const issuees: Party[] = [];
    if (creditVintage.initialDistribution) {
      // Check credit vintage initial distribution to define the issuees
      if (creditVintage.initialDistribution.projectDeveloper > 0 && project.partyByDeveloperId) {
        const projectDeveloper = getParty(project.partyByDeveloperId);
        issuees.push(projectDeveloper);
      }
      if (creditVintage.initialDistribution.landSteward > 0 && project.partyByStewardId) {
        const landSteward = getParty(project.partyByStewardId);
        issuees.push(landSteward);
      }
      if (creditVintage.initialDistribution.landOwner > 0 && project.partyByLandOwnerId) {
        const landOwner = getParty(project.partyByLandOwnerId);
        issuees.push(landOwner);
      }
    }
    modalData = {
      issuer: getParty(issuerParty),
      issuees,
    };

    return modalData as IssuanceModalData;
  }
  return null;
}

function getParty(party: {
  name: string;
  addressByAddressId?: {
    feature?: {
      place_name?: string;
    };
  };
  walletByWalletId?: {
    addr: string;
  };
  organizationByPartyId: {
    description?: string;
    organizationMembersByOrganizationId: {
      nodes: {
        userByMemberId: {
          partyByPartyId: {
            name: string;
            roles?: string[];
          };
        };
      }[];
    };
  };
}): Party {
  const partyOrg = party.organizationByPartyId;
  const partyUser =
    partyOrg.organizationMembersByOrganizationId &&
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
    address: (party.walletByWalletId && party.walletByWalletId.addr) || '',
    role:
      (partyUser &&
        partyUser.partyByPartyId.roles &&
        partyUser.partyByPartyId.roles.length &&
        partyUser.partyByPartyId.roles[0]) ||
      '',
    individual: (partyUser && partyUser.partyByPartyId.name) || '',
    location: partyAddress || '',
    description: partyOrg && partyOrg.description,
  };
}
