import { type ComponentType, type HTMLAttributes } from 'react';
import { type SelectKey } from './utils.js';
type AccordionProps = Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'> & {
    activeKey?: SelectKey | SelectKey[];
    alwaysOpen?: boolean;
    defaultActiveKey?: SelectKey | SelectKey[];
    flush?: boolean;
    onSelect?: (key: string | string[] | null) => void;
};
export declare const Accordion: ComponentType<AccordionProps> & {
    Body: ComponentType<HTMLAttributes<HTMLDivElement>>;
    Header: ComponentType<HTMLAttributes<HTMLButtonElement>>;
    Item: ComponentType<HTMLAttributes<HTMLDivElement> & {
        eventKey: SelectKey;
    }>;
};
export {};
//# sourceMappingURL=Accordion.d.ts.map