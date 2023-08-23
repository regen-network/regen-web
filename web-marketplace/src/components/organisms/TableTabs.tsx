import { Box, SxProps, useTheme } from '@mui/material';
import { sxToArray } from 'utils/mui/sxToArray';

import { IconTabProps } from 'web-components/lib/components/tabs/IconTab';
import { IconTabs } from 'web-components/lib/components/tabs/IconTabs';
import {
  containerPaddingX,
  containerStyles,
} from 'web-components/lib/styles/container';
import { Theme } from 'web-components/lib/theme/muiTheme';

type Props = {
  sx?: SxProps<Theme>;
  tabs: IconTabProps[];
};

export const TableTabs = ({ tabs, sx = [] }: Props) => {
  const theme = useTheme();
  if (tabs.length === 0) {
    return null;
  }
  return (
    <Box
      sx={[
        { ...containerStyles },
        { ...containerPaddingX },
        { paddingTop: { xs: 20, sm: 27.5 } },
        { paddingBottom: { xs: 20, sm: 25 } },
        ...sxToArray(sx),
      ]}
    >
      <IconTabs
        tabs={tabs}
        size="xl"
        sxs={{
          tab: {
            outer: {
              border: `1px solid ${theme.palette.info.light}`,
              borderBottom: 0,
              borderRadius: '8px 8px 0 0',
              backgroundColor: 'primary.main',
            },
            innerContainer: {
              paddingTop: 8.5,
              paddingBottom: 6.25,
              '&:first-child': {
                marginLeft: { xs: 4, sm: 8.5 },
              },
            },
          },
          panel: { inner: { p: 0 } },
        }}
      />
    </Box>
  );
};
