import { type ComponentType, type HTMLAttributes } from 'react';
import { type AnyProps, type SelectKey } from './utils.js';
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
export declare const TabsContext: import("react").Context<TabsContextValue>;
export declare const Tab: ComponentType<AnyProps> & {
    Container: ComponentType<TabContainerProps>;
    Content: ComponentType<HTMLAttributes<HTMLDivElement>>;
    Pane: ComponentType<TabPaneProps>;
};
export declare const Tabs: ComponentType<TabsProps>;
export {};
//# sourceMappingURL=Tabs.d.ts.map