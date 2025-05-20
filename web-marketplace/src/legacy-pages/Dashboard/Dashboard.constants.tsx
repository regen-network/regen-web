import { msg } from '@lingui/core/macro';

import BridgeIcon from 'web-components/src/components/icons/BridgeIcon';
import { CreditBatchIcon } from 'web-components/src/components/icons/CreditBatchIcon';
import { CreditClassIcon } from 'web-components/src/components/icons/CreditClassIcon';
import CreditsIcon from 'web-components/src/components/icons/CreditsIcon';
import { ProjectPageIcon } from 'web-components/src/components/icons/ProjectPageIcon';

const className = 'pl-20';

export const PORTFOLIO = {
  label: msg`Portfolio`,
  href: '/dashboard/portfolio',
  icon: <CreditsIcon fontSize="small" linearGradient />,
  className,
};
export const PROJECTS = {
  label: msg`Projects`,
  href: '/dashboard/projects',
  icon: <ProjectPageIcon linearGradient />,
  className,
};
export const CREDIT_CLASSES = {
  label: msg`Credit Classes`,
  href: '/dashboard/credit-classes',
  icon: <CreditClassIcon linearGradient />,
  className,
};
export const CREDIT_BATCHES = {
  label: msg`Credit Batches`,
  href: '/dashboard/credit-batches',
  icon: <CreditBatchIcon linearGradient />,
  className,
};
export const BRIDGE = {
  label: msg`Bridge`,
  href: '/dashboard/bridge',
  icon: <BridgeIcon linearGradient />,
  className,
};
