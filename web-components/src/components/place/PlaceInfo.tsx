import React from 'react';
import { Box, styled } from '@mui/material';

import PinIcon from '../icons/PinIcon';
import { Body } from '../typography';

interface PlaceInfoProps {
  children?: any;
  fontSize?: string;
  smFontSize?: string;
  color?: string;
  className?: string;
  iconClassName?: string;
  showIcon?: boolean;
}

interface BodyStyleProps {
  color?: string;
  fontSizeOverride?: string;
  smFontSizeOverride?: string;
}

// TODO: this was converted from old MUI makestyles, and I haven't throughly tested the logic works
const StyledBody = styled(Body, {
  shouldForwardProp: prop =>
    prop !== 'fontSizeOverride' && prop !== 'smFontSizeOverride',
})<BodyStyleProps>(
  ({ theme, fontSizeOverride, smFontSizeOverride, color }) => ({
    color: color || theme.palette.primary.contrastText,
    [theme.breakpoints.up('xs')]: {
      fontSize: smFontSizeOverride || fontSizeOverride || theme.spacing(3.5),
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: fontSizeOverride || theme.spacing(4.5),
    },
  }),
);

export default function PlaceInfo({
  children,
  fontSize,
  color,
  smFontSize,
  iconClassName,
  showIcon,
}: PlaceInfoProps): JSX.Element {
  return (
    <Box sx={{ display: 'flex' }}>
      {showIcon && (
        <Box component="span" className={iconClassName} sx={{ mr: 1.6 }}>
          <PinIcon />
        </Box>
      )}
      <StyledBody
        color={color}
        fontSizeOverride={fontSize}
        smFontSizeOverride={smFontSize}
      >
        {children}
      </StyledBody>
    </Box>
  );
}
