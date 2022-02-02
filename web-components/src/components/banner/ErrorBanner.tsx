import React from 'react';
import { useTheme } from '@mui/styles';

import Banner, { BannerBaseProps } from './';

export default function ErrorBanner({
  text,
  duration = 5000,
}: BannerBaseProps): JSX.Element {
  const theme = useTheme();
  return (
    <Banner text={text} duration={duration} color={theme.palette.error.light} />
  );
}
