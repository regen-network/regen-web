'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// List of route segments that should not trigger a scroll reset
const whitelist = ['ecocredit-batches'];

/**
 * Automatically scrolls the page to the top when navigating to a new route,
 * except for routes that contain certain whitelisted segments.
 *
 * This component does not render anything.
 */
function ScrollToTop(): null {
  const pathname = usePathname();

  useEffect(() => {
    if (!whitelist.some(route => pathname.includes(route)))
      window.scrollTo(0, 0);
  }, [pathname]);

  return null; // No UI component, only side effect
}

export { ScrollToTop };
