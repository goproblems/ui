import { c as _c } from "react/compiler-runtime";
import { forwardRef } from 'react';
import { clsx } from 'clsx';
import { omitUiProps, renderAs } from './utils.js';
import { jsx as _jsx } from "react/jsx-runtime";
const CardBase = /*#__PURE__*/forwardRef(function Card({
  as = 'div',
  bg,
  border,
  className,
  text,
  ...props
}, ref) {
  const Component = as;
  return /*#__PURE__*/_jsx(Component, {
    ...omitUiProps(props),
    ref: ref,
    "data-ui": "card",
    className: clsx('flex min-w-0 flex-col rounded-md border', bg === 'dark' ? 'bg-neutral-900' : bg === 'primary' ? 'bg-blue-600' : bg === 'light' ? 'bg-[var(--ui-surface-muted)]' : 'bg-[var(--ui-surface)]', border === 'danger' ? 'border-[var(--ui-danger)]' : border === 'warning' ? 'border-[var(--ui-warning)]' : 'border-[var(--ui-border)]', text === 'white' || bg === 'dark' || bg === 'primary' ? 'text-white' : 'text-[var(--ui-text)]', className),
    children: props.children
  });
});
const createCardSection = (name, className, dataUi) => {
  const Section = /*#__PURE__*/forwardRef((props, ref) => {
    const $ = _c(10);
    let t0;
    if ($[0] !== props) {
      t0 = omitUiProps(props);
      $[0] = props;
      $[1] = t0;
    } else {
      t0 = $[1];
    }
    const t1 = dataUi ?? props["data-ui"];
    let t2;
    if ($[2] !== props.className) {
      t2 = clsx(className, props.className);
      $[2] = props.className;
      $[3] = t2;
    } else {
      t2 = $[3];
    }
    let t3;
    if ($[4] !== props.children || $[5] !== ref || $[6] !== t0 || $[7] !== t1 || $[8] !== t2) {
      t3 = /*#__PURE__*/_jsx("div", {
        ...t0,
        ref: ref,
        "data-ui": t1,
        className: t2,
        children: props.children
      });
      $[4] = props.children;
      $[5] = ref;
      $[6] = t0;
      $[7] = t1;
      $[8] = t2;
      $[9] = t3;
    } else {
      t3 = $[9];
    }
    return t3;
  });
  Section.displayName = name;
  return Section;
};
const CardBody = createCardSection('Card.Body', 'p-4', 'card-body');
const CardHeader = createCardSection('Card.Header', 'border-b border-[var(--ui-border)] bg-[var(--ui-surface-muted)] px-4 py-2', 'card-header');
const CardFooter = createCardSection('Card.Footer', 'border-t border-[var(--ui-border)] bg-[var(--ui-surface-muted)] px-4 py-2');
const CardTitle = props => renderAs('h5', props, 'mb-2 text-lg font-semibold');
const CardText = props => renderAs('p', props, 'mb-3');
const CardImg = /*#__PURE__*/forwardRef((props, ref) => {
  const $ = _c(8);
  let t0;
  if ($[0] !== props) {
    t0 = omitUiProps(props);
    $[0] = props;
    $[1] = t0;
  } else {
    t0 = $[1];
  }
  let t1;
  if ($[2] !== props.className) {
    t1 = clsx("block h-auto max-w-full", props.className);
    $[2] = props.className;
    $[3] = t1;
  } else {
    t1 = $[3];
  }
  let t2;
  if ($[4] !== ref || $[5] !== t0 || $[6] !== t1) {
    t2 = /*#__PURE__*/_jsx("img", {
      ...t0,
      ref: ref,
      className: t1
    });
    $[4] = ref;
    $[5] = t0;
    $[6] = t1;
    $[7] = t2;
  } else {
    t2 = $[7];
  }
  return t2;
});
export const Card = Object.assign(CardBase, {
  Body: CardBody,
  Footer: CardFooter,
  Header: CardHeader,
  Img: CardImg,
  Text: CardText,
  Title: CardTitle
});
export { CardBody, CardHeader };
//# sourceMappingURL=Card.js.map
