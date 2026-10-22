import { type ButtonHTMLAttributes, type ElementType } from 'react';
export declare const variantClasses: Record<string, string>;
export declare const sizeClasses: Record<string, string>;
export declare const Button: import("react").ForwardRefExoticComponent<Omit<ButtonHTMLAttributes<HTMLButtonElement>, "size"> & {
    active?: boolean;
    as?: ElementType;
    href?: string;
    size?: "sm" | "lg";
    to?: string;
    variant?: string;
} & import("react").RefAttributes<HTMLElement>>;
//# sourceMappingURL=Button.d.ts.map