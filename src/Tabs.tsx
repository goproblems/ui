import {Children, createContext, isValidElement, useContext, useState, type ComponentType, type HTMLAttributes, type ReactElement} from 'react';
import {clsx} from 'clsx';
import {omitUiProps, renderAs, type AnyProps, type SelectKey} from './utils.js';

type TabsContextValue = {
    activeKey?: SelectKey;
    onSelect?: (key: SelectKey) => void;
};
type TabContainerProps = Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'> & {
    activeKey?: SelectKey;
    defaultActiveKey?: SelectKey;
    mountOnEnter?: boolean;
    onSelect?: (key: string | null) => void;
    transition?: boolean;
    unmountOnExit?: boolean;
};
type TabPaneProps = HTMLAttributes<HTMLDivElement> & {
    eventKey: SelectKey;
};
type TabsProps = Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'> & {
    activeKey?: SelectKey;
    defaultActiveKey?: SelectKey;
    fill?: boolean;
    justify?: boolean;
    onSelect?: (key: string | null) => void;
};
export const TabsContext = createContext<TabsContextValue>({});

const TabContainer = ({
    activeKey,
    children,
    defaultActiveKey,
    onSelect,
}: AnyProps) => {
    const [internalKey, setInternalKey] = useState<SelectKey>(
        defaultActiveKey ?? null
    );
    const selectedKey = activeKey ?? internalKey;
    return (
        <TabsContext.Provider
            value={{
                activeKey: selectedKey,
                onSelect: key => {
                    setInternalKey(key);
                    onSelect?.(key);
                },
            }}>
            {children}
        </TabsContext.Provider>
    );
};
const TabContent = (props: AnyProps) => renderAs('div', props, 'mt-3');
const TabPane = ({children, className, eventKey, ...props}: AnyProps) => {
    const {activeKey} = useContext(TabsContext);
    return (
        <div
            {...omitUiProps(props)}
            role="tabpanel"
            hidden={activeKey !== eventKey}
            className={clsx(activeKey !== eventKey && 'hidden', className)}>
            {children}
        </div>
    );
};
const TabBase = ({children, className}: AnyProps) => (
    <div className={className}>{children}</div>
);
export const Tab = Object.assign(TabBase, {
    Container: TabContainer,
    Content: TabContent,
    Pane: TabPane,
}) as ComponentType<AnyProps> & {
    Container: ComponentType<TabContainerProps>;
    Content: ComponentType<HTMLAttributes<HTMLDivElement>>;
    Pane: ComponentType<TabPaneProps>;
};

const TabsBase = ({
    activeKey,
    children,
    className,
    defaultActiveKey,
    fill,
    justify,
    onSelect,
}: AnyProps) => {
    const entries = Children.toArray(children).filter(isValidElement) as ReactElement<
        AnyProps
    >[];
    const firstKey = entries[0]?.props.eventKey ?? null;
    const [internalKey, setInternalKey] = useState<SelectKey>(
        defaultActiveKey ?? firstKey
    );
    const selectedKey = activeKey ?? internalKey;
    const select = (key: SelectKey) => {
        setInternalKey(key);
        onSelect?.(key);
    };
    return (
        <TabsContext.Provider value={{activeKey: selectedKey, onSelect: select}}>
            <div className={className}>
                <div
                    role="tablist"
                    className={clsx(
                        'flex flex-wrap border-b border-neutral-200 dark:border-[var(--ui-border)]',
                        (fill || justify) && '[&>*]:flex-1'
                    )}>
                    {entries.map(entry => (
                        <button
                            key={String(entry.props.eventKey)}
                            type="button"
                            role="tab"
                            aria-selected={selectedKey === entry.props.eventKey}
                            onClick={() => select(entry.props.eventKey)}
                            className={clsx(
                                '-mb-px border-b-2 px-4 py-2 text-sm font-medium transition-colors',
                                selectedKey === entry.props.eventKey
                                    ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                                    : 'border-transparent text-neutral-500 hover:border-neutral-300 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200'
                            )}>
                            {entry.props.title}
                        </button>
                    ))}
                </div>
                {entries.map(entry => (
                    <div
                        key={String(entry.props.eventKey)}
                        role="tabpanel"
                        hidden={selectedKey !== entry.props.eventKey}
                        className={clsx(
                            'pt-3',
                            selectedKey !== entry.props.eventKey && 'hidden'
                        )}>
                        {entry.props.children}
                    </div>
                ))}
            </div>
        </TabsContext.Provider>
    );
};
export const Tabs = TabsBase as ComponentType<TabsProps>;
