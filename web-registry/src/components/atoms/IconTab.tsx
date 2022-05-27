import React from 'react';
import Tab, { TabProps } from '@mui/material/Tab';
import { styled } from '@mui/material';
import { Subtitle } from 'web-components/lib/components/typography/Subtitle';

interface Props extends TabProps {
  label: string;
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

const a11yProps = (index: number): { id: string; 'aria-controls': string } => {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
};

const IconTab: React.FC<Props> = ({ label, hidden, ...props }) => {
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

export { IconTab, a11yProps };
