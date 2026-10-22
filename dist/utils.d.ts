import { type ElementType } from 'react';
export type AnyProps = Record<string, any>;
export type SelectKey = string | number | null;
export type Placement = 'auto' | 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' | 'left-start' | 'left-end' | 'right-start' | 'right-end';
export type OverlayInjectedProps = AnyProps;
export declare const omitUiProps: (props: AnyProps) => {
    [x: string]: any;
};
export declare const renderAs: (defaultAs: ElementType, props: AnyProps, className?: string) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=utils.d.ts.map