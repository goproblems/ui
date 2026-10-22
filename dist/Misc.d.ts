import { type AnyProps } from './utils.js';
export declare const Pagination: ((props: AnyProps) => import("react").JSX.Element) & {
    Ellipsis: ({ children, ...props }: AnyProps) => import("react").JSX.Element;
    First: ({ children, ...props }: AnyProps) => import("react").JSX.Element;
    Item: import("react").ForwardRefExoticComponent<Omit<AnyProps, "ref"> & import("react").RefAttributes<HTMLElement>>;
    Last: ({ children, ...props }: AnyProps) => import("react").JSX.Element;
    Next: ({ children, ...props }: AnyProps) => import("react").JSX.Element;
    Prev: ({ children, ...props }: AnyProps) => import("react").JSX.Element;
};
export declare const ProgressBar: import("react").ForwardRefExoticComponent<Omit<AnyProps, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
export declare const Placeholder: import("react").ForwardRefExoticComponent<Omit<AnyProps, "ref"> & import("react").RefAttributes<HTMLElement>>;
export declare const Image: import("react").ForwardRefExoticComponent<Omit<AnyProps, "ref"> & import("react").RefAttributes<HTMLImageElement>>;
//# sourceMappingURL=Misc.d.ts.map