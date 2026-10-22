import { type AnyProps } from './utils.js';
export declare const Alert: import("react").ForwardRefExoticComponent<Omit<AnyProps, "ref"> & import("react").RefAttributes<HTMLDivElement>> & {
    Heading: (props: AnyProps) => import("react").JSX.Element;
};
type BadgeAppearance = 'soft' | 'solid';
type BadgeColor = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
type BadgeProps = AnyProps & {
    appearance?: BadgeAppearance;
    bg?: BadgeColor;
    pill?: boolean;
};
export declare const Badge: import("react").ForwardRefExoticComponent<Omit<BadgeProps, "ref"> & import("react").RefAttributes<HTMLElement>>;
export declare const Spinner: import("react").ForwardRefExoticComponent<Omit<AnyProps, "ref"> & import("react").RefAttributes<HTMLSpanElement>>;
export declare const Table: import("react").ForwardRefExoticComponent<Omit<AnyProps, "ref"> & import("react").RefAttributes<HTMLTableElement>>;
export {};
//# sourceMappingURL=Feedback.d.ts.map