import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export const useNavigateToSlug = (slug?: string | null, path?: string) => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!!slug) {
      // Preserve the hash if it exists in the current URL
      const hash = typeof window !== 'undefined' ? window.location.hash : '';
      const targetPath = `/project/${slug}${path || ''}${hash}`;
      if (pathname !== targetPath) {
        router.replace(targetPath);
      }
    }
  }, [slug, path, pathname, router]);
};
