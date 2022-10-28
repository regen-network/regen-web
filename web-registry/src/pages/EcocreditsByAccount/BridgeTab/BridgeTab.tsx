import { SxProps } from '@mui/material';

import { Box } from 'web-components/lib/components/box';
import Card from 'web-components/lib/components/cards/Card';
import { IconTabProps } from 'web-components/lib/components/tabs/IconTab';
import { IconTabs } from 'web-components/lib/components/tabs/IconTabs';

import { BridgedEcocreditsTable } from 'components/organisms/BridgedEcocreditsTable/BridgedEcocreditsTable';

const wrapperStyles = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
} as SxProps;

const cardStyles = {
  mb: '20px',
  pt: 0,
  px: 0,
} as SxProps;

const tabsStyles = {
  tab: {
    outer: {
      mt: { xs: '10px', sm: '15px', lg: '20px' },
      mx: { xs: '6px', sm: '8px', lg: '10px' },
    } as SxProps,
    inner: { mb: { xs: '6px', sm: '9px', lg: '12px' }, ml: 0 } as SxProps,
  },
  panel: { inner: { p: 0 } as SxProps },
};

const tabs: IconTabProps[] = [
  {
    label: 'Bridged ecocredits',
    content: <BridgedEcocreditsTable />,
  },
];

export const BridgeTab = (): JSX.Element => {
  return (
    <Box sx={wrapperStyles}>
      <Card sx={cardStyles}>
        <IconTabs tabs={tabs} size={'xl'} hideIndicator sxs={tabsStyles} />
      </Card>
      {/* <BridgeInfo /> */}
    </Box>
  );
};
