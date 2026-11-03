import {useId, useState, type ReactNode} from 'react';
import {clsx} from 'clsx';
import {OverlayTrigger} from './Overlay.js';
import type {Placement} from './utils.js';

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

export const HelpPopover = ({
    label,
    children,
    title,
    titleIcon,
    footer,
    placement = 'top-start',
    className,
    popoverClassName,
}: HelpPopoverProps) => {
    const id = useId();
    const [show, setShow] = useState(false);

    return (
        <OverlayTrigger
            show={show}
            onToggle={setShow}
            trigger={['hover', 'focus']}
            rootClose
            placement={placement}
            overlay={
                <div
                    id={id}
                    role="tooltip"
                    data-ui="help-popover"
                    className={clsx('ui-help-popover', popoverClassName)}>
                    {title && (
                        <div className="ui-help-popover-heading">
                            {titleIcon && <span className="ui-help-popover-icon" aria-hidden="true">{titleIcon}</span>}
                            {title}
                        </div>
                    )}
                    <div className="ui-help-popover-body">{children}</div>
                    {footer && <div className="ui-help-popover-footer">{footer}</div>}
                </div>
            }>
            <button
                type="button"
                data-ui="help-popover-trigger"
                className={clsx('ui-help-popover-trigger', className)}
                aria-label={label}
                aria-describedby={show ? id : undefined}
                aria-expanded={show}
                onClick={() => setShow(true)}
                onKeyDown={event => {
                    if (event.key === 'Escape') setShow(false);
                }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3"/>
                    <path d="M12 17h.01"/>
                </svg>
            </button>
        </OverlayTrigger>
    );
};
