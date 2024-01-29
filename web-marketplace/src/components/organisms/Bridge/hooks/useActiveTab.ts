import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { IconTabProps } from 'web-components/src/components/tabs/IconTab';

export function useActiveTab(tabs: IconTabProps[]): number {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const _activeTab = Math.max(
      tabs.findIndex(tab => location.pathname.includes(tab.href ?? '')),
      0,
    );
    setActiveTab(_activeTab);
  }, [location.pathname, tabs]);

  return activeTab;
}
