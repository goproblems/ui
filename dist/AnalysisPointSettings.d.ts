import { type ReactNode } from 'react';
import { type AnalysisPointColorThresholds, type AnalysisPointLowPolicyDisplay, type AnalysisPointMetric, type AnalysisPointSettingsValue, type AnalysisPointStylePreset } from './analysisPointConfig.js';
export type AnalysisPointColorScaleProps<T extends readonly number[] = AnalysisPointColorThresholds> = {
    value: T;
    onChange: (value: T) => void;
    defaultValue?: T;
    colors?: readonly string[];
    legendLabels?: readonly ReactNode[];
    title?: string;
    labels?: string[];
    resetLabel?: string;
    className?: string;
};
export declare const AnalysisPointColorScale: <T extends readonly number[] = AnalysisPointColorThresholds>({ value, onChange, defaultValue, colors, legendLabels, title, labels, resetLabel, className }: AnalysisPointColorScaleProps<T>) => import("react").JSX.Element;
export type AnalysisPointSettingsLabels = {
    style: string;
    opacity: string;
    resetOpacity: string;
    shape: string;
    none: string;
    badge: string;
    lines: [string, string, string];
    shapes: {
        circle: string;
        square: string;
    };
    presets: Partial<Record<AnalysisPointStylePreset, string>>;
    metrics: Partial<Record<AnalysisPointMetric, string>>;
    lowPolicy: string;
    lowPolicyModes: {
        show: string;
        compact: string;
        hide: string;
    };
    existingNodes: string;
    colors: string;
    colorBoundaries: string[];
    resetColors: string;
};
export type AnalysisPointSettingsProps<T extends readonly number[] = AnalysisPointColorThresholds> = {
    value: AnalysisPointSettingsValue<T>;
    onChange: (value: AnalysisPointSettingsValue<T>) => void;
    preview?: ReactNode;
    labels?: Partial<AnalysisPointSettingsLabels>;
    metrics?: readonly AnalysisPointMetric[];
    presets?: readonly AnalysisPointStylePreset[];
    showLowPolicyControls?: boolean;
    showExistingNodesControl?: boolean;
    existingNodesAvailable?: boolean;
    lowPolicyHelp?: Partial<Record<AnalysisPointLowPolicyDisplay, ReactNode>>;
    existingNodesHelp?: ReactNode;
    showColors?: boolean;
    className?: string;
};
/** Controlled settings only: data, persistence, translations and preview rendering belong to the application. */
export declare const AnalysisPointSettings: <T extends readonly number[] = AnalysisPointColorThresholds>({ value, onChange, preview, labels: suppliedLabels, metrics, presets, showLowPolicyControls, showExistingNodesControl, existingNodesAvailable, lowPolicyHelp, existingNodesHelp, showColors, className }: AnalysisPointSettingsProps<T>) => import("react").JSX.Element;
//# sourceMappingURL=AnalysisPointSettings.d.ts.map