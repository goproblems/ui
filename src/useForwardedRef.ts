import {useCallback, useRef, type ForwardedRef} from 'react';

export const useForwardedRef = <T,>(ref: ForwardedRef<T>) => {
    const elementRef = useRef<T | null>(null);
    const setRef = useCallback(
        (element: T | null) => {
            elementRef.current = element;
            if (typeof ref === 'function') {
                ref(element);
            } else if (ref) {
                ref.current = element;
            }
        },
        [ref]
    );

    return [elementRef, setRef] as const;
};
