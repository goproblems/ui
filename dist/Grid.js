import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { clsx } from 'clsx';
import { omitUiProps } from './utils.js';
const breakpointIndex = { '': 0, sm: 1, md: 2, lg: 3, xl: 4 };
// Each row contains xs, sm, md, lg, xl; keep full class names visible to Tailwind.
const columnClasses = {
    '1': ['w-1/12', 'site-sm:w-1/12', 'md:w-1/12', 'site-lg:w-1/12', 'site-xl:w-1/12'],
    '2': ['w-2/12', 'site-sm:w-2/12', 'md:w-2/12', 'site-lg:w-2/12', 'site-xl:w-2/12'],
    '3': ['w-3/12', 'site-sm:w-3/12', 'md:w-3/12', 'site-lg:w-3/12', 'site-xl:w-3/12'],
    '4': ['w-4/12', 'site-sm:w-4/12', 'md:w-4/12', 'site-lg:w-4/12', 'site-xl:w-4/12'],
    '5': ['w-5/12', 'site-sm:w-5/12', 'md:w-5/12', 'site-lg:w-5/12', 'site-xl:w-5/12'],
    '6': ['w-6/12', 'site-sm:w-6/12', 'md:w-6/12', 'site-lg:w-6/12', 'site-xl:w-6/12'],
    '7': ['w-7/12', 'site-sm:w-7/12', 'md:w-7/12', 'site-lg:w-7/12', 'site-xl:w-7/12'],
    '8': ['w-8/12', 'site-sm:w-8/12', 'md:w-8/12', 'site-lg:w-8/12', 'site-xl:w-8/12'],
    '9': ['w-9/12', 'site-sm:w-9/12', 'md:w-9/12', 'site-lg:w-9/12', 'site-xl:w-9/12'],
    '10': ['w-10/12', 'site-sm:w-10/12', 'md:w-10/12', 'site-lg:w-10/12', 'site-xl:w-10/12'],
    '11': ['w-11/12', 'site-sm:w-11/12', 'md:w-11/12', 'site-lg:w-11/12', 'site-xl:w-11/12'],
    '12': ['w-full', 'site-sm:w-full', 'md:w-full', 'site-lg:w-full', 'site-xl:w-full'],
    'auto': ['w-auto', 'site-sm:w-auto', 'md:w-auto', 'site-lg:w-auto', 'site-xl:w-auto'],
    'true': ['flex-1', 'site-sm:flex-1', 'md:flex-1', 'site-lg:flex-1', 'site-xl:flex-1'],
};
const columnClass = (breakpoint, value) => {
    if (value === undefined || value === false)
        return '';
    const span = typeof value === 'object' ? value.span : value;
    const classes = columnClasses[String(span ?? true)];
    return (classes?.[breakpointIndex[breakpoint]] ??
        (breakpoint ? `${breakpoint}:flex-1` : 'flex-1'));
};
export const Row = forwardRef(({ className, children, xs, sm, md, lg, xl, xxl, ...props }, ref) => (_jsx("div", { ...omitUiProps(props), ref: ref, className: clsx('flex flex-wrap -mx-3', className), children: children })));
export const Col = forwardRef(({ as = 'div', className, children, xs, sm, md, lg, xl, xxl, ...props }, ref) => {
    const Component = as;
    const hasResponsiveSize = [sm, md, lg, xl].some(value => value !== undefined);
    return (_jsx(Component, { ...omitUiProps(props), ref: ref, className: clsx('px-3', xs === undefined && (hasResponsiveSize ? 'w-full' : 'flex-1'), columnClass('', xs), columnClass('sm', sm), columnClass('md', md), columnClass('lg', lg), columnClass('xl', xl), className), children: children }));
});
export const Container = forwardRef(({ as = 'div', className, children, fluid, ...props }, ref) => {
    const Component = as;
    const hasHorizontalPaddingOverride = String(className ?? '')
        .split(/\s+/)
        .some(token => /^(?:!?(?:p|px|pl|pr)-)/.test(token));
    return (_jsx(Component, { ...omitUiProps(props), ref: ref, className: clsx('mx-auto w-full', !hasHorizontalPaddingOverride && 'px-3', !fluid &&
            'site-sm:max-w-[540px] md:max-w-[720px] site-lg:max-w-[960px] site-xl:max-w-[1140px] site-xxl:max-w-[1320px]', className), children: children }));
});
//# sourceMappingURL=Grid.js.map