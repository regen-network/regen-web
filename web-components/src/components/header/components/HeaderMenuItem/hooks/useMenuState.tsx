import { useEffect, useState } from 'react';
import { useMediaQuery } from '@mui/material';

/**
 * Manages dropdown menu interactions for both mouse and touch devices.
 * Provides smooth transitions by coordinating animations with state changes.
 */
export const useMenuState = (pathname: string) => {
  // eslint-disable-next-line lingui/no-unlocalized-strings
  const isTouchScreen = useMediaQuery('(pointer: coarse)');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // This state prevents animation flicker on initial page load
  const [hasInteracted, setHasInteracted] = useState(false);

  const openMenu = () => {
    // Track first interaction to enable animations only after user engagement
    if (!hasInteracted) setHasInteracted(true);
    setIsMenuOpen(true);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Toggle needed for touch devices where hover isn't available
  const toggleMenu = () => {
    requestAnimationFrame(() => {
      setIsMenuOpen(prev => !prev);
    });
  };

  // Reset on route change prevents ghost menus when navigating
  useEffect(() => {
    setIsMenuOpen(false);
    setHasInteracted(false);
  }, [pathname]);

  return {
    isMenuOpen,
    hasInteracted,
    isTouchScreen,
    openMenu,
    closeMenu,
    toggleMenu,
  };
};
