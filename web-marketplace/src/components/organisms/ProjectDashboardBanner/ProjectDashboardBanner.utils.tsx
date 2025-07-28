import { useCallback, useEffect, useState } from 'react';

export function useIsMobile(breakpoint = 968): boolean {
  const getMatches = useCallback(
    () =>
      typeof window !== 'undefined' ? window.innerWidth <= breakpoint : false,
    [breakpoint],
  );
  const [isMobile, setIsMobile] = useState<boolean>(getMatches);

  useEffect(() => {
    const onResize = () => setIsMobile(getMatches());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [breakpoint, getMatches]);

  return isMobile;
}

export function truncateEnd(text: string, maxLength: number): string {
  return text && text.length > maxLength
    ? `${text.slice(0, maxLength)}…`
    : text;
}
