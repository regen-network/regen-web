import { NO_CREDITS_TOOLTIP, SOLD_OUT_TOOLTIP } from '../Projects.constants';
import { ProjectWithOrderData } from '../Projects.types';

type Params = {
  project?: ProjectWithOrderData;
  isSoldOut: boolean;
};

export const getCreditsTooltip = ({
  project,
  isSoldOut,
}: Params): string | undefined => {
  if (isSoldOut) return SOLD_OUT_TOOLTIP;
  if (
    !project?.purchaseInfo?.sellInfo?.creditsAvailable &&
    !project?.projectPrefinancing?.isPrefinanceProject
  )
    return NO_CREDITS_TOOLTIP;

  return undefined;
};
