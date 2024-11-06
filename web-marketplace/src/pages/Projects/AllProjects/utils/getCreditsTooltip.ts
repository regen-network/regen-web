import { IS_REGEN } from 'lib/env';
import { TranslatorType } from 'lib/i18n/i18n.types';
import { NormalizeProject } from 'lib/normalizers/projects/normalizeProjectsWithMetadata';

import { NO_CREDITS_TOOLTIP, SOLD_OUT_TOOLTIP } from '../AllProjects.constants';

type Params = {
  project?: NormalizeProject;
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
    IS_REGEN &&
    !project?.purchaseInfo?.sellInfo?.creditsAvailable &&
    !project?.projectPrefinancing?.isPrefinanceProject
  )
    return _(NO_CREDITS_TOOLTIP);

  return undefined;
};
