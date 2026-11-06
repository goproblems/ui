import {useId, type ReactNode} from 'react';
import {clsx} from 'clsx';
import {
    ANALYSIS_POINT_COLORS, ANALYSIS_POINT_METRICS, DEFAULT_ANALYSIS_POINT_COLOR_THRESHOLDS, DEFAULT_ANALYSIS_POINT_OPACITY, defaultAnalysisPointOpacity,
    type AnalysisPointColorThresholds, type AnalysisPointLowPolicyDisplay, type AnalysisPointMetric, type AnalysisPointSettingsValue,
    type AnalysisPointSlot, type AnalysisPointStylePreset,
} from './analysisPointConfig.js';

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

export const AnalysisPointColorScale = <T extends readonly number[] = AnalysisPointColorThresholds,>({value, onChange, defaultValue, colors = ANALYSIS_POINT_COLORS, legendLabels, title = 'Point-loss colors', labels = ['Green → Yellow', 'Yellow → Orange', 'Orange → Dark orange', 'Dark orange → Red', 'Red → Purple'], resetLabel = 'Reset colors', className}: AnalysisPointColorScaleProps<T>) => {
    const id = useId();
    const defaults = defaultValue ?? DEFAULT_ANALYSIS_POINT_COLOR_THRESHOLDS;
    return <fieldset className={clsx('ui-settings-fieldset ui-board-theme-fieldset ui-analysis-point-colors', className)}>
        <legend>{title}</legend>
        <div className="ui-analysis-point-color-controls">{value.map((threshold, index) => {
            const min = index === 0 ? 0.1 : Number((value[index - 1] + 0.1).toFixed(1));
            const max = index === value.length - 1 ? 30 : Number((value[index + 1] - 0.1).toFixed(1));
            return <label key={index} htmlFor={`${id}-${index}`}>
                <span className="ui-analysis-point-color-heading"><span className="ui-analysis-point-color-pair"><i style={{background: colors[index]}}/><i style={{background: colors[index + 1]}}/></span><span>{labels[index]}</span><output htmlFor={`${id}-${index}`}>{threshold.toFixed(1)}</output></span>
                <input id={`${id}-${index}`} type="range" min={min} max={max} step={0.1} value={threshold} onChange={event => {
                    const next = value.map((threshold, itemIndex) => itemIndex === index ? Number(Number(event.currentTarget.value).toFixed(1)) : threshold);
                    onChange(next as unknown as T);
                }}/>
            </label>;
        })}</div>
        <div className="ui-analysis-point-color-legend">{colors.map((color, index) => <span key={color}><i style={{background: color}}/>{legendLabels?.[index] ?? <>{index === 0 ? '0' : value[index - 1].toFixed(1)}{index === value.length ? '+' : `–<${value[index].toFixed(1)}`}</>}</span>)}</div>
        <button type="button" className="ui-analysis-point-reset" disabled={value.length === defaults.length && value.every((threshold, index) => threshold === defaults[index])} onClick={() => onChange([...defaults] as unknown as T)}>{resetLabel}</button>
    </fieldset>;
};

export type AnalysisPointSettingsLabels = {
    style: string; opacity: string; resetOpacity: string; shape: string; none: string; badge: string;
    badgeStyle: string; badgeStyles: {plain: string; filled: string};
    lines: [string, string, string]; shapes: {circle: string; square: string};
    presets: Partial<Record<AnalysisPointStylePreset, string>>;
    metrics: Partial<Record<AnalysisPointMetric, string>>;
    lowPolicy: string; lowPolicyModes: {show: string; compact: string; hide: string};
    existingNodes: string; colors: string; colorBoundaries: string[]; resetColors: string;
};

const defaultLabels: AnalysisPointSettingsLabels = {
    style: 'Analysis point style', opacity: 'Point opacity', resetOpacity: 'Reset opacity', shape: 'Point shape', none: 'None', badge: 'Top-right label',
    badgeStyle: 'Top-right label style', badgeStyles: {plain: 'Plain text', filled: 'With background'},
    lines: ['First line', 'Second line', 'Third line'], shapes: {circle: 'Circle', square: 'Square'},
    presets: {moveOrderOnly: 'Move order only', variationMarkers: 'Variation markers', policyOrderOnly: 'Policy order only', policyOnly: 'Policy only', standard: 'Analysis', analysisVisits: 'Analysis (visits)', analysisFutureNodes: 'Analysis (Future nodes)', analysisVisitsWithPolicy: 'Analysis (visits with policy)', detailed: 'Analysis (with policy)', custom: 'Custom'},
    metrics: {moveOrder: 'Move order', policyOrder: 'Policy order', score: 'Score change', policy: 'Policy', visits: 'Visits', descendantCount: 'Future nodes'},
    lowPolicy: 'Low-policy points', lowPolicyModes: {show: 'Show', compact: 'Compact', hide: 'Hide'}, existingNodes: 'Always show existing nodes',
    colors: 'Point-loss colors', colorBoundaries: ['Green → Yellow', 'Yellow → Orange', 'Orange → Dark orange', 'Dark orange → Red', 'Red → Purple'], resetColors: 'Reset colors',
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
    showOpacity?: boolean;
    showBadgeStyleControl?: boolean;
    className?: string;
};

export type AnalysisPointOpacityControlProps = {
    value: number;
    defaultValue?: number;
    onChange: (value: number) => void;
    label?: string;
    resetLabel?: string;
};

export const AnalysisPointOpacityControl = ({value, defaultValue = DEFAULT_ANALYSIS_POINT_OPACITY, onChange, label = 'Point opacity', resetLabel = 'Reset opacity'}: AnalysisPointOpacityControlProps) => {
    const id = useId();
    return <div className="ui-analysis-point-opacity-group"><label htmlFor={id}>{label}</label><div className="ui-analysis-point-opacity-row"><input id={id} type="range" min={20} max={100} step={1} value={Math.round(value * 100)} onChange={event => onChange(Number(event.currentTarget.value) / 100)}/><output htmlFor={id}>{Math.round(value * 100)}%</output><button type="button" disabled={value === defaultValue} onClick={() => onChange(defaultValue)}>{resetLabel}</button></div></div>;
};

/** Controlled settings only: data, persistence, translations and preview rendering belong to the application. */
export const AnalysisPointSettings = <T extends readonly number[] = AnalysisPointColorThresholds,>({value, onChange, preview, labels: suppliedLabels, metrics = ANALYSIS_POINT_METRICS, presets = ['moveOrderOnly', 'variationMarkers', 'policyOrderOnly', 'policyOnly', 'standard', 'detailed', 'custom'], showLowPolicyControls = true, showExistingNodesControl = true, existingNodesAvailable = false, lowPolicyHelp, existingNodesHelp, showColors = true, showOpacity = true, showBadgeStyleControl = false, className}: AnalysisPointSettingsProps<T>) => {
    const id = useId();
    const labels = {...defaultLabels, ...suppliedLabels, presets: {...defaultLabels.presets, ...suppliedLabels?.presets}, metrics: {...defaultLabels.metrics, ...suppliedLabels?.metrics}};
    const custom = value.style.custom;
    const slots = [...custom.lines, custom.badge];
    const changeCustom = (next: typeof custom) => onChange({...value, style: {...value.style, custom: next}});
    const metricSelect = (slot: AnalysisPointSlot, label: string, change: (slot: AnalysisPointSlot) => void) => <label className="ui-analysis-point-slot"><span>{label}</span><select value={slot} onChange={event => change(event.currentTarget.value as AnalysisPointSlot)}>
        <option value="none" disabled={slot !== 'none' && slots.filter(metric => metric !== 'none').length === 1}>{labels.none}</option>
        {metrics.map(metric => <option key={metric} value={metric} disabled={metric !== slot && slots.includes(metric)}>{labels.metrics[metric]}</option>)}
    </select></label>;
    return <div data-ui="analysis-point-settings" className={clsx('ui-analysis-point-settings', className)}>
        {preview}
        <fieldset className="ui-settings-fieldset ui-board-theme-fieldset ui-analysis-point-style"><legend>{labels.style}</legend>
        <div className="ui-analysis-point-presets">{presets.map(preset => <label key={preset} className={value.style.preset === preset ? 'is-selected' : undefined}><input type="radio" name={`${id}-preset`} checked={value.style.preset === preset} onChange={() => onChange({...value, style: {...value.style, preset}})}/>{labels.presets[preset]}</label>)}</div>
        {showOpacity && <AnalysisPointOpacityControl value={value.opacity} defaultValue={defaultAnalysisPointOpacity(value.style)} onChange={opacity => onChange({...value, opacity})} label={labels.opacity} resetLabel={labels.resetOpacity}/>}
        {value.style.preset === 'custom' && <div className="ui-analysis-point-custom"><div className="ui-analysis-point-shape"><span>{labels.shape}</span><div className="ui-analysis-point-shape-options" role="radiogroup" aria-label={labels.shape}>{(['circle', 'square'] as const).map(shape => <label key={shape} className={custom.shape === shape ? 'is-selected' : undefined}><input type="radio" name={`${id}-shape`} checked={custom.shape === shape} onChange={() => changeCustom({...custom, shape})}/>{labels.shapes[shape]}</label>)}</div></div>
            {custom.lines.map((slot, index) => <div key={index}>{metricSelect(slot, labels.lines[index], metric => {const lines = [...custom.lines] as typeof custom.lines; lines[index] = metric; changeCustom({...custom, lines});})}</div>)}
            {metricSelect(custom.badge, labels.badge, badge => changeCustom({...custom, badge}))}
            {showBadgeStyleControl && <div className="ui-analysis-point-shape"><span id={`${id}-badge-style-label`}>{labels.badgeStyle}</span><div className="ui-analysis-point-shape-options ui-analysis-point-badge-options" role="radiogroup" aria-labelledby={`${id}-badge-style-label`}>{(['plain', 'filled'] as const).map(badgeStyle => <label key={badgeStyle} className={(custom.badgeStyle ?? 'plain') === badgeStyle ? 'is-selected' : undefined}><input type="radio" name={`${id}-badge-style`} checked={(custom.badgeStyle ?? 'plain') === badgeStyle} disabled={custom.badge === 'none'} onChange={() => changeCustom({...custom, badgeStyle})}/>{labels.badgeStyles[badgeStyle]}</label>)}</div></div>}
        </div>}
        </fieldset>
        {showLowPolicyControls && <fieldset className="ui-settings-fieldset ui-board-theme-fieldset ui-analysis-point-low-policy"><legend>{labels.lowPolicy}</legend><div className="ui-analysis-point-low-policy-modes">{(['show', 'compact', 'hide'] as const).map(mode => <span key={mode} className={value.lowPolicyDisplay === mode ? 'is-selected' : undefined}><label><input type="radio" name={`${id}-low-policy`} checked={value.lowPolicyDisplay === mode} onChange={() => onChange({...value, lowPolicyDisplay: mode})}/>{labels.lowPolicyModes[mode]}</label>{lowPolicyHelp?.[mode]}</span>)}</div>{showExistingNodesControl && <div><label><input type="checkbox" checked={value.alwaysShowExistingNodes} disabled={!existingNodesAvailable} onChange={event => onChange({...value, alwaysShowExistingNodes: event.currentTarget.checked})}/>{labels.existingNodes}</label>{existingNodesHelp}</div>}</fieldset>}
        {showColors && <AnalysisPointColorScale value={value.colorThresholds} onChange={colorThresholds => onChange({...value, colorThresholds})} title={labels.colors} labels={labels.colorBoundaries} resetLabel={labels.resetColors}/>}
    </div>;
};
