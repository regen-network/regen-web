import React from 'react';
import { useTheme } from '@mui/styles';

import Banner, { BannerBaseProps } from './';

export const DEFAULT_DURATION = 5000;

export default function ErrorBanner({
  text,
  duration = DEFAULT_DURATION,
  onClose,
}: BannerBaseProps): JSX.Element {
  const theme = useTheme();
  return (
    <Banner
      text={text}
      duration={duration}
      color={theme.palette.error.dark}
      onClose={onClose}
    />
  );
}
