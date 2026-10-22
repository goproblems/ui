import { useCallback, useRef } from 'react';
export const useForwardedRef = ref => {
  const elementRef = useRef(null);
  const setRef = useCallback(element => {
    elementRef.current = element;
    if (typeof ref === 'function') {
      ref(element);
    } else if (ref) {
      ref.current = element;
    }
  }, [ref]);
  return [elementRef, setRef];
};
//# sourceMappingURL=useForwardedRef.js.map
