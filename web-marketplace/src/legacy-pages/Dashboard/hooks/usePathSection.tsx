import { useLocation } from 'react-router-dom';

export const usePathSection = () => {
  const { pathname } = useLocation();
  const lastPathItem = pathname.substring(pathname.lastIndexOf('/') + 1);
  const section = lastPathItem !== 'edit' ? lastPathItem : undefined;

  return section;
};
