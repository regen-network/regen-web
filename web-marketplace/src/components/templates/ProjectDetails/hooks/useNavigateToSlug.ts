import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

/**
 * A hook that navigates to a slug-based project route if a slug is provided.
 *
 * @param slug - An optional string or null value representing the project's slug.
 * @param path - An optional string to append to the slug-based URL.
 * @returns A boolean indicating whether the navigation has completed.
 */
export const useNavigateToSlug = (slug?: string | null, path?: string) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isRedirecting, setIsRedirecting] = useState(!!slug);
  const prevLocation = useRef(location.pathname);

  // Trigger redirect if slug exists
  useEffect(() => {
    if (slug && prevLocation.current === location.pathname) {
      const hash = location.hash || '';
      navigate(`/project/${slug}${path || ''}${hash}`, { replace: true });
      prevLocation.current = location.pathname;
      setIsRedirecting(false);
    }
  }, [slug, path, location.hash, location.pathname, navigate]);

  return isRedirecting;
};
