import { msg } from '@lingui/macro';

import BridgeIcon from 'web-components/src/components/icons/BridgeIcon';
import { CogIcon } from 'web-components/src/components/icons/CogIcon';
import { CreditBatchIcon } from 'web-components/src/components/icons/CreditBatchIcon';
import { CreditClassIcon } from 'web-components/src/components/icons/CreditClassIcon';
import CreditsIcon from 'web-components/src/components/icons/CreditsIcon';
import EditIcon from 'web-components/src/components/icons/EditIcon';
import { ProjectPageIcon } from 'web-components/src/components/icons/ProjectPageIcon';

import { NOT_SUPPORTED_TOOLTIP_TEXT } from './MyProjects/MyProjects.constants';

const className = 'pl-20';
const labelClassName = 'text-sm';

export const SEPARATOR = {
  children: <div className="h-1 bg-grey-300 w-[280px] my-[14px]" />,
};

export const PORTFOLIO = {
  label: msg`Portfolio`,
  href: '/profile/portfolio',
  icon: <CreditsIcon fontSize="small" linearGradient />,
  className,
};
export const PROJECTS = {
  label: msg`Projects`,
  href: '/profile/projects',
  icon: <ProjectPageIcon linearGradient />,
  className,
};
export const CREDIT_CLASSES = {
  label: msg`Credit Classes`,
  href: '/profile/credit-classes',
  icon: <CreditClassIcon linearGradient />,
  className,
};
export const CREDIT_BATCHES = {
  label: msg`Credit Batches`,
  href: '/profile/credit-batches',
  icon: <CreditBatchIcon linearGradient />,
  className,
};
export const BRIDGE = {
  label: msg`Bridge`,
  href: '/profile/bridge',
  icon: <BridgeIcon linearGradient />,
  className,
};
export const EDIT_PROFILE = {
  label: msg`Edit profile`,
  href: '/profile/edit/profile',
  icon: <EditIcon className="w-[24px] h-[24px] text-[18px]" linearGradient />,
  labelClassName,
  className,
  disabledTooltipText: NOT_SUPPORTED_TOOLTIP_TEXT,
};
export const PROFILE_SETTINGS = {
  label: msg`Settings`,
  href: '/profile/edit/settings',
  icon: <CogIcon linearGradient />,
  labelClassName,
  className,
  disabledTooltipText: NOT_SUPPORTED_TOOLTIP_TEXT,
};
