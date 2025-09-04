'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const App = dynamic(() => import('../../../App'), {
  ssr: false,
});

export function ClientOnly() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return <App />;
}

