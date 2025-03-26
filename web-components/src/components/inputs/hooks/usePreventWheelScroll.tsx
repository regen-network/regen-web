import { RefObject, useEffect } from 'react';

/**
 * Hook that prevents the default scroll behavior on mouse wheel events
 * for the provided element reference when it's focused
 *
 * @param elementRef - A React ref object pointing to a DOM element
 */
export default function usePreventWheelScroll(
  elementRef: RefObject<HTMLElement>,
  shouldPreventScroll = true,
): void {
  useEffect(() => {
    const currentRef = elementRef.current;
    if (!currentRef || !shouldPreventScroll) return;

    const preventScrollOnWheel = (e: WheelEvent) => {
      e.preventDefault();
    };

    const handleFocus = () => {
      currentRef.addEventListener('wheel', preventScrollOnWheel, {
        passive: false,
      });
    };

    const handleBlur = () => {
      currentRef.removeEventListener('wheel', preventScrollOnWheel);
    };

    currentRef.addEventListener('focus', handleFocus);
    currentRef.addEventListener('blur', handleBlur);

    return () => {
      currentRef.removeEventListener('focus', handleFocus);
      currentRef.removeEventListener('blur', handleBlur);
      // Also clean up the wheel event listener in case the component unmounts while focused
      currentRef.removeEventListener('wheel', preventScrollOnWheel);
    };
  }, [elementRef, shouldPreventScroll]);
}
