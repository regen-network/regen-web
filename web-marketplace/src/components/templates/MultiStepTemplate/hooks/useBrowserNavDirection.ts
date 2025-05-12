import { useEffect, useRef, useState } from 'react';

/**
 * useBrowserNavDirection
 *
 * Custom hook to detect browser back and forward button navigation.
 * - Starts with both flags false on mount
 * - Clears flags on any UI-driven navigation (pushState/replaceState)
 * - Sets { back: true } or { forward: true } on popstate (back/forward button)
 *
 * @returns {{ back: boolean; forward: boolean }} Navigation direction flags
 */
export function useBrowserNavDirection() {
  const [browserNavDirection, setBrowserNavDirection] = useState({
    back: false,
    forward: false,
  });
  const idxRef = useRef(0);

  useEffect(() => {
    const originalPush = window.history.pushState;
    const originalReplace = window.history.replaceState;

    // Initialize history index to 0
    window.history.replaceState({ idx: 0 }, document.title);
    idxRef.current = 0;

    // Override pushState: clear flags and increment index
    window.history.pushState = function (state, title, url) {
      setBrowserNavDirection({ back: false, forward: false });
      const newIdx = idxRef.current + 1;
      idxRef.current = newIdx;
      const newState = { ...(state || {}), idx: newIdx };
      return originalPush.call(window.history, newState, title, url);
    };

    // Override replaceState: clear flags, preserve index
    window.history.replaceState = function (state, title, url) {
      setBrowserNavDirection({ back: false, forward: false });
      const newState = { ...(state || {}), idx: idxRef.current };
      return originalReplace.call(window.history, newState, title, url);
    };

    interface HistoryState {
      idx: number;
    }

    const onPopState = (event: PopStateEvent): void => {
      const state = event.state as HistoryState | null;
      if (state && typeof state.idx === 'number') {
        const newIdx = state.idx;
        if (newIdx < idxRef.current) {
          setBrowserNavDirection({ back: true, forward: false });
        } else if (newIdx > idxRef.current) {
          setBrowserNavDirection({ back: false, forward: true });
        }
        idxRef.current = newIdx;
      } else {
        // Treat unknown popstate as UI navigation
        setBrowserNavDirection({ back: false, forward: false });
      }
    };

    window.addEventListener('popstate', onPopState);

    return () => {
      window.removeEventListener('popstate', onPopState);
      window.history.pushState = originalPush;
      window.history.replaceState = originalReplace;
    };
  }, []);

  return { browserNavDirection, setBrowserNavDirection };
}
