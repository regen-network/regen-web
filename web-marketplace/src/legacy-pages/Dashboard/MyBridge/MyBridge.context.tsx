import { useOutletContext } from 'react-router-dom';

type MyBridgeContextType = {
  accountAddress: string | undefined;
  privateAccess?: boolean;
};

export const useMyBridgeContext = (): MyBridgeContextType => {
  return useOutletContext<MyBridgeContextType>();
};
