'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const App = dynamic(() => import('../../App'), {
  ssr: false,
});

export function ClientOnly() {
  // Track whether client-side hydration is complete
  const [isClient, setIsClient] = useState(false);

  /**
   * React will only run this effect after the component mounts, which means hydration
   * is complete and it's safe to initialize React Router.
   * The state delay prevents React Router from initializing during hydration,
   * which would conflict with Next.js App Router breaking the app's navigation.
   * This should not be needed when we complete the migration to Next.js App Router.
   */
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Prevents hydration mismatch errors
  }

  // Once hydration is completed, it's safe to render the components using React Router
  return <App />;
}
