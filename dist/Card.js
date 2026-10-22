import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { clsx } from 'clsx';
import { omitUiProps, renderAs } from './utils.js';
const CardBase = forwardRef(function Card({ as = 'div', bg, border, className, text, ...props }, ref) {
    const Component = as;
    return (_jsx(Component, { ...omitUiProps(props), ref: ref, "data-ui": "card", className: clsx('flex min-w-0 flex-col rounded-md border', bg === 'dark'
            ? 'bg-neutral-900'
            : bg === 'primary'
                ? 'bg-blue-600'
                : bg === 'light'
                    ? 'bg-[var(--ui-surface-muted)]'
                    : 'bg-[var(--ui-surface)]', border === 'danger'
            ? 'border-[var(--ui-danger)]'
            : border === 'warning'
                ? 'border-[var(--ui-warning)]'
                : 'border-[var(--ui-border)]', text === 'white' || bg === 'dark' || bg === 'primary'
            ? 'text-white'
            : 'text-[var(--ui-text)]', className), children: props.children }));
});
const createCardSection = (name, className, dataUi) => {
    const Section = forwardRef((props, ref) => (_jsx("div", { ...omitUiProps(props), ref: ref, "data-ui": dataUi ?? props['data-ui'], className: clsx(className, props.className), children: props.children })));
    Section.displayName = name;
    return Section;
};
const CardBody = createCardSection('Card.Body', 'p-4', 'card-body');
const CardHeader = createCardSection('Card.Header', 'border-b border-[var(--ui-border)] bg-[var(--ui-surface-muted)] px-4 py-2', 'card-header');
const CardFooter = createCardSection('Card.Footer', 'border-t border-[var(--ui-border)] bg-[var(--ui-surface-muted)] px-4 py-2');
const CardTitle = (props) => renderAs('h5', props, 'mb-2 text-lg font-semibold');
const CardText = (props) => renderAs('p', props, 'mb-3');
const CardImg = forwardRef((props, ref) => (_jsx("img", { ...omitUiProps(props), ref: ref, className: clsx('block h-auto max-w-full', props.className) })));
export const Card = Object.assign(CardBase, {
    Body: CardBody,
    Footer: CardFooter,
    Header: CardHeader,
    Img: CardImg,
    Text: CardText,
    Title: CardTitle,
});
export { CardBody, CardHeader };
//# sourceMappingURL=Card.js.map