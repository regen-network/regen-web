import Card from 'web-components/lib/components/cards/Card';
import { IconTabProps } from 'web-components/lib/components/tabs/IconTab';
import { IconTabs } from 'web-components/lib/components/tabs/IconTabs';

import { BridgableTable } from './MyBridge.BridgableTable';
import { BridgedTable } from './MyBridge.BridgedTable';
import { CardStyles, TabsStyles } from './MyBridge.styles';

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
      <IconTabs tabs={tabs} size={'xl'} sxs={TabsStyles} />
    </Card>
  );
};
