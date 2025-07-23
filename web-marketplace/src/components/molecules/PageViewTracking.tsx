'use client';
import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useAnalytics } from 'use-analytics';

export const PageViewTracking: React.FC = (): JSX.Element => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { plugins, page } = useAnalytics();

  useEffect(() => {
    // user opt-in, right now we just enable all of the analytics
    // providers. but this shows how to conditional enable or even
    // disable certain providers. NEXT_PUBLIC_ANALYTICS_ENABLED is
    // the flag used so that analytics is only enabled in production.
    if (process.env.NEXT_PUBLIC_ANALYTICS_ENABLED && plugins) {
      plugins.enable(['amplitude', 'google-analytics']).then(() => {});
    }
  }, [plugins]);

  useEffect(() => {
    // send page view whenever location changes
    // this sends page views to all analytics plugins:
    // https://getanalytics.io/plugins/
    page({
      path: pathname,
      search: searchParams.toString(),
      title: pathname,
    });
  }, [pathname, searchParams, page]);
  return <></>;
};
