export declare const ANALYSIS_POINT_METRICS: readonly ["moveOrder", "policyOrder", "score", "policy", "visits", "descendantCount"];
export type AnalysisPointMetric = (typeof ANALYSIS_POINT_METRICS)[number];
export type AnalysisPointSlot = AnalysisPointMetric | 'none';
export type AnalysisPointBadgeStyle = 'plain' | 'filled';
export declare const ANALYSIS_POINT_SHAPES: readonly ["circle", "square", "variation"];
export type AnalysisPointShape = (typeof ANALYSIS_POINT_SHAPES)[number];
export declare const CUSTOM_ANALYSIS_POINT_SHAPES: readonly ["circle", "square"];
export type AnalysisPointStylePreset = 'moveOrderOnly' | 'variationMarkers' | 'policyOrderOnly' | 'policyOnly' | 'standard' | 'analysisVisits' | 'analysisFutureNodes' | 'analysisVisitsWithPolicy' | 'detailed' | 'custom';
export type AnalysisPointStyleLayout = {
    lines: [AnalysisPointSlot, AnalysisPointSlot, AnalysisPointSlot];
    badge: AnalysisPointSlot;
    badgeStyle?: AnalysisPointBadgeStyle;
    shape: AnalysisPointShape;
};
export type AnalysisPointStyleSettings = {
    preset: AnalysisPointStylePreset;
    custom: AnalysisPointStyleLayout;
};
export declare const DEFAULT_ANALYSIS_POINT_OPACITY = 0.7;
export declare const ANALYSIS_POINT_LOW_POLICY_DISPLAY_MODES: readonly ["show", "compact", "hide"];
export type AnalysisPointLowPolicyDisplay = (typeof ANALYSIS_POINT_LOW_POLICY_DISPLAY_MODES)[number];
export declare const DEFAULT_ANALYSIS_POINT_LOW_POLICY_DISPLAY: AnalysisPointLowPolicyDisplay;
export declare const ANALYSIS_POINT_STYLE_PRESETS: Record<Exclude<AnalysisPointStylePreset, 'custom'>, AnalysisPointStyleLayout>;
export declare const DEFAULT_ANALYSIS_POINT_STYLE_SETTINGS: AnalysisPointStyleSettings;
export declare function resolveAnalysisPointStyle(settings: AnalysisPointStyleSettings): AnalysisPointStyleLayout;
export declare function defaultAnalysisPointOpacity(settings: AnalysisPointStyleSettings): number;
export declare function isAnalysisPointStylePreset(value: unknown): value is AnalysisPointStylePreset;
export declare function isAnalysisPointSlot(value: unknown): value is AnalysisPointSlot;
export declare function isAnalysisPointShape(value: unknown): value is AnalysisPointShape;
export declare function isAnalysisPointLowPolicyDisplay(value: unknown): value is AnalysisPointLowPolicyDisplay;
export declare function isAnalysisPointStyleLayout(value: unknown): value is AnalysisPointStyleLayout;
/**
 * Add defaults introduced after analysis point styles were first persisted.
 */
export declare function normalizeAnalysisPointStyleSettings(value: unknown): AnalysisPointStyleSettings | null;
export declare function isAnalysisPointStyleSettings(value: unknown): value is AnalysisPointStyleSettings;
export type AnalysisPointColorThresholds = [
    number,
    number,
    number,
    number,
    number
];
export declare const DEFAULT_ANALYSIS_POINT_COLOR_THRESHOLDS: AnalysisPointColorThresholds;
export declare const MAX_ANALYSIS_POINT_COLOR_THRESHOLD = 30;
export declare const ANALYSIS_POINT_COLOR_THRESHOLD_STEP = 0.1;
export declare const ANALYSIS_POINT_COLORS: readonly ["#65a30d", "#facc15", "#fb923c", "#f97316", "#dc2626", "#9333ea"];
export declare function isAnalysisPointColorThresholds<T extends readonly number[] = AnalysisPointColorThresholds>(value: unknown, defaults?: T): value is T;
export type AnalysisPointSettingsValue<T extends readonly number[] = AnalysisPointColorThresholds> = {
    style: AnalysisPointStyleSettings;
    opacity: number;
    colorThresholds: T;
    lowPolicyDisplay: AnalysisPointLowPolicyDisplay;
    alwaysShowExistingNodes: boolean;
};
export declare function analysisPointColor(pointsLost: number, thresholds?: AnalysisPointColorThresholds): string;
//# sourceMappingURL=analysisPointConfig.d.ts.map