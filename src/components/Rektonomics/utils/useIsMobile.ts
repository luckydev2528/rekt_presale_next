import { useEffect, useState } from 'react';


export const useIsMobile = (breakpoint: number = 767): boolean => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia === 'undefined') {

      return;
    }

    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const update = () => setIsMobile(mediaQuery.matches);


    update();


    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', update);
      return () => mediaQuery.removeEventListener('change', update);
    } else {

      mediaQuery.addListener(update);
      return () => mediaQuery.removeListener(update);
    }
  }, [breakpoint]);

  return isMobile;
};
