import { jsx as _jsx } from "react/jsx-runtime";
import { clsx } from 'clsx';
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
];
export const omitUiProps = (props) => {
    const domProps = { ...props };
    for (const key of uiOnlyProps)
        delete domProps[key];
    return domProps;
};
export const renderAs = (defaultAs, props, className) => {
    const Component = props.as ?? defaultAs;
    const domProps = omitUiProps(props);
    return (_jsx(Component, { ...domProps, className: clsx(className, props.className), children: props.children }));
};
//# sourceMappingURL=utils.js.map