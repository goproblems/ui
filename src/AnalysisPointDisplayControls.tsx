import {createContext, useContext, useEffect, useId, useState, type ReactNode} from 'react';

export type AnalysisDisplayLabels = (key: string, values?: Record<string, string | number>) => string;
export type AnalysisDisplayBasis = 'policy' | 'visitsRelative' | 'visitsAbsolute';
export type AnalysisDisplayRule = {enabled: boolean; basis: AnalysisDisplayBasis; threshold: number};
export type AnalysisDisplayEmphasis = {enabled: boolean; basis: Exclude<AnalysisDisplayBasis, 'visitsAbsolute'>; fullAt: number; minSaturation: number; maxSaturation: number; minScale: number; minOpacity: number};
export type AnalysisPointDisplayValue = {
    hide: AnalysisDisplayRule; compact: AnalysisDisplayRule;
    compactScale: number; compactOpacity: number; compactSoftness: number;
    emphasis: AnalysisDisplayEmphasis;
};
export type AnalysisColorBand = {from: number; color: string};
export type AnalysisPointColorValue = {
    colorMode: 'scoreLoss' | 'recommendation' | 'policy';
    topMoveColorEnabled: boolean; topMoveColor: string; otherMoveColor: string; topMoveOutline: string | null;
    scoreBands: AnalysisColorBand[]; policyBands: AnalysisColorBand[]; upperInclusive: boolean;
};
const MAX_SCORE_BANDS = 16;
const MAX_SCORE_LOSS = 1000;
const LabelsContext = createContext<AnalysisDisplayLabels>(key => key);

function AnalysisBasisChoices({label, value, onChange, bases = ['policy', 'visitsRelative', 'visitsAbsolute'], visitsRelativeHelp}: {
    label: string; value: AnalysisDisplayBasis; onChange: (value: AnalysisDisplayBasis) => void;
    bases?: readonly AnalysisDisplayBasis[]; visitsRelativeHelp?: string;
}) {
    const text = useContext(LabelsContext);
    const name = useId();
    return <div className={'ui-analysis-display-basis-options' + (bases.length === 2 ? ' ui-analysis-display-basis-options-pair' : '')} role="radiogroup" aria-label={label}>
        {bases.map(basis => <label key={basis} title={basis === 'visitsRelative' ? visitsRelativeHelp : undefined} className={value === basis ? 'is-selected' : undefined}>
            <input type="radio" name={name} value={basis} checked={value === basis} onChange={() => onChange(basis)}/><span>{text('basisOption.' + basis)}</span>
        </label>)}
    </div>;
}
function NumberSetting({
    label,
    value,
    min = 0,
    max,
    step = 1,
    suffix,
    onChange,
}: {
    label: string;
    value: number;
    min?: number;
    max: number;
    step?: number;
    suffix?: string;
    onChange: (value: number) => void;
}) {
    const [draft, setDraft] = useState(String(value));
    useEffect(() => setDraft(String(value)), [value]);
    return (
        <label className="ui-analysis-display-number">
            <span>{label}</span>
            <span>
                <input
                    type="number"
                    min={min}
                    max={max}
                    step={step}
                    value={draft}
                    onChange={event => {
                        const text = event.currentTarget.value;
                        setDraft(text);
                        const n = Number(text);
                        if (
                            text !== '' &&
                            Number.isFinite(n) &&
                            n >= min &&
                            n <= max &&
                            (step !== 1 || Number.isInteger(n))
                        )
                            onChange(n);
                    }}
                    onBlur={() => {
                        const n = Number(draft);
                        const next =
                            draft === '' || !Number.isFinite(n)
                                ? value
                                : Math.max(
                                      min,
                                      Math.min(
                                          max,
                                          step === 1 ? Math.round(n) : n
                                      )
                                  );
                        setDraft(String(next));
                        if (next !== value) onChange(next);
                    }}
                />
                {suffix && <span>{suffix}</span>}
            </span>
        </label>
    );
}

function SliderSetting({
    label,
    value,
    min = 0,
    max,
    step = 0.1,
    suffix,
    onChange,
    resetValue,
    resetLabel,
}: {
    label: string;
    value: number;
    min?: number;
    max: number;
    step?: number;
    suffix?: string;
    onChange: (value: number) => void;
    resetValue?: number;
    resetLabel?: string;
}) {
    const text = useContext(LabelsContext);
    const id = useId();
    const [draft, setDraft] = useState(String(value));
    useEffect(() => setDraft(String(value)), [value]);
    const normalize = (next: number) =>
        Number(Math.max(min, Math.min(max, next)).toFixed(3));
    const commit = () => {
        const parsed = Number(draft);
        const next =
            draft.trim() === '' || !Number.isFinite(parsed)
                ? value
                : normalize(parsed);
        setDraft(String(next));
        if (next !== value) onChange(next);
    };
    const adjust = (direction: number) => {
        const next = normalize(value + direction * step);
        setDraft(String(next));
        if (next !== value) onChange(next);
    };
    const decreaseLabel = text('decreaseValue', {
        label,
        step,
        suffix: suffix ?? '',
    });
    const increaseLabel = text('increaseValue', {
        label,
        step,
        suffix: suffix ?? '',
    });
    return (
        <div
            className={`ui-analysis-display-slider${resetValue !== undefined ? ' ui-analysis-display-slider-reset' : ''}`}>
            <label htmlFor={id}>{label}</label>
            <input
                id={id}
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                aria-valuetext={`${value}${suffix ?? ''}`}
                onChange={event => onChange(Number(event.currentTarget.value))}
            />
            <div className="ui-analysis-display-stepper">
                <button
                    type="button"
                    aria-label={decreaseLabel}
                    title={decreaseLabel}
                    disabled={value <= min}
                    onClick={() => adjust(-1)}>
                    −
                </button>
                <span className="ui-analysis-display-stepper-value">
                    <input
                        type="number"
                        inputMode="decimal"
                        aria-label={text('exactValue', {
                            label,
                        })}
                        min={min}
                        max={max}
                        step={step}
                        value={draft}
                        onChange={event => {
                            const text = event.currentTarget.value;
                            setDraft(text);
                            const next = Number(text);
                            if (
                                text !== '' &&
                                Number.isFinite(next) &&
                                next >= min &&
                                next <= max &&
                                next !== value
                            )
                                onChange(normalize(next));
                        }}
                        onBlur={commit}
                        onKeyDown={event => {
                            if (event.key === 'Enter') {
                                event.preventDefault();
                                event.currentTarget.blur();
                            } else if (event.key === 'Escape') {
                                event.preventDefault();
                                event.stopPropagation();
                                setDraft(String(value));
                            }
                        }}
                    />
                    {suffix && <span>{suffix}</span>}
                </span>
                <button
                    type="button"
                    aria-label={increaseLabel}
                    title={increaseLabel}
                    disabled={value >= max}
                    onClick={() => adjust(1)}>
                    +
                </button>
            </div>
            {resetValue !== undefined && (
                <button
                    type="button"
                    className="ui-analysis-display-slider-reset-button"
                    disabled={value === resetValue}
                    onClick={() => onChange(resetValue)}>
                    {resetLabel}
                </button>
            )}
        </div>
    );
}

function ColorControls({
    settings,
    onChange,
    fixedColorMode, colorModes = ['scoreLoss', 'recommendation'], onReset, outlineColor = '#0ac8fa',
}: {
    settings: AnalysisPointColorValue;
    onChange: (patch: Partial<AnalysisPointColorValue>) => void;
    fixedColorMode?: 'policy'; colorModes?: readonly AnalysisPointColorValue['colorMode'][]; onReset: () => void; outlineColor?: string;
}) {
    const label = useContext(LabelsContext);
    const topMoveColorId = useId();
    const colorMode = fixedColorMode ?? settings.colorMode;
    const policyColors = colorMode === 'policy';
    const bands = policyColors
        ? settings.policyBands.map(band => ({
              ...band,
              from: Number((band.from * 100).toFixed(1)),
          }))
        : settings.scoreBands;
    const maxBandValue = policyColors ? 100 : MAX_SCORE_LOSS;
    const upperInclusive =
        !policyColors && settings.upperInclusive;
    const onBandsChange = (bands: AnalysisColorBand[]) =>
        onChange(
            policyColors
                ? {
                      policyBands: bands.map(band => ({
                          ...band,
                          from: band.from / 100,
                      })),
                  }
                : {scoreBands: bands}
        );
    const changeBand = (index: number, patch: Partial<AnalysisColorBand>) =>
        onBandsChange(
            bands.map((band, i) => (i === index ? {...band, ...patch} : band))
        );
    const addAfter = (index: number) => {
        const current = bands[index].from;
        const upper = bands[index + 1]?.from;
        const from = Number(
            (upper === undefined ? current + 1 : (current + upper) / 2).toFixed(
                1
            )
        );
        if (
            from <= current ||
            (upper !== undefined && from >= upper) ||
            from > maxBandValue
        )
            return;
        onBandsChange([
            ...bands.slice(0, index + 1),
            {from, color: '#60a5fa'},
            ...bands.slice(index + 1),
        ]);
    };
    return (
        <fieldset className="ui-settings-fieldset ui-board-theme-fieldset">
            <legend>
                {label(policyColors ? 'policyColors' : 'scoreColors')}
            </legend>
            {!fixedColorMode && (
                <label className="ui-analysis-display-select">
                    <span>{label('colorMode')}</span>
                    <select
                        value={colorMode}
                        onChange={event =>
                            onChange({
                                colorMode: event.currentTarget
                                    .value as AnalysisPointColorValue['colorMode'],
                            })
                        }>
                        {colorModes.map(mode => <option key={mode} value={mode}>{label(mode === 'scoreLoss' ? 'colorByScore' : mode === 'recommendation' ? 'colorByRecommendation' : 'colorByPolicy')}</option>)}
                    </select>
                </label>
            )}
            {!policyColors && (
                <div
                    className="ui-analysis-display-top-move"
                    role="group"
                    aria-label={label('topMoveAppearance')}>
                    <div className="ui-analysis-display-color-row">
                        {colorMode === 'recommendation' ? (
                            <label htmlFor={topMoveColorId}>
                                {label('topMoveColor')}
                            </label>
                        ) : (
                            <label className="ui-analysis-display-check">
                                <input
                                    type="checkbox"
                                    checked={settings.topMoveColorEnabled}
                                    onChange={event =>
                                        onChange({
                                            topMoveColorEnabled:
                                                event.currentTarget.checked,
                                        })
                                    }
                                />
                                {label('topMoveColor')}
                            </label>
                        )}
                        {(colorMode === 'recommendation' ||
                            settings.topMoveColorEnabled) && (
                            <input
                                id={topMoveColorId}
                                type="color"
                                aria-label={label('topMoveColor')}
                                title={label('topMoveColor')}
                                value={settings.topMoveColor}
                                onChange={event =>
                                    onChange({
                                        topMoveColor: event.currentTarget.value,
                                    })
                                }
                            />
                        )}
                    </div>
                    <div className="ui-analysis-display-color-row">
                        <label className="ui-analysis-display-check">
                            <input
                                type="checkbox"
                                checked={settings.topMoveOutline !== null}
                                onChange={event =>
                                    onChange({
                                        topMoveOutline: event.currentTarget
                                            .checked
                                            ? outlineColor
                                            : null,
                                    })
                                }
                            />
                            {label('topMoveOutlineEnabled')}
                        </label>
                        {settings.topMoveOutline !== null && (
                            <input
                                type="color"
                                aria-label={label('topMoveOutline')}
                                title={label('topMoveOutline')}
                                value={settings.topMoveOutline}
                                onChange={event =>
                                    onChange({
                                        topMoveOutline:
                                            event.currentTarget.value,
                                    })
                                }
                            />
                        )}
                    </div>
                </div>
            )}
            {colorMode === 'recommendation' ? (
                <>
                    <label className="ui-analysis-display-select">
                        <span>{label('otherMoveColor')}</span>
                        <input
                            type="color"
                            value={settings.otherMoveColor}
                            onChange={event =>
                                onChange({
                                    otherMoveColor: event.currentTarget.value,
                                })
                            }
                        />
                    </label>
                </>
            ) : (
                <>
                    <div className="ui-analysis-score-bands">
                        {bands.map((band, index) => (
                            <div className="ui-analysis-score-band" key={index}>
                                <label className="ui-analysis-score-swatch">
                                    <span className="sr-only">
                                        {label('bandColor', {index: index + 1})}
                                    </span>
                                    <input
                                        type="color"
                                        value={band.color}
                                        onChange={event =>
                                            changeBand(index, {
                                                color: event.currentTarget
                                                    .value,
                                            })
                                        }
                                    />
                                </label>
                                {index === 0 ? (
                                    <span className="ui-analysis-score-from">
                                        {label('fromZero')}
                                        {policyColors ? '%' : ''}
                                    </span>
                                ) : (
                                    <NumberSetting
                                        label={label(
                                            upperInclusive
                                                ? 'overLoss'
                                                : 'fromLoss'
                                        )}
                                        value={band.from}
                                        min={Number(
                                            (
                                                bands[index - 1].from + 0.1
                                            ).toFixed(1)
                                        )}
                                        max={
                                            bands[index + 1]
                                                ? Number(
                                                      (
                                                          bands[index + 1]
                                                              .from - 0.1
                                                      ).toFixed(1)
                                                  )
                                                : maxBandValue
                                        }
                                        step={0.1}
                                        suffix={policyColors ? '%' : undefined}
                                        onChange={from =>
                                            changeBand(index, {
                                                from: Number(from.toFixed(1)),
                                            })
                                        }
                                    />
                                )}
                                <span className="ui-analysis-score-range">
                                    {bands[index + 1]
                                        ? label(
                                              policyColors
                                                  ? 'belowPolicy'
                                                  : upperInclusive
                                                    ? 'upToLoss'
                                                    : 'belowLoss',
                                              {
                                                  value: bands[index + 1].from,
                                              }
                                          )
                                        : label('andAbove')}
                                </span>
                                <div className="ui-analysis-score-band-actions">
                                    <button
                                        type="button"
                                        aria-label={label('addAfterBand', {
                                            index: index + 1,
                                        })}
                                        disabled={
                                            bands.length >= MAX_SCORE_BANDS ||
                                            (bands[index + 1]
                                                ? bands[index + 1].from -
                                                      band.from <
                                                  0.199999
                                                : band.from >= maxBandValue)
                                        }
                                        onClick={() => addAfter(index)}>
                                        +
                                    </button>
                                    <button
                                        type="button"
                                        aria-label={label('removeBand', {
                                            index: index + 1,
                                        })}
                                        disabled={bands.length === 1}
                                        onClick={() => {
                                            const next = bands.filter(
                                                (_, i) => i !== index
                                            );
                                            onBandsChange(
                                                next.map((item, i) =>
                                                    i === 0
                                                        ? {...item, from: 0}
                                                        : item
                                                )
                                            );
                                        }}>
                                        −
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
            <div className="ui-analysis-display-colors-footer">
                <button
                    type="button"
                    className="ui-analysis-display-reset"
                    aria-label={label('resetColors')}
                    title={label('resetColors')}
                    onClick={onReset}>
                    <span aria-hidden="true">↺</span>{label('reset')}
                </button>
            </div>
        </fieldset>
    );
}


export type AnalysisPointDisplayControlsProps = {
    value: AnalysisPointDisplayValue; onChange: (patch: Partial<AnalysisPointDisplayValue>) => void;
    label: AnalysisDisplayLabels; preset: string; presets: readonly {value: string; label: string}[];
    onPresetChange: (preset: string) => void; onResetPreset: () => void; resetPresetLabel: string;
    opacity: number; defaultOpacity: number; onOpacityChange: (opacity: number) => void;
    onRuleBasisChange: (rule: 'hide' | 'compact', basis: AnalysisDisplayBasis) => void;
    onEmphasisBasisChange: (basis: AnalysisDisplayEmphasis['basis']) => void;
    preview?: ReactNode; layoutControls?: ReactNode; colorControls?: ReactNode;
    fixedBasisLabel?: string; emphasisVisitsHelp?: string;
    compactExtraControls?: ReactNode; compactAppearanceEnabled?: boolean;
};
function DisplayControls({value, onChange, preset, presets, onPresetChange, onResetPreset, resetPresetLabel, opacity, defaultOpacity, onOpacityChange, onRuleBasisChange, onEmphasisBasisChange, preview, layoutControls, colorControls, fixedBasisLabel, emphasisVisitsHelp, compactExtraControls, compactAppearanceEnabled}: AnalysisPointDisplayControlsProps) {
    const label = useContext(LabelsContext);
    const id = useId();
    const percentage = (key: 'compactScale' | 'compactOpacity' | 'compactSoftness', min = 0) =>
        <SliderSetting label={label(key)} value={Number((value[key] * 100).toFixed(3))} min={min} max={100} suffix="%" onChange={next => onChange({[key]: next / 100})}/>;
    const visibility = (rule: 'hide' | 'compact') => {
        const current = value[rule];
        const absolute = current.basis === 'visitsAbsolute';
        const Setting = absolute ? NumberSetting : SliderSetting;
        const thresholdLabel = label(rule === 'hide' ? 'hideBelow' : 'compactBelow');
        return <div className="ui-analysis-display-cutoff">
            <div className="ui-analysis-display-cutoff-heading">
                <label className="ui-analysis-display-check"><input type="checkbox" checked={current.enabled} onChange={event => onChange({[rule]: {...current, enabled: event.currentTarget.checked}})}/>{label(rule)}</label>
                {fixedBasisLabel ? <span className="ui-analysis-display-fixed-basis">{fixedBasisLabel}</span> : <AnalysisBasisChoices label={label('ruleBasis', {rule: thresholdLabel})} value={current.basis} onChange={basis => onRuleBasisChange(rule, basis)}/>}
            </div>
            {current.enabled && <Setting key={current.basis} label={thresholdLabel} value={Number((current.threshold * (absolute ? 1 : 100)).toFixed(3))} max={absolute ? 1e9 : 100} step={absolute ? 1 : 0.1} suffix={absolute ? label('visitsUnit') : '%'} onChange={threshold => onChange({[rule]: {...current, threshold: threshold / (absolute ? 1 : 100)}})}/>}
            {rule === 'compact' && compactExtraControls && <div className="ui-analysis-display-continuation-rule">{compactExtraControls}</div>}
            {rule === 'compact' && (current.enabled || compactAppearanceEnabled) && <div className="ui-analysis-display-compact-appearance">{percentage('compactScale', 20)}{percentage('compactOpacity')}{percentage('compactSoftness')}</div>}
        </div>;
    };
    const emphasis = value.emphasis;
    const changeEmphasis = (patch: Partial<AnalysisDisplayEmphasis>) => onChange({emphasis: {...emphasis, ...patch}});
    const emphasisPercentage = (key: 'minSaturation' | 'maxSaturation' | 'minScale' | 'minOpacity', min: number, max: number) =>
        <SliderSetting label={label(key)} value={Number((emphasis[key] * 100).toFixed(3))} min={min} max={max} suffix="%" onChange={next => changeEmphasis({[key]: next / 100})}/>;
    return <div className="ui-analysis-display-settings">
        {layoutControls}
        <fieldset className="ui-settings-fieldset"><legend id={id + '-preset'}>{label('presets')}</legend>
            <div className="ui-analysis-display-header"><div className="ui-analysis-display-preset-picker">
                <select className="ui-analysis-display-preset-select" aria-labelledby={id + '-preset'} value={preset} onChange={event => onPresetChange(event.currentTarget.value)}>{presets.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}</select>
                {preset === 'custom' && <button type="button" className="ui-analysis-display-preset-reset" onClick={onResetPreset}>{resetPresetLabel}</button>}
            </div>{preview && <div className="ui-analysis-display-preview">{preview}</div>}</div>
            <SliderSetting label={label('opacity')} value={Number((opacity * 100).toFixed(3))} min={20} max={100} suffix="%" resetValue={defaultOpacity * 100} resetLabel={label('resetOpacity')} onChange={next => onOpacityChange(next / 100)}/>
        </fieldset>
        <fieldset className="ui-settings-fieldset"><legend>{label('visibility')}</legend>{visibility('hide')}{visibility('compact')}</fieldset>
        <fieldset className="ui-settings-fieldset"><legend>{label('emphasis')}</legend>
            <label className="ui-analysis-display-check"><input type="checkbox" checked={emphasis.enabled} onChange={event => changeEmphasis({enabled: event.currentTarget.checked})}/>{label('emphasisEnabled')}</label>
            {emphasis.enabled && <>
                <div className="ui-analysis-display-basis-row"><span>{label('emphasisBasis')}</span>{fixedBasisLabel ? <span className="ui-analysis-display-fixed-basis">{fixedBasisLabel}</span> : <AnalysisBasisChoices label={label('emphasisBasis')} value={emphasis.basis} bases={['policy', 'visitsRelative']} visitsRelativeHelp={emphasisVisitsHelp} onChange={basis => onEmphasisBasisChange(basis as AnalysisDisplayEmphasis['basis'])}/>}</div>
                <SliderSetting label={label('fullAt')} value={Number((emphasis.fullAt * 100).toFixed(3))} max={100} suffix="%" onChange={next => changeEmphasis({fullAt: next / 100})}/>
                {emphasisPercentage('minSaturation', 0, emphasis.maxSaturation * 100)}{emphasisPercentage('maxSaturation', emphasis.minSaturation * 100, 100)}{emphasisPercentage('minScale', 20, 100)}{emphasisPercentage('minOpacity', 0, 100)}
            </>}
        </fieldset>
        {colorControls}
    </div>;
}
export function AnalysisPointDisplayControls(props: AnalysisPointDisplayControlsProps) {
    return <LabelsContext.Provider value={props.label}><DisplayControls {...props}/></LabelsContext.Provider>;
}
export type AnalysisPointColorEditorProps = Parameters<typeof ColorControls>[0] & {label: AnalysisDisplayLabels};
export function AnalysisPointColorEditor({label, ...props}: AnalysisPointColorEditorProps) {
    return <LabelsContext.Provider value={label}><ColorControls {...props}/></LabelsContext.Provider>;
}
