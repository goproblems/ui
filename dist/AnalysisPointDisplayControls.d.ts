import { type ReactNode } from 'react';
export type AnalysisDisplayLabels = (key: string, values?: Record<string, string | number>) => string;
export type AnalysisDisplayBasis = 'policy' | 'visitsRelative' | 'visitsAbsolute';
export type AnalysisDisplayRule = {
    enabled: boolean;
    basis: AnalysisDisplayBasis;
    threshold: number;
};
export type AnalysisDisplayEmphasis = {
    enabled: boolean;
    basis: Exclude<AnalysisDisplayBasis, 'visitsAbsolute'>;
    fullAt: number;
    minSaturation: number;
    maxSaturation: number;
    minScale: number;
    minOpacity: number;
};
export type AnalysisPointDisplayValue = {
    hide: AnalysisDisplayRule;
    compact: AnalysisDisplayRule;
    compactScale: number;
    compactOpacity: number;
    compactSoftness: number;
    emphasis: AnalysisDisplayEmphasis;
};
export type AnalysisColorBand = {
    from: number;
    color: string;
};
export type AnalysisPointColorValue = {
    colorMode: 'scoreLoss' | 'recommendation' | 'policy';
    topMoveColorEnabled: boolean;
    topMoveColor: string;
    otherMoveColor: string;
    topMoveOutline: string | null;
    scoreBands: AnalysisColorBand[];
    policyBands: AnalysisColorBand[];
    upperInclusive: boolean;
};
declare function ColorControls({ settings, onChange, fixedColorMode, colorModes, onReset, outlineColor, }: {
    settings: AnalysisPointColorValue;
    onChange: (patch: Partial<AnalysisPointColorValue>) => void;
    fixedColorMode?: 'policy';
    colorModes?: readonly AnalysisPointColorValue['colorMode'][];
    onReset: () => void;
    outlineColor?: string;
}): import("react").JSX.Element;
export type AnalysisPointDisplayControlsProps = {
    value: AnalysisPointDisplayValue;
    onChange: (patch: Partial<AnalysisPointDisplayValue>) => void;
    label: AnalysisDisplayLabels;
    preset: string;
    presets: readonly {
        value: string;
        label: string;
    }[];
    onPresetChange: (preset: string) => void;
    onResetPreset: () => void;
    resetPresetLabel: string;
    opacity: number;
    defaultOpacity: number;
    onOpacityChange: (opacity: number) => void;
    onRuleBasisChange: (rule: 'hide' | 'compact', basis: AnalysisDisplayBasis) => void;
    onEmphasisBasisChange: (basis: AnalysisDisplayEmphasis['basis']) => void;
    preview?: ReactNode;
    layoutControls?: ReactNode;
    colorControls?: ReactNode;
    fixedBasisLabel?: string;
    emphasisVisitsHelp?: string;
    compactExtraControls?: ReactNode;
    compactAppearanceEnabled?: boolean;
};
export declare function AnalysisPointDisplayControls(props: AnalysisPointDisplayControlsProps): import("react").JSX.Element;
export type AnalysisPointColorEditorProps = Parameters<typeof ColorControls>[0] & {
    label: AnalysisDisplayLabels;
};
export declare function AnalysisPointColorEditor({ label, ...props }: AnalysisPointColorEditorProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=AnalysisPointDisplayControls.d.ts.map