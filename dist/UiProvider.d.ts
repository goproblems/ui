import { type ReactNode } from 'react';
export type UiLabels = {
    close: string;
    loading: string;
    toggleNavigation: string;
};
export declare const UiProvider: ({ children, labels, }: {
    children: ReactNode;
    labels?: Partial<UiLabels>;
}) => import("react").JSX.Element;
export declare const useUiLabels: () => UiLabels;
//# sourceMappingURL=UiProvider.d.ts.map