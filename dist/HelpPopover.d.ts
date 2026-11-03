import { type ReactNode } from 'react';
import type { Placement } from './utils.js';
export type HelpPopoverProps = {
    label: string;
    children: ReactNode;
    title?: ReactNode;
    titleIcon?: ReactNode;
    footer?: ReactNode;
    placement?: Placement;
    className?: string;
    popoverClassName?: string;
};
export declare const HelpPopover: ({ label, children, title, titleIcon, footer, placement, className, popoverClassName, }: HelpPopoverProps) => import("react").JSX.Element;
//# sourceMappingURL=HelpPopover.d.ts.map