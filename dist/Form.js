import { c as _c } from "react/compiler-runtime";
import { forwardRef, useId } from 'react';
import { clsx } from 'clsx';
import { omitUiProps, renderAs } from './utils.js';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const controlClass = 'block w-full rounded-md border border-[var(--ui-border)] bg-[var(--ui-surface)] px-3 py-1.5 text-base leading-6 text-[var(--ui-text)] placeholder:text-[var(--ui-text-muted)] focus:outline-none focus-visible:border-[var(--ui-focus-ring)] focus-visible:ring-2 focus-visible:ring-[var(--ui-focus-ring)]/20 disabled:cursor-not-allowed disabled:bg-[var(--ui-surface-active)] disabled:text-[var(--ui-text-muted)]';
const FormBase = /*#__PURE__*/forwardRef((props, ref) => {
  const $ = _c(7);
  let t0;
  if ($[0] !== props) {
    t0 = omitUiProps(props);
    $[0] = props;
    $[1] = t0;
  } else {
    t0 = $[1];
  }
  let t1;
  if ($[2] !== props.children || $[3] !== props.className || $[4] !== ref || $[5] !== t0) {
    t1 = /*#__PURE__*/_jsx("form", {
      ...t0,
      ref: ref,
      className: props.className,
      children: props.children
    });
    $[2] = props.children;
    $[3] = props.className;
    $[4] = ref;
    $[5] = t0;
    $[6] = t1;
  } else {
    t1 = $[6];
  }
  return t1;
});
FormBase.displayName = 'Form';
const FormGroup = /*#__PURE__*/forwardRef((props, ref) => {
  const $ = _c(9);
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
    t1 = clsx("mb-0.5 md:mb-0", props.className);
    $[2] = props.className;
    $[3] = t1;
  } else {
    t1 = $[3];
  }
  let t2;
  if ($[4] !== props.children || $[5] !== ref || $[6] !== t0 || $[7] !== t1) {
    t2 = /*#__PURE__*/_jsx("div", {
      ...t0,
      ref: ref,
      className: t1,
      children: props.children
    });
    $[4] = props.children;
    $[5] = ref;
    $[6] = t0;
    $[7] = t1;
    $[8] = t2;
  } else {
    t2 = $[8];
  }
  return t2;
});
FormGroup.displayName = 'Form.Group';
const FormLabel = /*#__PURE__*/forwardRef((props, ref) => {
  const $ = _c(9);
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
    t1 = clsx("mb-2 inline-block text-base font-normal", props.className);
    $[2] = props.className;
    $[3] = t1;
  } else {
    t1 = $[3];
  }
  let t2;
  if ($[4] !== props.children || $[5] !== ref || $[6] !== t0 || $[7] !== t1) {
    t2 = /*#__PURE__*/_jsx("label", {
      ...t0,
      ref: ref,
      className: t1,
      children: props.children
    });
    $[4] = props.children;
    $[5] = ref;
    $[6] = t0;
    $[7] = t1;
    $[8] = t2;
  } else {
    t2 = $[8];
  }
  return t2;
});
FormLabel.displayName = 'Form.Label';
const FormControlBase = /*#__PURE__*/forwardRef(({
  as = 'input',
  children,
  className,
  htmlSize,
  isInvalid,
  isValid,
  plaintext,
  type,
  ...props
}, ref) => {
  const Component = as;
  return /*#__PURE__*/_jsx(Component, {
    ...omitUiProps(props),
    ref: ref,
    type: type,
    size: htmlSize,
    "aria-invalid": isInvalid || undefined,
    className: clsx(plaintext ? 'block w-full border-0 bg-transparent px-0 py-2' : controlClass, isInvalid && 'border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/25', isValid && 'border-emerald-500 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/25', className),
    children: children
  });
});
FormControlBase.displayName = 'Form.Control';
export const FormSelect = /*#__PURE__*/forwardRef((t0, ref) => {
  const $ = _c(11);
  let children;
  let className;
  let t1;
  if ($[0] !== t0) {
    const {
      className: t2,
      children: t3,
      ...props
    } = t0;
    className = t2;
    children = t3;
    t1 = omitUiProps(props);
    $[0] = t0;
    $[1] = children;
    $[2] = className;
    $[3] = t1;
  } else {
    children = $[1];
    className = $[2];
    t1 = $[3];
  }
  let t2;
  if ($[4] !== className) {
    t2 = clsx(controlClass, "h-[38px] pr-9", className);
    $[4] = className;
    $[5] = t2;
  } else {
    t2 = $[5];
  }
  let t3;
  if ($[6] !== children || $[7] !== ref || $[8] !== t1 || $[9] !== t2) {
    t3 = /*#__PURE__*/_jsx("select", {
      ...t1,
      ref: ref,
      className: t2,
      children: children
    });
    $[6] = children;
    $[7] = ref;
    $[8] = t1;
    $[9] = t2;
    $[10] = t3;
  } else {
    t3 = $[10];
  }
  return t3;
});
FormSelect.displayName = 'Form.Select';
const FormCheckBase = /*#__PURE__*/forwardRef(({
  children,
  className,
  disabled,
  id,
  inline,
  label,
  reverse,
  type = 'checkbox',
  ...props
}, ref) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const isSwitch = type === 'switch';
  if (isSwitch) {
    const content = label ?? children;
    return /*#__PURE__*/_jsxs("label", {
      className: clsx('mb-0.5 min-h-7 cursor-pointer select-none items-center gap-3', inline ? 'mr-4 inline-flex' : 'flex', reverse && 'flex-row-reverse justify-between', disabled && 'cursor-not-allowed opacity-60', className),
      children: [/*#__PURE__*/_jsx("input", {
        ...omitUiProps(props),
        ref: ref,
        id: inputId,
        disabled: disabled,
        type: "checkbox",
        role: "switch",
        className: "peer sr-only"
      }), /*#__PURE__*/_jsx("span", {
        "aria-hidden": "true",
        className: "relative inline-flex h-6 w-11 shrink-0 rounded-full bg-neutral-300 shadow-inner ring-1 ring-inset ring-neutral-900/10 transition-colors duration-200 ease-in-out after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow-sm after:ring-1 after:ring-black/10 after:transition-transform after:duration-200 after:ease-in-out after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-5 peer-focus-visible:ring-2 peer-focus-visible:ring-blue-600 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-white dark:bg-neutral-600 dark:ring-white/10 dark:peer-checked:bg-blue-500 dark:peer-focus-visible:ring-offset-neutral-900 motion-reduce:transition-none motion-reduce:after:transition-none"
      }), content && /*#__PURE__*/_jsx("span", {
        className: "leading-6 text-[var(--ui-text)]",
        children: content
      })]
    });
  }
  return /*#__PURE__*/_jsxs("div", {
    className: clsx('mb-0.5 flex min-h-6 items-center gap-2', inline && 'mr-4 inline-flex', reverse && 'flex-row-reverse justify-between', className),
    children: [/*#__PURE__*/_jsx("input", {
      ...omitUiProps(props),
      ref: ref,
      id: inputId,
      disabled: disabled,
      type: type,
      className: "h-4 w-4 accent-blue-600 border-neutral-300 text-blue-600 focus:ring-blue-600"
    }), (label ?? children) && /*#__PURE__*/_jsx("label", {
      htmlFor: inputId,
      className: clsx('text-base', disabled && 'cursor-not-allowed opacity-60'),
      children: label ?? children
    })]
  });
});
FormCheckBase.displayName = 'Form.Check';
const FormCheckInput = /*#__PURE__*/forwardRef((t0, ref) => {
  const $ = _c(9);
  let className;
  let props;
  if ($[0] !== t0) {
    ({
      className,
      ...props
    } = t0);
    $[0] = t0;
    $[1] = className;
    $[2] = props;
  } else {
    className = $[1];
    props = $[2];
  }
  let t1;
  if ($[3] !== className) {
    t1 = clsx("h-4 w-4 accent-blue-600 border-neutral-300 text-blue-600 focus:ring-blue-600", className);
    $[3] = className;
    $[4] = t1;
  } else {
    t1 = $[4];
  }
  let t2;
  if ($[5] !== props || $[6] !== ref || $[7] !== t1) {
    t2 = /*#__PURE__*/_jsx("input", {
      ...props,
      ref: ref,
      className: t1
    });
    $[5] = props;
    $[6] = ref;
    $[7] = t1;
    $[8] = t2;
  } else {
    t2 = $[8];
  }
  return t2;
});
FormCheckInput.displayName = 'Form.Check.Input';
const FormRange = /*#__PURE__*/forwardRef((t0, ref) => {
  const $ = _c(9);
  let className;
  let t1;
  if ($[0] !== t0) {
    const {
      className: t2,
      ...props
    } = t0;
    className = t2;
    t1 = omitUiProps(props);
    $[0] = t0;
    $[1] = className;
    $[2] = t1;
  } else {
    className = $[1];
    t1 = $[2];
  }
  let t2;
  if ($[3] !== className) {
    t2 = clsx("h-2 w-full cursor-pointer accent-blue-600", className);
    $[3] = className;
    $[4] = t2;
  } else {
    t2 = $[4];
  }
  let t3;
  if ($[5] !== ref || $[6] !== t1 || $[7] !== t2) {
    t3 = /*#__PURE__*/_jsx("input", {
      ...t1,
      ref: ref,
      type: "range",
      className: t2
    });
    $[5] = ref;
    $[6] = t1;
    $[7] = t2;
    $[8] = t3;
  } else {
    t3 = $[8];
  }
  return t3;
});
FormRange.displayName = 'Form.Range';
const FormText = props => renderAs('small', props, 'mt-1 block text-sm text-neutral-500');
const FormFeedback = ({
  className,
  type = 'valid',
  ...props
}) => renderAs('div', props, clsx('mt-1 text-sm', type === 'invalid' ? 'text-red-600' : 'text-emerald-600', className));
export const FormControl = Object.assign(FormControlBase, {
  Feedback: FormFeedback
});
export const FormCheck = Object.assign(FormCheckBase, {
  Input: FormCheckInput
});
export const Form = Object.assign(FormBase, {
  Check: FormCheck,
  Control: FormControl,
  Group: FormGroup,
  Label: FormLabel,
  Range: FormRange,
  Select: FormSelect,
  Text: FormText
});
const InputGroupText = props => renderAs('span', props, 'inline-flex items-center border border-neutral-300 bg-neutral-100 px-3 text-sm text-neutral-600 dark:border-[var(--ui-border)] dark:bg-[var(--ui-surface-active)] dark:text-[var(--ui-text-secondary)]');
const InputGroupBase = /*#__PURE__*/forwardRef((props, ref) => {
  const $ = _c(9);
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
    t1 = clsx("flex w-full [&>*:not(:first-child)]:-ml-px [&>*:not(:first-child)]:rounded-l-none [&>*:not(:last-child)]:rounded-r-none", props.className);
    $[2] = props.className;
    $[3] = t1;
  } else {
    t1 = $[3];
  }
  let t2;
  if ($[4] !== props.children || $[5] !== ref || $[6] !== t0 || $[7] !== t1) {
    t2 = /*#__PURE__*/_jsx("div", {
      ...t0,
      ref: ref,
      className: t1,
      children: props.children
    });
    $[4] = props.children;
    $[5] = ref;
    $[6] = t0;
    $[7] = t1;
    $[8] = t2;
  } else {
    t2 = $[8];
  }
  return t2;
});
InputGroupBase.displayName = 'InputGroup';
export const InputGroup = Object.assign(InputGroupBase, {
  Text: InputGroupText
});
//# sourceMappingURL=Form.js.map
