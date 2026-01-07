import { AccountByIdQuery } from 'generated/graphql';

export const findDao = (
  daoAddress: string,
  accountResponse?: AccountByIdQuery | null,
) =>
  accountResponse?.accountById?.daosByAssignmentAccountIdAndDaoAddress?.nodes.find(
    dao => dao?.address === daoAddress,
  );
