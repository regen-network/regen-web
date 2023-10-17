import BridgeIcon from 'web-components/lib/components/icons/BridgeIcon';
import { CreditBatchIcon } from 'web-components/lib/components/icons/CreditBatchIcon';
import { CreditClassIcon } from 'web-components/lib/components/icons/CreditClassIcon';
import CreditsIcon from 'web-components/lib/components/icons/CreditsIcon';
import { ProjectPageIcon } from 'web-components/lib/components/icons/ProjectPageIcon';

export const PORTFOLIO = {
  label: 'Portfolio',
  href: '/profile/portfolio',
  icon: <CreditsIcon fontSize="small" />,
};
export const PROJECTS = {
  label: 'Projects',
  href: '/profile/projects',
  icon: <ProjectPageIcon />,
};
export const CREDIT_CLASSES = {
  label: 'Credit Classes',
  href: '/profile/credit-classes',
  icon: <CreditClassIcon />,
};
export const CREDIT_BATCHES = {
  label: 'Credit Batches',
  href: '/profile/credit-batches',
  icon: <CreditBatchIcon />,
};
export const BRIDGE = {
  label: 'Bridge',
  href: '/profile/bridge',
  icon: <BridgeIcon />,
};
