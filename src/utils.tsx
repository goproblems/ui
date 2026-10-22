import {type ElementType} from 'react';
import {clsx} from 'clsx';

export type AnyProps = Record<string, any>;
export type SelectKey = string | number | null;

export type Placement =
    | 'auto'
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'top-start'
    | 'top-end'
    | 'bottom-start'
    | 'bottom-end'
    | 'left-start'
    | 'left-end'
    | 'right-start'
    | 'right-end';

export type OverlayInjectedProps = AnyProps;

const uiOnlyProps = [
    'as', 'active', 'activeKey', 'align', 'alwaysOpen', 'animation',
    'backdrop', 'bg', 'bordered', 'button', 'caret', 'centered', 'children',
    'closeButton', 'collapseOnSelect', 'defaultActiveKey', 'defaultShow',
    'dialogClassName', 'direction', 'dismissible', 'eventKey', 'expand',
    'fade', 'fixed', 'fluid', 'fullscreen', 'grow', 'hasValidation',
    'hover', 'htmlSize', 'isInvalid', 'isValid', 'keyboard', 'label',
    'menuVariant', 'navbar', 'nowrap', 'onHide', 'onSelect', 'open',
    'overlay', 'placement', 'popperConfig', 'prepend', 'plaintext',
    'responsive', 'rounded', 'scrollable', 'show', 'size', 'split',
    'static', 'striped', 'target', 'title', 'toggle', 'transition',
    'variant', 'visuallyHidden',
] as const;

export const omitUiProps = (props: AnyProps) => {
    const domProps = {...props};
    for (const key of uiOnlyProps) delete domProps[key];
    return domProps;
};

export const renderAs = (
    defaultAs: ElementType,
    props: AnyProps,
    className?: string
) => {
    const Component = props.as ?? defaultAs;
    const domProps = omitUiProps(props);
    return (
        <Component {...domProps} className={clsx(className, props.className)}>
            {props.children}
        </Component>
    );
};
