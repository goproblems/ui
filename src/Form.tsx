import {forwardRef, useId, type ComponentType, type ElementType, type FormHTMLAttributes, type HTMLAttributes, type InputHTMLAttributes, type LabelHTMLAttributes, type ReactNode, type RefAttributes, type SelectHTMLAttributes, type TextareaHTMLAttributes} from 'react';
import {clsx} from 'clsx';
import {omitUiProps, renderAs, type AnyProps} from './utils.js';

const controlClass =
    'block w-full rounded-md border border-[var(--ui-border)] bg-[var(--ui-surface)] px-3 py-1.5 text-base leading-6 text-[var(--ui-text)] placeholder:text-[var(--ui-text-muted)] focus:outline-none focus-visible:border-[var(--ui-focus-ring)] focus-visible:ring-2 focus-visible:ring-[var(--ui-focus-ring)]/20 disabled:cursor-not-allowed disabled:bg-[var(--ui-surface-active)] disabled:text-[var(--ui-text-muted)]';

type FormProps = FormHTMLAttributes<HTMLFormElement> & {
    validated?: boolean;
};
type SharedFormControlProps = {
    as?: ElementType;
    htmlSize?: number;
    isInvalid?: boolean;
    isValid?: boolean;
    plaintext?: boolean;
    size?: 'sm' | 'lg';
};
type InputFormControlProps = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'size'
> &
    SharedFormControlProps;
type TextareaFormControlProps = TextareaHTMLAttributes<HTMLTextAreaElement> &
    SharedFormControlProps & {as: 'textarea'};
type FormControlComponent = {
    (props: TextareaFormControlProps & RefAttributes<HTMLTextAreaElement>): ReactNode;
    (props: InputFormControlProps & RefAttributes<HTMLInputElement>): ReactNode;
    Feedback: ComponentType<AnyProps>;
};
type FormSelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> & {
    htmlSize?: number;
    isInvalid?: boolean;
    isValid?: boolean;
    size?: 'sm' | 'lg';
};
type FormCheckProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
    inline?: boolean;
    label?: ReactNode;
    reverse?: boolean;
    type?: InputHTMLAttributes<HTMLInputElement>['type'] | 'switch';
};
type FormGroupProps = HTMLAttributes<HTMLDivElement> & {
    as?: ElementType;
    controlId?: string;
};
type FormLabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
    column?: boolean | string;
};

const FormBase = forwardRef<HTMLFormElement, FormProps>((props, ref) => (
    <form {...omitUiProps(props)} ref={ref} className={props.className}>
        {props.children}
    </form>
));
FormBase.displayName = 'Form';

const FormGroup = forwardRef<HTMLDivElement, FormGroupProps>((props, ref) => (
    <div
        {...omitUiProps(props)}
        ref={ref}
        className={clsx('mb-0.5 md:mb-0', props.className)}>
        {props.children}
    </div>
));
FormGroup.displayName = 'Form.Group';

const FormLabel = forwardRef<HTMLLabelElement, FormLabelProps>((props, ref) => (
    <label
        {...omitUiProps(props)}
        ref={ref}
        className={clsx(
            'mb-2 inline-block text-base font-normal',
            props.className
        )}>
        {props.children}
    </label>
));
FormLabel.displayName = 'Form.Label';

const FormControlBase = forwardRef<HTMLElement, AnyProps>(
    (
        {
            as = 'input',
            children,
            className,
            htmlSize,
            isInvalid,
            isValid,
            plaintext,
            type,
            ...props
        },
        ref
    ) => {
        const Component = as;
        return (
            <Component
                {...omitUiProps(props)}
                ref={ref}
                type={type}
                size={htmlSize}
                aria-invalid={isInvalid || undefined}
                className={clsx(
                    plaintext
                        ? 'block w-full border-0 bg-transparent px-0 py-2'
                        : controlClass,
                    isInvalid &&
                        'border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/25',
                    isValid &&
                        'border-emerald-500 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/25',
                    className
                )}>
                {children}
            </Component>
        );
    }
);
FormControlBase.displayName = 'Form.Control';

export const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
    ({className, children, ...props}, ref) => (
        <select
            {...omitUiProps(props)}
            ref={ref}
            className={clsx(controlClass, 'h-[38px] pr-9', className)}>
            {children}
        </select>
    )
);
FormSelect.displayName = 'Form.Select';

const FormCheckBase = forwardRef<HTMLInputElement, FormCheckProps>(
    (
        {
            children,
            className,
            disabled,
            id,
            inline,
            label,
            reverse,
            type = 'checkbox',
            ...props
        },
        ref
    ) => {
        const generatedId = useId();
        const inputId = id ?? generatedId;
        const isSwitch = type === 'switch';

        if (isSwitch) {
            const content = label ?? children;

            return (
                <label
                    className={clsx(
                        'mb-0.5 min-h-7 cursor-pointer select-none items-center gap-3',
                        inline ? 'mr-4 inline-flex' : 'flex',
                        reverse && 'flex-row-reverse justify-between',
                        disabled && 'cursor-not-allowed opacity-60',
                        className
                    )}>
                    <input
                        {...omitUiProps(props)}
                        ref={ref}
                        id={inputId}
                        disabled={disabled}
                        type="checkbox"
                        role="switch"
                        className="peer sr-only"
                    />
                    <span
                        aria-hidden="true"
                        className="relative inline-flex h-6 w-11 shrink-0 rounded-full bg-neutral-300 shadow-inner ring-1 ring-inset ring-neutral-900/10 transition-colors duration-200 ease-in-out after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow-sm after:ring-1 after:ring-black/10 after:transition-transform after:duration-200 after:ease-in-out after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-5 peer-focus-visible:ring-2 peer-focus-visible:ring-blue-600 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-white dark:bg-neutral-600 dark:ring-white/10 dark:peer-checked:bg-blue-500 dark:peer-focus-visible:ring-offset-neutral-900 motion-reduce:transition-none motion-reduce:after:transition-none"
                    />
                    {content && (
                        <span className="leading-6 text-[var(--ui-text)]">
                            {content}
                        </span>
                    )}
                </label>
            );
        }

        return (
            <div
                className={clsx(
                    'mb-0.5 flex min-h-6 items-center gap-2',
                    inline && 'mr-4 inline-flex',
                    reverse && 'flex-row-reverse justify-between',
                    className
                )}>
                <input
                    {...omitUiProps(props)}
                    ref={ref}
                    id={inputId}
                    disabled={disabled}
                    type={type}
                    className="h-4 w-4 accent-blue-600 border-neutral-300 text-blue-600 focus:ring-blue-600"
                />
                {(label ?? children) && (
                    <label
                        htmlFor={inputId}
                        className={clsx(
                            'text-base',
                            disabled && 'cursor-not-allowed opacity-60'
                        )}>
                        {label ?? children}
                    </label>
                )}
            </div>
        );
    }
);
FormCheckBase.displayName = 'Form.Check';

const FormCheckInput = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
    ({className, ...props}, ref) => (
        <input
            {...props}
            ref={ref}
            className={clsx(
                'h-4 w-4 accent-blue-600 border-neutral-300 text-blue-600 focus:ring-blue-600',
                className
            )}
        />
    )
);
FormCheckInput.displayName = 'Form.Check.Input';

const FormRange = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
    ({className, ...props}, ref) => (
        <input
            {...omitUiProps(props)}
            ref={ref}
            type="range"
            className={clsx('h-2 w-full cursor-pointer accent-blue-600', className)}
        />
    )
);
FormRange.displayName = 'Form.Range';

const FormText = (props: AnyProps) =>
    renderAs('small', props, 'mt-1 block text-sm text-neutral-500');
const FormFeedback = ({className, type = 'valid', ...props}: AnyProps) =>
    renderAs(
        'div',
        props,
        clsx(
            'mt-1 text-sm',
            type === 'invalid' ? 'text-red-600' : 'text-emerald-600',
            className
        )
    );

export const FormControl = Object.assign(FormControlBase, {
    Feedback: FormFeedback,
}) as FormControlComponent;
export const FormCheck = Object.assign(FormCheckBase, {
    Input: FormCheckInput,
});

export const Form = Object.assign(FormBase, {
    Check: FormCheck,
    Control: FormControl,
    Group: FormGroup,
    Label: FormLabel,
    Range: FormRange,
    Select: FormSelect,
    Text: FormText,
});

const InputGroupText = (props: AnyProps) =>
    renderAs(
        'span',
        props,
        'inline-flex items-center border border-neutral-300 bg-neutral-100 px-3 text-sm text-neutral-600 dark:border-[var(--ui-border)] dark:bg-[var(--ui-surface-active)] dark:text-[var(--ui-text-secondary)]'
    );
const InputGroupBase = forwardRef<HTMLDivElement, AnyProps>((props, ref) => (
    <div
        {...omitUiProps(props)}
        ref={ref}
        className={clsx(
            'flex w-full [&>*:not(:first-child)]:-ml-px [&>*:not(:first-child)]:rounded-l-none [&>*:not(:last-child)]:rounded-r-none',
            props.className
        )}>
        {props.children}
    </div>
));
InputGroupBase.displayName = 'InputGroup';

export const InputGroup = Object.assign(InputGroupBase, {
    Text: InputGroupText,
});
