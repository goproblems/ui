import {createContext, forwardRef, useContext, useEffect} from 'react';
import {clsx} from 'clsx';
import {DraggableModalDialog, ModalDragContext} from './DraggableModalDialog.js';
import {omitUiProps, renderAs, type AnyProps} from './utils.js';
import {useUiLabels} from './UiProvider.js';

const ModalContext = createContext<{onHide?: () => void}>({});

const ModalBase = forwardRef<HTMLDivElement, AnyProps>(
    (
        {
            backdrop = true,
            centered,
            children,
            className,
            dialogClassName,
            draggable = false,
            fullscreen,
            onHide,
            show,
            size,
            ...props
        },
        ref
    ) => {
        useEffect(() => {
            if (!show) return;
            const onKeyDown = (event: KeyboardEvent) => {
                if (event.key === 'Escape') onHide?.();
            };
            document.addEventListener('keydown', onKeyDown);
            return () => document.removeEventListener('keydown', onKeyDown);
        }, [onHide, show]);

        if (!show) return null;
        const Dialog = draggable ? DraggableModalDialog : 'div';
        return (
            <ModalContext.Provider value={{onHide}}>
                <div
                    className={clsx(
                        'fixed inset-0 z-[1050] flex overflow-y-auto bg-neutral-950/55 p-4',
                        centered ? 'items-center' : 'items-start',
                        className
                    )}
                    onMouseDown={event => {
                        if (backdrop && event.target === event.currentTarget) {
                            onHide?.();
                        }
                    }}>
                    <Dialog
                        {...omitUiProps(props)}
                        ref={ref}
                        role="dialog"
                        aria-modal="true"
                        className={clsx(
                            'relative mx-auto my-auto w-full overflow-visible rounded-lg border border-neutral-200 bg-white text-neutral-900 shadow-2xl dark:border-[var(--ui-border)] dark:bg-[var(--ui-surface)] dark:text-[var(--ui-text)]',
                            size === 'sm'
                                ? 'max-w-sm'
                                : size === 'lg'
                                  ? 'max-w-4xl'
                                  : size === 'xl'
                                    ? 'max-w-6xl'
                                    : 'max-w-lg',
                            fullscreen && 'h-full max-w-none rounded-none',
                            dialogClassName
                        )}>
                        {children}
                    </Dialog>
                </div>
            </ModalContext.Provider>
        );
    }
);
const ModalHeader = ({closeButton, children, className, onPointerDown, ...props}: AnyProps) => {
    const {onHide} = useContext(ModalContext);
    const startDrag = useContext(ModalDragContext);
    const labels = useUiLabels();
    return (
        <div
            {...omitUiProps(props)}
            onPointerDown={event => {
                onPointerDown?.(event);
                startDrag?.(event);
            }}
            className={clsx(
                'flex items-center justify-between border-b border-neutral-200 px-4 py-3 dark:border-[var(--ui-border)]',
                startDrag && 'cursor-grab touch-none select-none active:cursor-grabbing',
                className
            )}>
            {children}
            {closeButton && (
                <button
                    type="button"
                    onClick={onHide}
                    aria-label={labels.close}
                    className="ml-4 cursor-pointer rounded p-1 text-2xl leading-none opacity-60 hover:bg-neutral-100 hover:opacity-100 dark:hover:bg-[var(--ui-surface-muted)]">
                    ×
                </button>
            )}
        </div>
    );
};
const ModalTitle = (props: AnyProps) =>
    renderAs('h5', props, 'text-lg font-semibold');
const ModalBody = (props: AnyProps) => renderAs('div', props, 'p-4');
const ModalFooter = (props: AnyProps) =>
    renderAs(
        'div',
        props,
        'flex flex-wrap items-center justify-end gap-2 border-t border-neutral-200 px-4 py-3 dark:border-[var(--ui-border)]'
    );
export const Modal = Object.assign(ModalBase, {
    Body: ModalBody,
    Footer: ModalFooter,
    Header: ModalHeader,
    Title: ModalTitle,
});
