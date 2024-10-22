import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const useNavigateToSlug = (slug?: string | null, path?: string) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!!slug) {
      const hash = location.hash || '';
      navigate(`/project/${slug}${path || ''}${hash}`, { replace: true });
    }
  }, [slug, navigate, location.hash, path]);
};
