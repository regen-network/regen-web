import BridgeIcon from 'web-components/src/components/icons/BridgeIcon';
import { CogIcon } from 'web-components/src/components/icons/CogIcon';
import { CreditBatchIcon } from 'web-components/src/components/icons/CreditBatchIcon';
import { CreditClassIcon } from 'web-components/src/components/icons/CreditClassIcon';
import CreditsIcon from 'web-components/src/components/icons/CreditsIcon';
import EditIcon from 'web-components/src/components/icons/EditIcon';
import { ProjectPageIcon } from 'web-components/src/components/icons/ProjectPageIcon';

const className = 'pl-20';
const labelClassName = 'text-sm';

export const SEPARATOR = {
  children: <div className="h-1 bg-grey-300 w-[280px] my-[14px]" />,
};

export const PORTFOLIO = {
  label: 'Portfolio',
  href: '/profile/portfolio',
  icon: <CreditsIcon fontSize="small" />,
  className,
};
export const PROJECTS = {
  label: 'Projects',
  href: '/profile/projects',
  icon: <ProjectPageIcon />,
  className,
};
export const CREDIT_CLASSES = {
  label: 'Credit Classes',
  href: '/profile/credit-classes',
  icon: <CreditClassIcon />,
  className,
};
export const CREDIT_BATCHES = {
  label: 'Credit Batches',
  href: '/profile/credit-batches',
  icon: <CreditBatchIcon />,
  className,
};
export const BRIDGE = {
  label: 'Bridge',
  href: '/profile/bridge',
  icon: <BridgeIcon />,
  className,
};
export const EDIT_PROFILE = {
  label: 'Edit profile',
  href: '/profile/edit/profile',
  icon: <EditIcon className="w-[24px] text-[18px]" />,
  labelClassName,
  className,
};
export const PROFILE_SETTINGS = {
  label: 'Settings',
  href: '/profile/edit/settings',
  icon: <CogIcon />,
  labelClassName,
  className,
};
