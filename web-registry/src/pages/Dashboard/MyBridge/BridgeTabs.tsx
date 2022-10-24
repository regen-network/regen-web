import Card from 'web-components/lib/components/cards/Card';
import { IconTabProps } from 'web-components/lib/components/tabs/IconTab';
import { IconTabs } from 'web-components/lib/components/tabs/IconTabs';

import WithLoader from 'components/atoms/WithLoader';

import { BridgableTable } from './MyBridge.BridgableTable';
import { BridgedTable } from './MyBridge.BridgedTable';

const tabs: IconTabProps[] = [
  {
    label: 'Bridgable ecocredits',
    content: <BridgableTable />,
  },
  {
    label: 'Bridged ecocredits',
    content: <BridgedTable />,
  },
];

export const BridgeTabs = (): JSX.Element => {
  return (
    <Card sx={{ mb: '20px', pt: 0, px: 0, pb: '25px' }}>
      <WithLoader
        isLoading={false}
        sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'center',
          flexDirection: 'col',
          alignItems: 'center',
        }}
      >
        <IconTabs
          tabs={tabs}
          size={'xl'}
          sxs={{
            tab: {
              outer: { mt: '20px', mx: '10px' },
              inner: { mb: '12px', ml: 0 },
            },
            panel: { inner: { p: 0 } },
          }}
        />
      </WithLoader>
    </Card>
  );
};
