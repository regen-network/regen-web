import BridgeIcon from 'web-components/src/components/icons/BridgeIcon';
import { CogIcon } from 'web-components/src/components/icons/CogIcon';
import { CreditBatchIcon } from 'web-components/src/components/icons/CreditBatchIcon';
import { CreditClassIcon } from 'web-components/src/components/icons/CreditClassIcon';
import CreditsIcon from 'web-components/src/components/icons/CreditsIcon';
import EditIcon from 'web-components/src/components/icons/EditIcon';
import { ProjectPageIcon } from 'web-components/src/components/icons/ProjectPageIcon';

export const SEPARATOR = {
  children: <div className="h-1 bg-grey-300 w-full my-5" />,
};

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
export const EDIT_PROFILE = {
  label: 'Edit profile',
  href: '/profile/edit/profile',
  icon: <EditIcon className="w-[24px] text-[18px]" />,
};
export const PROFILE_SETTINGS = {
  label: 'Settings',
  href: '/profile/edit/settings',
  icon: <CogIcon />,
};
