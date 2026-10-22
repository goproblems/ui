import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext } from 'react';
const defaultLabels = {
    close: 'Close',
    loading: 'Loading',
    toggleNavigation: 'Toggle navigation',
};
const UiLabelsContext = createContext(defaultLabels);
export const UiProvider = ({ children, labels, }) => (_jsx(UiLabelsContext.Provider, { value: { ...defaultLabels, ...labels }, children: children }));
export const useUiLabels = () => useContext(UiLabelsContext);
//# sourceMappingURL=UiProvider.js.map