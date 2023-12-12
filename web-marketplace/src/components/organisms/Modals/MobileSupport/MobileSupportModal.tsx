import { useEffect, useState } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';

import RegenModal from 'web-components/src/components/modal';
import { Body, Title } from 'web-components/src/components/typography';
import { Theme } from 'web-components/src/theme/muiTheme';

export const MobileSupportModal = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean | null>(null);
  const theme = useTheme<Theme>();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    // triger modal only once
    if (isOpen === null && isMobile) {
      setIsOpen(true);
    }
  }, [isMobile, isOpen]);

  return (
    <RegenModal
      open={Boolean(isOpen)}
      onClose={() => setIsOpen(false)}
      isFullscreenMobile={false}
    >
      <Box
        sx={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}
      >
        <Title variant="h3" sx={{ mb: 5 }}>
          {'This site works better on desktop'}
        </Title>
        <Body mobileSize="md">
          {'We are working on a keplr mobile wallet integration, coming soon.'}
        </Body>
      </Box>
    </RegenModal>
  );
};
