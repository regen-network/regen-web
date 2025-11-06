import { ScrollToTop } from 'components/atoms/ScrollToTop';
import { PageViewTracking } from 'components/molecules/PageViewTracking';

import { LayoutCookiesTopBanner } from './Layout.CookiesTopBanner';
import { LayoutModalManager } from './Layout.ModalManager';
import { RetryFailedFunctions } from './Layout.RetryFailedFunctions';

/**
 * Shared layout components used across both Regen and Terrasos providers.
 * These components need to be inside the provider tree to access wallet/chain context.
 */
export const LayoutSharedComponents = () => {
  return (
    <>
      <PageViewTracking />
      <ScrollToTop />
      <RetryFailedFunctions />
      <LayoutCookiesTopBanner />
      <LayoutModalManager />
    </>
  );
};
