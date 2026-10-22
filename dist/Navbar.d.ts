import { type AnyProps } from './utils.js';
export declare const Navbar: import("react").ForwardRefExoticComponent<Omit<AnyProps, "ref"> & import("react").RefAttributes<HTMLElement>> & {
    Collapse: ({ children, className, ...props }: AnyProps) => import("react").JSX.Element;
    Toggle: (props: AnyProps) => import("react").JSX.Element;
};
export declare const NavDropdown: (({ children, className, title, align, menuClassName, show, onSelect, onToggle, ["data-qa"]: dataQa, ...props }: AnyProps) => import("react").JSX.Element) & {
    Divider: (props: AnyProps) => import("react").JSX.Element;
    Item: import("react").ForwardRefExoticComponent<Omit<AnyProps, "ref"> & import("react").RefAttributes<HTMLElement>>;
};
//# sourceMappingURL=Navbar.d.ts.map