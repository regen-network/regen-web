import { TranslatorType } from 'lib/i18n/i18n.types';

import { NO_CREDITS_TOOLTIP, SOLD_OUT_TOOLTIP } from '../AllProjects.constants';
import { ProjectWithOrderData } from '../AllProjects.types';

type Params = {
  project?: ProjectWithOrderData;
  isSoldOut: boolean;
  _: TranslatorType;
};

export const getCreditsTooltip = ({
  project,
  isSoldOut,
  _,
}: Params): string | undefined => {
  if (isSoldOut) return _(SOLD_OUT_TOOLTIP);
  if (
    !project?.purchaseInfo?.sellInfo?.creditsAvailable &&
    !project?.projectPrefinancing?.isPrefinanceProject
  )
    return _(NO_CREDITS_TOOLTIP);

  return undefined;
};
