import { BridgableEcocreditsTable } from 'components/organisms';

import { useMyBridgeContext } from './MyBridge.context';

export const MyBridgableEcocreditsTable = (): JSX.Element => {
  const { accountAddress } = useMyBridgeContext();

  return <BridgableEcocreditsTable accountAddress={accountAddress} />;
};
