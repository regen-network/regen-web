import { Box } from 'web-components/lib/components/box';

import { BridgeTabs } from './BridgeTabs';
import { BridgeInfo } from './MyBridge.BridgeInfo';

export const MyBridge = (): JSX.Element => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
      }}
    >
      <BridgeTabs />
      <BridgeInfo />
    </Box>
  );
};
