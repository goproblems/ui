export const ANALYSIS_POINT_METRICS = [
    'moveOrder',
    'policyOrder',
    'score',
    'policy',
    'visits',
    'descendantCount',
] as const;

export type AnalysisPointMetric = (typeof ANALYSIS_POINT_METRICS)[number];
export type AnalysisPointSlot = AnalysisPointMetric | 'none';
export type AnalysisPointBadgeStyle = 'plain' | 'filled';
export const ANALYSIS_POINT_SHAPES = ['circle', 'square', 'variation'] as const;
export type AnalysisPointShape = (typeof ANALYSIS_POINT_SHAPES)[number];
export const CUSTOM_ANALYSIS_POINT_SHAPES = ['circle', 'square'] as const;
export type AnalysisPointStylePreset =
    | 'moveOrderOnly'
    | 'variationMarkers'
    | 'policyOrderOnly'
    | 'policyOnly'
    | 'standard'
    | 'analysisVisits'
    | 'analysisFutureNodes'
    | 'analysisVisitsWithPolicy'
    | 'detailed'
    | 'custom';

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

export const DEFAULT_ANALYSIS_POINT_OPACITY = 0.7;
export const ANALYSIS_POINT_LOW_POLICY_DISPLAY_MODES = [
    'show',
    'compact',
    'hide',
] as const;
export type AnalysisPointLowPolicyDisplay =
    (typeof ANALYSIS_POINT_LOW_POLICY_DISPLAY_MODES)[number];
export const DEFAULT_ANALYSIS_POINT_LOW_POLICY_DISPLAY: AnalysisPointLowPolicyDisplay =
    'hide';

export const ANALYSIS_POINT_STYLE_PRESETS: Record<
    Exclude<AnalysisPointStylePreset, 'custom'>,
    AnalysisPointStyleLayout
> = {
    moveOrderOnly: {
        lines: ['moveOrder', 'none', 'none'],
        badge: 'none',
        shape: 'square',
    },
    variationMarkers: {
        lines: ['descendantCount', 'none', 'none'],
        badge: 'none',
        shape: 'variation',
    },
    policyOrderOnly: {
        lines: ['policyOrder', 'none', 'none'],
        badge: 'none',
        shape: 'square',
    },
    policyOnly: {
        lines: ['policy', 'none', 'none'],
        badge: 'moveOrder',
        shape: 'square',
    },
    standard: {
        lines: ['score', 'descendantCount', 'none'],
        badge: 'moveOrder',
        shape: 'circle',
    },
    analysisVisits: {
        lines: ['score', 'visits', 'none'],
        badge: 'moveOrder',
        shape: 'circle',
    },
    analysisFutureNodes: {
        lines: ['score', 'descendantCount', 'none'],
        badge: 'moveOrder',
        shape: 'circle',
    },
    analysisVisitsWithPolicy: {
        lines: ['policy', 'score', 'visits'],
        badge: 'moveOrder',
        shape: 'circle',
    },
    detailed: {
        lines: ['policy', 'score', 'descendantCount'],
        badge: 'moveOrder',
        shape: 'circle',
    },
};

export const DEFAULT_ANALYSIS_POINT_STYLE_SETTINGS: AnalysisPointStyleSettings =
    {
        preset: 'moveOrderOnly',
        custom: {
            lines: ['score', 'descendantCount', 'none'],
            badge: 'moveOrder',
            badgeStyle: 'plain',
            shape: 'circle',
        },
    };

export function resolveAnalysisPointStyle(
    settings: AnalysisPointStyleSettings
): AnalysisPointStyleLayout {
    return settings.preset === 'custom'
        ? settings.custom
        : ANALYSIS_POINT_STYLE_PRESETS[settings.preset];
}

export function defaultAnalysisPointOpacity(
    settings: AnalysisPointStyleSettings
): number {
    return resolveAnalysisPointStyle(settings).shape === 'variation'
        ? 1
        : DEFAULT_ANALYSIS_POINT_OPACITY;
}

export function isAnalysisPointStylePreset(
    value: unknown
): value is AnalysisPointStylePreset {
    return (
        typeof value === 'string' &&
        [
            'moveOrderOnly',
            'variationMarkers',
            'policyOrderOnly',
            'policyOnly',
            'standard',
            'analysisVisits',
            'analysisFutureNodes',
            'analysisVisitsWithPolicy',
            'detailed',
            'custom',
        ].includes(value)
    );
}

export function isAnalysisPointSlot(
    value: unknown
): value is AnalysisPointSlot {
    return (
        value === 'none' ||
        (typeof value === 'string' &&
            ANALYSIS_POINT_METRICS.includes(value as AnalysisPointMetric))
    );
}

export function isAnalysisPointShape(
    value: unknown
): value is AnalysisPointShape {
    return (
        typeof value === 'string' &&
        ANALYSIS_POINT_SHAPES.includes(value as AnalysisPointShape)
    );
}

export function isAnalysisPointLowPolicyDisplay(
    value: unknown
): value is AnalysisPointLowPolicyDisplay {
    return (
        typeof value === 'string' &&
        ANALYSIS_POINT_LOW_POLICY_DISPLAY_MODES.includes(
            value as AnalysisPointLowPolicyDisplay
        )
    );
}

export function isAnalysisPointStyleLayout(
    value: unknown
): value is AnalysisPointStyleLayout {
    if (typeof value !== 'object' || value === null) return false;

    const candidate = value as Partial<AnalysisPointStyleLayout>;
    if (
        !Array.isArray(candidate.lines) ||
        candidate.lines.length !== 3 ||
        !candidate.lines.every(isAnalysisPointSlot) ||
        !isAnalysisPointSlot(candidate.badge) ||
        (candidate.badgeStyle !== undefined &&
            candidate.badgeStyle !== 'plain' &&
            candidate.badgeStyle !== 'filled') ||
        !isAnalysisPointShape(candidate.shape)
    ) {
        return false;
    }

    const selected = [...candidate.lines, candidate.badge].filter(
        (slot): slot is AnalysisPointMetric => slot !== 'none'
    );

    return selected.length > 0 && new Set(selected).size === selected.length;
}

/**
 * Add defaults introduced after analysis point styles were first persisted.
 */
export function normalizeAnalysisPointStyleSettings(
    value: unknown
): AnalysisPointStyleSettings | null {
    if (typeof value !== 'object' || value === null) return null;

    const candidate = value as {
        preset?: unknown;
        custom?: Partial<AnalysisPointStyleLayout>;
    };
    if (
        !isAnalysisPointStylePreset(candidate.preset) ||
        typeof candidate.custom !== 'object' ||
        candidate.custom === null
    ) {
        return null;
    }

    const persistedShape: unknown = candidate.custom.shape;
    const custom = {
        ...candidate.custom,
        shape:
            persistedShape === 'roundedSquare'
                ? 'square'
                : persistedShape === 'auto' || persistedShape === 'variation'
                  ? 'circle'
                  : isAnalysisPointShape(persistedShape)
                    ? persistedShape
                    : 'circle',
    };

    return isAnalysisPointStyleLayout(custom)
        ? {preset: candidate.preset, custom}
        : null;
}

export function isAnalysisPointStyleSettings(
    value: unknown
): value is AnalysisPointStyleSettings {
    if (typeof value !== 'object' || value === null) return false;

    const candidate = value as Partial<AnalysisPointStyleSettings>;
    return (
        isAnalysisPointStylePreset(candidate.preset) &&
        isAnalysisPointStyleLayout(candidate.custom) &&
        candidate.custom.shape !== 'variation'
    );
}

export type AnalysisPointColorThresholds = [
    number,
    number,
    number,
    number,
    number,
];

export const DEFAULT_ANALYSIS_POINT_COLOR_THRESHOLDS: AnalysisPointColorThresholds =
    [0.5, 1.5, 3, 5, 12];

export const MAX_ANALYSIS_POINT_COLOR_THRESHOLD = 30;
export const ANALYSIS_POINT_COLOR_THRESHOLD_STEP = 0.1;

export const ANALYSIS_POINT_COLORS = [
    '#65a30d',
    '#facc15',
    '#fb923c',
    '#f97316',
    '#dc2626',
    '#9333ea',
] as const;

export function isAnalysisPointColorThresholds<T extends readonly number[] = AnalysisPointColorThresholds>(
    value: unknown,
    defaults?: T
): value is T {
    return (
        Array.isArray(value) &&
        value.length === (defaults ?? DEFAULT_ANALYSIS_POINT_COLOR_THRESHOLDS).length &&
        value.every(
            (threshold, index) =>
                typeof threshold === 'number' &&
                Number.isFinite(threshold) &&
                threshold >= ANALYSIS_POINT_COLOR_THRESHOLD_STEP &&
                threshold <= MAX_ANALYSIS_POINT_COLOR_THRESHOLD &&
                Math.abs(threshold * 10 - Math.round(threshold * 10)) <
                    0.000001 &&
                (index === 0 || threshold > value[index - 1])
        )
    );
}

export type AnalysisPointSettingsValue<T extends readonly number[] = AnalysisPointColorThresholds> = {
    style: AnalysisPointStyleSettings;
    opacity: number;
    colorThresholds: T;
    lowPolicyDisplay: AnalysisPointLowPolicyDisplay;
    alwaysShowExistingNodes: boolean;
};

export function analysisPointColor(pointsLost: number, thresholds: AnalysisPointColorThresholds = DEFAULT_ANALYSIS_POINT_COLOR_THRESHOLDS): string {
    const displayedLoss = Number(Math.max(0, pointsLost).toFixed(1));
    const index = thresholds.findIndex(threshold => displayedLoss < threshold);
    return ANALYSIS_POINT_COLORS[index === -1 ? ANALYSIS_POINT_COLORS.length - 1 : index];
}
