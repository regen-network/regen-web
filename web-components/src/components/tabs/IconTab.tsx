import React from 'react';
import Tab, { TabProps } from '@mui/material/Tab';
import { styled } from '@mui/material';

import { Subtitle } from '../typography/Subtitle';
import { RegenTab } from './';

export interface IconTabProps extends RegenTab {
  label: string;
  icon?: JSX.Element;
  hidden?: boolean;
}

const StyledTab = styled(Tab)<TabProps>(({ theme }) => ({
  textTransform: 'none',
  borderColor: theme.palette.secondary.main,
  color: theme.palette.primary.contrastText,
  minHeight: '40px',
  paddingLeft: 0,
  paddingRight: 0,
  margin: '0 12px',
  '&.Mui-selected': {
    color: theme.palette.primary.contrastText,
  },
  '& .MuiSvgIcon-root': {
    color: theme.palette.secondary.main,
  },
}));

const IconTab: React.FC<IconTabProps> = ({ label, hidden, ...props }) => {
  return hidden ? null : (
    <StyledTab
      iconPosition="start"
      label={
        <Subtitle size="lg" sx={{ ml: 1 }}>
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
