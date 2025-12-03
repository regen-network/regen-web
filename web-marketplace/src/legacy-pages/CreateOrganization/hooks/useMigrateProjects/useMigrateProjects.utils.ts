import { DeliverTxResponse } from '@cosmjs/stargate';
import { EventSell } from '@regen-network/api/regen/ecocredit/marketplace/v1/events';

import { DaoByAddressWithAssignmentsQuery } from 'generated/graphql';
import { NormalizeProject } from 'lib/normalizers/projects/normalizeProjectsWithMetadata';
import { SellOrderInfoExtented } from 'lib/queries/react-query/ecocredit/marketplace/getSellOrdersExtendedQuery/getSellOrdersExtendedQuery.types';

import {
  ROLE_ADMIN,
  ROLE_AUTHOR,
  ROLE_EDITOR,
  ROLE_OWNER,
  ROLE_VIEWER,
} from 'components/organisms/ActionDropdown/ActionDropdown.constants';
import { BaseMemberRole } from 'components/organisms/BaseMembersTable/BaseMembersTable.types';
import { CardSellOrder } from 'components/organisms/ChooseCreditsForm/ChooseCreditsForm.types';

export const getSelectedCardSellOrdersWithNewIds = (
  deliverTxResponse: DeliverTxResponse | undefined,
  selectedSellOrders: SellOrderInfoExtented[],
  selectedProjects: NormalizeProject[],
  walletAddress: string,
) => {
  // Get new sell order ids from EventSell's
  // sorted by ascending id
  const newSellOrderIds = deliverTxResponse?.events
    .filter(event => event.type === EventSell.typeUrl.replace('/', ''))
    .flatMap(
      event =>
        event.attributes
          .filter(attr => attr.key === 'sell_order_id')
          .map(attr => attr.value.replace(/"/g, '')), // remove quotes if needed
    );

  // Map old sell order ids to new ones
  const sellOrderIdMap: Record<string, string> = {};
  selectedSellOrders.forEach((order, index) => {
    const oldId = String(order.id);
    const newId = newSellOrderIds ? newSellOrderIds[index] : undefined;
    if (newId) {
      sellOrderIdMap[oldId] = newId;
    }
  });

  const selectedCardSellOrders = (
    selectedProjects
      .flatMap(project => project.allCardSellOrders)
      .filter(
        order => !!order && order.seller === walletAddress,
      ) as CardSellOrder[]
  ).map(order => ({ ...order, newId: sellOrderIdMap[order.id] }));

  return selectedCardSellOrders;
};

export const getOrgAssignments = (
  orgCurrentUserRole?: BaseMemberRole,
  orgAssignmentsData?: DaoByAddressWithAssignmentsQuery | null,
) => {
  let adminAssignments: string[] = [];
  let editorAssignments: string[] = [];
  let authorAssignments: string[] = [];
  let viewerAssignments: string[] = [];
  const offChainAssignments: { email: string; roleName: BaseMemberRole }[] = [];

  if (orgCurrentUserRole)
    orgAssignmentsData?.daoByAddress?.assignmentsByDaoAddress?.nodes?.forEach(
      assignment => {
        const account =
          orgAssignmentsData?.daoByAddress?.accountsByAssignmentDaoAddressAndAccountId?.nodes.find(
            acc => acc?.id === assignment?.accountId,
          );
        const id = account?.id;
        const email =
          account?.privateAccountById?.email ||
          account?.privateAccountById?.googleEmail;
        if (account?.addr) {
          switch (assignment?.roleName) {
            case ROLE_OWNER:
              // Since the user who migrates the project becomes the owner of the project,
              // if the current user is not the org owner,
              // we want to downgrade the current org owner to admin in the project,
              // because they can only be one owner.
              if (orgCurrentUserRole !== ROLE_OWNER) {
                adminAssignments.push(account.addr);
              }
              break;
            case ROLE_ADMIN:
              adminAssignments.push(account.addr);
              break;
            case ROLE_EDITOR:
              editorAssignments.push(account.addr);
              break;
            case ROLE_AUTHOR:
              authorAssignments.push(account.addr);
              break;
            case ROLE_VIEWER:
              viewerAssignments.push(account.addr);
              break;
          }
        } else if (email && id && assignment?.roleName) {
          offChainAssignments.push({
            email,
            roleName: assignment?.roleName as BaseMemberRole,
          });
        }
      },
    );
  return {
    adminAssignments,
    editorAssignments,
    authorAssignments,
    viewerAssignments,
    offChainAssignments,
  };
};
