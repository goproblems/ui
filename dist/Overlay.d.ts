import { type AnyProps } from './utils.js';
declare const PopoverHeader: (props: AnyProps) => import("react/jsx-runtime").JSX.Element;
export declare const Popover: import("react").ForwardRefExoticComponent<Omit<AnyProps, "ref"> & import("react").RefAttributes<HTMLDivElement>> & {
    Body: (props: AnyProps) => import("react/jsx-runtime").JSX.Element;
    Header: (props: AnyProps) => import("react/jsx-runtime").JSX.Element;
};
export { PopoverHeader };
export declare const Tooltip: import("react").ForwardRefExoticComponent<Omit<AnyProps, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
export declare const OverlayTrigger: ({ children, defaultShow, onEnter, onExited, onToggle, overlay, placement, rootClose, show, trigger, wrapperClassName, }: AnyProps) => import("react/jsx-runtime").JSX.Element;
export declare const Overlay: ({ children, placement, show, target, rootClose, onHide, ...props }: AnyProps) => import("react").ReactPortal | null;
//# sourceMappingURL=Overlay.d.ts.map