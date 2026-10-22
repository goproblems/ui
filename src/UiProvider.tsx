import {createContext, useContext, type ReactNode} from 'react';

export type UiLabels = {
    close: string;
    loading: string;
    toggleNavigation: string;
};

const defaultLabels: UiLabels = {
    close: 'Close',
    loading: 'Loading',
    toggleNavigation: 'Toggle navigation',
};

const UiLabelsContext = createContext<UiLabels>(defaultLabels);

export const UiProvider = ({
    children,
    labels,
}: {
    children: ReactNode;
    labels?: Partial<UiLabels>;
}) => (
    <UiLabelsContext.Provider value={{...defaultLabels, ...labels}}>
        {children}
    </UiLabelsContext.Provider>
);

export const useUiLabels = () => useContext(UiLabelsContext);
