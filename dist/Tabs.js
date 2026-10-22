import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Children, createContext, isValidElement, useContext, useState } from 'react';
import { clsx } from 'clsx';
import { omitUiProps, renderAs } from './utils.js';
export const TabsContext = createContext({});
const TabContainer = ({ activeKey, children, defaultActiveKey, onSelect, }) => {
    const [internalKey, setInternalKey] = useState(defaultActiveKey ?? null);
    const selectedKey = activeKey ?? internalKey;
    return (_jsx(TabsContext.Provider, { value: {
            activeKey: selectedKey,
            onSelect: key => {
                setInternalKey(key);
                onSelect?.(key);
            },
        }, children: children }));
};
const TabContent = (props) => renderAs('div', props, 'mt-3');
const TabPane = ({ children, className, eventKey, ...props }) => {
    const { activeKey } = useContext(TabsContext);
    return (_jsx("div", { ...omitUiProps(props), role: "tabpanel", hidden: activeKey !== eventKey, className: clsx(activeKey !== eventKey && 'hidden', className), children: children }));
};
const TabBase = ({ children, className }) => (_jsx("div", { className: className, children: children }));
export const Tab = Object.assign(TabBase, {
    Container: TabContainer,
    Content: TabContent,
    Pane: TabPane,
});
const TabsBase = ({ activeKey, children, className, defaultActiveKey, fill, justify, onSelect, }) => {
    const entries = Children.toArray(children).filter(isValidElement);
    const firstKey = entries[0]?.props.eventKey ?? null;
    const [internalKey, setInternalKey] = useState(defaultActiveKey ?? firstKey);
    const selectedKey = activeKey ?? internalKey;
    const select = (key) => {
        setInternalKey(key);
        onSelect?.(key);
    };
    return (_jsx(TabsContext.Provider, { value: { activeKey: selectedKey, onSelect: select }, children: _jsxs("div", { className: className, children: [_jsx("div", { role: "tablist", className: clsx('flex flex-wrap border-b border-neutral-200 dark:border-[var(--ui-border)]', (fill || justify) && '[&>*]:flex-1'), children: entries.map(entry => (_jsx("button", { type: "button", role: "tab", "aria-selected": selectedKey === entry.props.eventKey, onClick: () => select(entry.props.eventKey), className: clsx('-mb-px border-b-2 px-4 py-2 text-sm font-medium transition-colors', selectedKey === entry.props.eventKey
                            ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                            : 'border-transparent text-neutral-500 hover:border-neutral-300 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200'), children: entry.props.title }, String(entry.props.eventKey)))) }), entries.map(entry => (_jsx("div", { role: "tabpanel", hidden: selectedKey !== entry.props.eventKey, className: clsx('pt-3', selectedKey !== entry.props.eventKey && 'hidden'), children: entry.props.children }, String(entry.props.eventKey))))] }) }));
};
export const Tabs = TabsBase;
//# sourceMappingURL=Tabs.js.map