import React from 'react';
import { styled, SxProps } from '@mui/material';
import Tab, { TabProps } from '@mui/material/Tab';

import type { Theme } from 'src/theme/muiTheme';

import { TextSize } from '../typography/sizing';
import { Subtitle } from '../typography/Subtitle';
import { RegenTab } from './';

export interface IconTabProps extends RegenTab {
  icon?: JSX.Element;
  hidden?: boolean;
  size?: TextSize;
  sxInner?: SxProps<Theme>;
}

const StyledTab = styled(Tab, {
  shouldForwardProp: prop => prop !== 'size',
})<TabProps & { size: TextSize }>(({ theme, size }) => ({
  textTransform: 'none',
  borderColor: theme.palette.secondary.main,
  color: theme.palette.primary.contrastText,
  minHeight: '40px',
  paddingLeft: 0,
  paddingRight: 0,
  margin: '0 12px',
  [theme.breakpoints.up('sm')]: {
    margin: size === 'xl' ? '0 25px' : '0 12px',
  },
  '&.Mui-selected': {
    color: theme.palette.primary.contrastText,
  },
  '& .MuiSvgIcon-root': {
    color: theme.palette.secondary.main,
  },
}));

const IconTab = ({
  label,
  hidden,
  size = 'lg',
  sxInner,
  ...props
}: IconTabProps): JSX.Element | null => {
  return hidden ? null : (
    <StyledTab
      iconPosition="start"
      size={size}
      label={
        <Subtitle size={size} sx={{ ml: 1, ...sxInner }}>
          {label}
        </Subtitle>
      }
      {...props}
    >
      {props.children}
    </StyledTab>
  );
};

export { IconTab };
