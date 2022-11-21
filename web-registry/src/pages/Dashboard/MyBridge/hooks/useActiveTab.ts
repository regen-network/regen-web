import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { IconTabProps } from 'web-components/lib/components/tabs/IconTab';

export function useActiveTab(tabs: IconTabProps[]): number {
  const { state } = useLocation();

  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const _activeTab = state?.tab
      ? Math.max(
          tabs.findIndex(tab => tab.label.toLowerCase().includes(state?.tab)),
          0,
        )
      : 0;
    setActiveTab(_activeTab);

    // cleanup: reset location.state.tab
    return () => {
      window.history.replaceState(null, '');
    };
  }, [state, tabs]);

  return activeTab;
}
