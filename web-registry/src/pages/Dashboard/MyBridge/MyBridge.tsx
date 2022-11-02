import { Box } from 'web-components/lib/components/box';
import Card from 'web-components/lib/components/cards/Card';
import { IconTabProps } from 'web-components/lib/components/tabs/IconTab';
import { IconTabs } from 'web-components/lib/components/tabs/IconTabs';

import { BridgableEcocreditsTable } from 'components/organisms/BridgableEcocreditsTable/BridgableEcocreditsTable';
import { BridgedEcocreditsTable } from 'components/organisms/BridgedEcocreditsTable/BridgedEcocreditsTable';

import { BridgeInfo } from './MyBridge.BridgeInfo';
import { cardStyles, tabsStyles, wrapperStyles } from './MyBridge.styles';

const tabs: IconTabProps[] = [
  {
    label: 'Bridgable ecocredits',
    content: <BridgableEcocreditsTable />,
  },
  {
    label: 'Bridged ecocredits',
    content: <BridgedEcocreditsTable />,
  },
];

export const MyBridge = (): JSX.Element => {
  return (
    <Box sx={wrapperStyles}>
      <Card sx={cardStyles}>
        <IconTabs tabs={tabs} size={'xl'} sxs={tabsStyles} />
      </Card>
      <BridgeInfo />
    </Box>
  );
};
