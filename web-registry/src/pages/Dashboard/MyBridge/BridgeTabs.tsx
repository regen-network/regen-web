import Card from 'web-components/lib/components/cards/Card';
import { IconTabProps } from 'web-components/lib/components/tabs/IconTab';
import { IconTabs } from 'web-components/lib/components/tabs/IconTabs';

import WithLoader from 'components/atoms/WithLoader';

import { CardStyles, TabsStyles, WithLoaderStyles } from './BridgeTabs.styles';
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
    <Card sx={CardStyles}>
      <WithLoader isLoading={false} sx={WithLoaderStyles}>
        <IconTabs tabs={tabs} size={'xl'} sxs={TabsStyles} />
      </WithLoader>
    </Card>
  );
};
