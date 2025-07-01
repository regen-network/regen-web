'use client';
import { useEffect } from 'react';
import amplitudePlugin from '@analytics/amplitude';
import googleAnalytics from '@analytics/google-analytics';
import Analytics from 'analytics';
import doNotTrack from 'analytics-plugin-do-not-track';
import { usePathname, useSearchParams } from 'next/navigation';
import { AnalyticsProvider } from 'use-analytics';

const analytics = Analytics({
  plugins: [
    doNotTrack(),
    amplitudePlugin({
      apiKey: process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY,
      // by default we will not track users, they must opt-in.
      enabled: false,
    }),
    googleAnalytics({
      measurementIds: [process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID],
      enabled: false,
      gtagConfig: {
        anonymize_ip: true,
      },
    }),
  ],
  // see here for debugging tools:
  // https://getanalytics.io/debugging/
  debug: process.env.NODE_ENV === 'development',
});

export function AnalyticsWrapper({ children }: React.PropsWithChildren) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    analytics.page();
  }, [pathname, searchParams]);

  return <AnalyticsProvider instance={analytics}>{children}</AnalyticsProvider>;
}
