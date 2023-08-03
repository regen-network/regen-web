import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const whitelist = ['ecocredit-batches'];

function ScrollToTop(): null {
  const { pathname } = useLocation();

  useEffect(() => {
    if (!whitelist.some(route => pathname.includes(route)))
      window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export { ScrollToTop };
