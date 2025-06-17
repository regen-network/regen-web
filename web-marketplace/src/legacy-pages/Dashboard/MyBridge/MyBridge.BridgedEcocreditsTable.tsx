import { BridgedEcocreditsTable } from 'components/organisms';

import { useMyBridgeContext } from './MyBridge.context';

export const MyBridgedEcocreditsTable = (): JSX.Element => {
  const { accountAddress, privateAccess } = useMyBridgeContext();

  return (
    <BridgedEcocreditsTable
      accountAddress={accountAddress}
      privateAccess={privateAccess}
    />
  );
};
