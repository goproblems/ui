import { type ElementType, type ForwardRefExoticComponent, type HTMLAttributes, type RefAttributes } from 'react';
import { type AnyProps } from './utils.js';
declare const DropdownItem: ForwardRefExoticComponent<Omit<AnyProps, "ref"> & RefAttributes<HTMLElement>>;
declare const DropdownDivider: (props: AnyProps) => import("react/jsx-runtime").JSX.Element;
export declare const Dropdown: ForwardRefExoticComponent<Omit<HTMLAttributes<HTMLDivElement>, "onSelect"> & {
    align?: string;
    as?: ElementType;
    defaultShow?: boolean;
    onSelect?: (key: string | null) => void;
    onToggle?: (show: boolean) => void;
    show?: boolean;
} & RefAttributes<HTMLDivElement>> & {
    Divider: (props: AnyProps) => import("react/jsx-runtime").JSX.Element;
    Item: ForwardRefExoticComponent<Omit<AnyProps, "ref"> & RefAttributes<HTMLElement>>;
    Menu: ForwardRefExoticComponent<Omit<AnyProps, "ref"> & RefAttributes<HTMLDivElement>>;
    Toggle: ForwardRefExoticComponent<Omit<AnyProps, "ref"> & RefAttributes<HTMLElement>>;
};
export declare const DropdownButton: ({ children, id, onSelect, title, variant, ...props }: AnyProps) => import("react/jsx-runtime").JSX.Element;
export declare const ButtonGroup: ForwardRefExoticComponent<Omit<AnyProps, "ref"> & RefAttributes<HTMLDivElement>>;
export declare const ToggleButton: ForwardRefExoticComponent<Omit<AnyProps, "ref"> & RefAttributes<HTMLInputElement>>;
export declare const ToggleButtonGroup: ({ children, className, onChange, type, value, ...props }: AnyProps) => import("react/jsx-runtime").JSX.Element;
export { DropdownDivider, DropdownItem };
//# sourceMappingURL=Dropdown.d.ts.map