import Tabs, { TabsProps } from '@mui/material/Tabs';
import { styled } from '@mui/material';

const StyledTabs = styled(Tabs)<TabsProps>(({ theme }) => ({
  '& .MuiTabs-indicator': {
    backgroundColor: theme.palette.secondary.main,
    height: '3px',
  },
}));

export { StyledTabs };
