import { c as _c } from "react/compiler-runtime";
import { createContext, useContext, useEffect, useId, useState } from 'react';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
const MAX_SCORE_BANDS = 16;
const MAX_SCORE_LOSS = 1000;
const LabelsContext = /*#__PURE__*/createContext(key => key);
function AnalysisBasisChoices({
  label,
  value,
  onChange,
  bases = ['policy', 'visitsRelative', 'visitsAbsolute'],
  visitsRelativeHelp
}) {
  const text = useContext(LabelsContext);
  const name = useId();
  return /*#__PURE__*/_jsx("div", {
    className: 'ui-analysis-display-basis-options' + (bases.length === 2 ? ' ui-analysis-display-basis-options-pair' : ''),
    role: "radiogroup",
    "aria-label": label,
    children: bases.map(basis => /*#__PURE__*/_jsxs("label", {
      title: basis === 'visitsRelative' ? visitsRelativeHelp : undefined,
      className: value === basis ? 'is-selected' : undefined,
      children: [/*#__PURE__*/_jsx("input", {
        type: "radio",
        name: name,
        value: basis,
        checked: value === basis,
        onChange: () => onChange(basis)
      }), /*#__PURE__*/_jsx("span", {
        children: text('basisOption.' + basis)
      })]
    }, basis))
  });
}
function NumberSetting({
  label,
  value,
  min = 0,
  max,
  step = 1,
  suffix,
  onChange
}) {
  const [draft, setDraft] = useState(String(value));
  useEffect(() => setDraft(String(value)), [value]);
  return /*#__PURE__*/_jsxs("label", {
    className: "ui-analysis-display-number",
    children: [/*#__PURE__*/_jsx("span", {
      children: label
    }), /*#__PURE__*/_jsxs("span", {
      children: [/*#__PURE__*/_jsx("input", {
        type: "number",
        min: min,
        max: max,
        step: step,
        value: draft,
        onChange: event => {
          const text = event.currentTarget.value;
          setDraft(text);
          const n = Number(text);
          if (text !== '' && Number.isFinite(n) && n >= min && n <= max && (step !== 1 || Number.isInteger(n))) onChange(n);
        },
        onBlur: () => {
          const n_0 = Number(draft);
          const next = draft === '' || !Number.isFinite(n_0) ? value : Math.max(min, Math.min(max, step === 1 ? Math.round(n_0) : n_0));
          setDraft(String(next));
          if (next !== value) onChange(next);
        }
      }), suffix && /*#__PURE__*/_jsx("span", {
        children: suffix
      })]
    })]
  });
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
  resetLabel
}) {
  const text = useContext(LabelsContext);
  const id = useId();
  const [draft, setDraft] = useState(String(value));
  useEffect(() => setDraft(String(value)), [value]);
  const normalize = next => Number(Math.max(min, Math.min(max, next)).toFixed(3));
  const commit = () => {
    const parsed = Number(draft);
    const next_0 = draft.trim() === '' || !Number.isFinite(parsed) ? value : normalize(parsed);
    setDraft(String(next_0));
    if (next_0 !== value) onChange(next_0);
  };
  const adjust = direction => {
    const next_1 = normalize(value + direction * step);
    setDraft(String(next_1));
    if (next_1 !== value) onChange(next_1);
  };
  const decreaseLabel = text('decreaseValue', {
    label,
    step,
    suffix: suffix ?? ''
  });
  const increaseLabel = text('increaseValue', {
    label,
    step,
    suffix: suffix ?? ''
  });
  return /*#__PURE__*/_jsxs("div", {
    className: `ui-analysis-display-slider${resetValue !== undefined ? ' ui-analysis-display-slider-reset' : ''}`,
    children: [/*#__PURE__*/_jsx("label", {
      htmlFor: id,
      children: label
    }), /*#__PURE__*/_jsx("input", {
      id: id,
      type: "range",
      min: min,
      max: max,
      step: step,
      value: value,
      "aria-valuetext": `${value}${suffix ?? ''}`,
      onChange: event => onChange(Number(event.currentTarget.value))
    }), /*#__PURE__*/_jsxs("div", {
      className: "ui-analysis-display-stepper",
      children: [/*#__PURE__*/_jsx("button", {
        type: "button",
        "aria-label": decreaseLabel,
        title: decreaseLabel,
        disabled: value <= min,
        onClick: () => adjust(-1),
        children: "−"
      }), /*#__PURE__*/_jsxs("span", {
        className: "ui-analysis-display-stepper-value",
        children: [/*#__PURE__*/_jsx("input", {
          type: "number",
          inputMode: "decimal",
          "aria-label": text('exactValue', {
            label
          }),
          min: min,
          max: max,
          step: step,
          value: draft,
          onChange: event_0 => {
            const text_0 = event_0.currentTarget.value;
            setDraft(text_0);
            const next_2 = Number(text_0);
            if (text_0 !== '' && Number.isFinite(next_2) && next_2 >= min && next_2 <= max && next_2 !== value) onChange(normalize(next_2));
          },
          onBlur: commit,
          onKeyDown: event_1 => {
            if (event_1.key === 'Enter') {
              event_1.preventDefault();
              event_1.currentTarget.blur();
            } else if (event_1.key === 'Escape') {
              event_1.preventDefault();
              event_1.stopPropagation();
              setDraft(String(value));
            }
          }
        }), suffix && /*#__PURE__*/_jsx("span", {
          children: suffix
        })]
      }), /*#__PURE__*/_jsx("button", {
        type: "button",
        "aria-label": increaseLabel,
        title: increaseLabel,
        disabled: value >= max,
        onClick: () => adjust(1),
        children: "+"
      })]
    }), resetValue !== undefined && /*#__PURE__*/_jsx("button", {
      type: "button",
      className: "ui-analysis-display-slider-reset-button",
      disabled: value === resetValue,
      onClick: () => onChange(resetValue),
      children: resetLabel
    })]
  });
}
function ColorControls({
  settings,
  onChange,
  fixedColorMode,
  colorModes = ['scoreLoss', 'recommendation'],
  onReset,
  outlineColor = '#0ac8fa'
}) {
  const label = useContext(LabelsContext);
  const topMoveColorId = useId();
  const colorMode = fixedColorMode ?? settings.colorMode;
  const policyColors = colorMode === 'policy';
  const bands = policyColors ? settings.policyBands.map(band => ({
    ...band,
    from: Number((band.from * 100).toFixed(1))
  })) : settings.scoreBands;
  const maxBandValue = policyColors ? 100 : MAX_SCORE_LOSS;
  const upperInclusive = !policyColors && settings.upperInclusive;
  const onBandsChange = bands_0 => onChange(policyColors ? {
    policyBands: bands_0.map(band_0 => ({
      ...band_0,
      from: band_0.from / 100
    }))
  } : {
    scoreBands: bands_0
  });
  const changeBand = (index, patch) => onBandsChange(bands.map((band_1, i) => i === index ? {
    ...band_1,
    ...patch
  } : band_1));
  const addAfter = index_0 => {
    const current = bands[index_0].from;
    const upper = bands[index_0 + 1]?.from;
    const from = Number((upper === undefined ? current + 1 : (current + upper) / 2).toFixed(1));
    if (from <= current || upper !== undefined && from >= upper || from > maxBandValue) return;
    onBandsChange([...bands.slice(0, index_0 + 1), {
      from,
      color: '#60a5fa'
    }, ...bands.slice(index_0 + 1)]);
  };
  return /*#__PURE__*/_jsxs("fieldset", {
    className: "ui-settings-fieldset ui-board-theme-fieldset",
    children: [/*#__PURE__*/_jsx("legend", {
      children: label(policyColors ? 'policyColors' : 'scoreColors')
    }), !fixedColorMode && /*#__PURE__*/_jsxs("label", {
      className: "ui-analysis-display-select",
      children: [/*#__PURE__*/_jsx("span", {
        children: label('colorMode')
      }), /*#__PURE__*/_jsx("select", {
        value: colorMode,
        onChange: event => onChange({
          colorMode: event.currentTarget.value
        }),
        children: colorModes.map(mode => /*#__PURE__*/_jsx("option", {
          value: mode,
          children: label(mode === 'scoreLoss' ? 'colorByScore' : mode === 'recommendation' ? 'colorByRecommendation' : 'colorByPolicy')
        }, mode))
      })]
    }), !policyColors && /*#__PURE__*/_jsxs("div", {
      className: "ui-analysis-display-top-move",
      role: "group",
      "aria-label": label('topMoveAppearance'),
      children: [/*#__PURE__*/_jsxs("div", {
        className: "ui-analysis-display-color-row",
        children: [colorMode === 'recommendation' ? /*#__PURE__*/_jsx("label", {
          htmlFor: topMoveColorId,
          children: label('topMoveColor')
        }) : /*#__PURE__*/_jsxs("label", {
          className: "ui-analysis-display-check",
          children: [/*#__PURE__*/_jsx("input", {
            type: "checkbox",
            checked: settings.topMoveColorEnabled,
            onChange: event_0 => onChange({
              topMoveColorEnabled: event_0.currentTarget.checked
            })
          }), label('topMoveColor')]
        }), (colorMode === 'recommendation' || settings.topMoveColorEnabled) && /*#__PURE__*/_jsx("input", {
          id: topMoveColorId,
          type: "color",
          "aria-label": label('topMoveColor'),
          title: label('topMoveColor'),
          value: settings.topMoveColor,
          onChange: event_1 => onChange({
            topMoveColor: event_1.currentTarget.value
          })
        })]
      }), /*#__PURE__*/_jsxs("div", {
        className: "ui-analysis-display-color-row",
        children: [/*#__PURE__*/_jsxs("label", {
          className: "ui-analysis-display-check",
          children: [/*#__PURE__*/_jsx("input", {
            type: "checkbox",
            checked: settings.topMoveOutline !== null,
            onChange: event_2 => onChange({
              topMoveOutline: event_2.currentTarget.checked ? outlineColor : null
            })
          }), label('topMoveOutlineEnabled')]
        }), settings.topMoveOutline !== null && /*#__PURE__*/_jsx("input", {
          type: "color",
          "aria-label": label('topMoveOutline'),
          title: label('topMoveOutline'),
          value: settings.topMoveOutline,
          onChange: event_3 => onChange({
            topMoveOutline: event_3.currentTarget.value
          })
        })]
      })]
    }), colorMode === 'recommendation' ? /*#__PURE__*/_jsx(_Fragment, {
      children: /*#__PURE__*/_jsxs("label", {
        className: "ui-analysis-display-select",
        children: [/*#__PURE__*/_jsx("span", {
          children: label('otherMoveColor')
        }), /*#__PURE__*/_jsx("input", {
          type: "color",
          value: settings.otherMoveColor,
          onChange: event_4 => onChange({
            otherMoveColor: event_4.currentTarget.value
          })
        })]
      })
    }) : /*#__PURE__*/_jsx(_Fragment, {
      children: /*#__PURE__*/_jsx("div", {
        className: "ui-analysis-score-bands",
        children: bands.map((band_2, index_1) => /*#__PURE__*/_jsxs("div", {
          className: "ui-analysis-score-band",
          children: [/*#__PURE__*/_jsxs("label", {
            className: "ui-analysis-score-swatch",
            children: [/*#__PURE__*/_jsx("span", {
              className: "sr-only",
              children: label('bandColor', {
                index: index_1 + 1
              })
            }), /*#__PURE__*/_jsx("input", {
              type: "color",
              value: band_2.color,
              onChange: event_5 => changeBand(index_1, {
                color: event_5.currentTarget.value
              })
            })]
          }), index_1 === 0 ? /*#__PURE__*/_jsxs("span", {
            className: "ui-analysis-score-from",
            children: [label('fromZero'), policyColors ? '%' : '']
          }) : /*#__PURE__*/_jsx(NumberSetting, {
            label: label(upperInclusive ? 'overLoss' : 'fromLoss'),
            value: band_2.from,
            min: Number((bands[index_1 - 1].from + 0.1).toFixed(1)),
            max: bands[index_1 + 1] ? Number((bands[index_1 + 1].from - 0.1).toFixed(1)) : maxBandValue,
            step: 0.1,
            suffix: policyColors ? '%' : undefined,
            onChange: from_0 => changeBand(index_1, {
              from: Number(from_0.toFixed(1))
            })
          }), /*#__PURE__*/_jsx("span", {
            className: "ui-analysis-score-range",
            children: bands[index_1 + 1] ? label(policyColors ? 'belowPolicy' : upperInclusive ? 'upToLoss' : 'belowLoss', {
              value: bands[index_1 + 1].from
            }) : label('andAbove')
          }), /*#__PURE__*/_jsxs("div", {
            className: "ui-analysis-score-band-actions",
            children: [/*#__PURE__*/_jsx("button", {
              type: "button",
              "aria-label": label('addAfterBand', {
                index: index_1 + 1
              }),
              disabled: bands.length >= MAX_SCORE_BANDS || (bands[index_1 + 1] ? bands[index_1 + 1].from - band_2.from < 0.199999 : band_2.from >= maxBandValue),
              onClick: () => addAfter(index_1),
              children: "+"
            }), /*#__PURE__*/_jsx("button", {
              type: "button",
              "aria-label": label('removeBand', {
                index: index_1 + 1
              }),
              disabled: bands.length === 1,
              onClick: () => {
                const next = bands.filter((_, i_0) => i_0 !== index_1);
                onBandsChange(next.map((item, i_1) => i_1 === 0 ? {
                  ...item,
                  from: 0
                } : item));
              },
              children: "−"
            })]
          })]
        }, index_1))
      })
    }), /*#__PURE__*/_jsx("div", {
      className: "ui-analysis-display-colors-footer",
      children: /*#__PURE__*/_jsxs("button", {
        type: "button",
        className: "ui-analysis-display-reset",
        "aria-label": label('resetColors'),
        title: label('resetColors'),
        onClick: onReset,
        children: [/*#__PURE__*/_jsx("span", {
          "aria-hidden": "true",
          children: "↺"
        }), label('reset')]
      })
    })]
  });
}
function DisplayControls(t0) {
  const $ = _c(111);
  const {
    value,
    onChange,
    preset,
    presets,
    onPresetChange,
    onResetPreset,
    resetPresetLabel,
    opacity,
    defaultOpacity,
    onOpacityChange,
    onRuleBasisChange,
    onEmphasisBasisChange,
    preview,
    layoutControls,
    colorControls,
    fixedBasisLabel,
    emphasisVisitsHelp,
    compactExtraControls,
    compactAppearanceEnabled
  } = t0;
  const label = useContext(LabelsContext);
  const id = useId();
  let t1;
  if ($[0] !== label || $[1] !== onChange || $[2] !== value) {
    t1 = (key, t2) => {
      const min = t2 === undefined ? 0 : t2;
      return /*#__PURE__*/_jsx(SliderSetting, {
        label: label(key),
        value: Number((value[key] * 100).toFixed(3)),
        min: min,
        max: 100,
        suffix: "%",
        onChange: next => onChange({
          [key]: next / 100
        })
      });
    };
    $[0] = label;
    $[1] = onChange;
    $[2] = value;
    $[3] = t1;
  } else {
    t1 = $[3];
  }
  const percentage = t1;
  let t2;
  if ($[4] !== compactAppearanceEnabled || $[5] !== compactExtraControls || $[6] !== fixedBasisLabel || $[7] !== label || $[8] !== onChange || $[9] !== onRuleBasisChange || $[10] !== percentage || $[11] !== value) {
    t2 = rule => {
      const current = value[rule];
      const absolute = current.basis === "visitsAbsolute";
      const Setting = absolute ? NumberSetting : SliderSetting;
      const thresholdLabel = label(rule === "hide" ? "hideBelow" : "compactBelow");
      return /*#__PURE__*/_jsxs("div", {
        className: "ui-analysis-display-cutoff",
        children: [/*#__PURE__*/_jsxs("div", {
          className: "ui-analysis-display-cutoff-heading",
          children: [/*#__PURE__*/_jsxs("label", {
            className: "ui-analysis-display-check",
            children: [/*#__PURE__*/_jsx("input", {
              type: "checkbox",
              checked: current.enabled,
              onChange: event => onChange({
                [rule]: {
                  ...current,
                  enabled: event.currentTarget.checked
                }
              })
            }), label(rule)]
          }), fixedBasisLabel ? /*#__PURE__*/_jsx("span", {
            className: "ui-analysis-display-fixed-basis",
            children: fixedBasisLabel
          }) : /*#__PURE__*/_jsx(AnalysisBasisChoices, {
            label: label("ruleBasis", {
              rule: thresholdLabel
            }),
            value: current.basis,
            onChange: basis => onRuleBasisChange(rule, basis)
          })]
        }), current.enabled && /*#__PURE__*/_jsx(Setting, {
          label: thresholdLabel,
          value: Number((current.threshold * (absolute ? 1 : 100)).toFixed(3)),
          max: absolute ? 1000000000 : 100,
          step: absolute ? 1 : 0.1,
          suffix: absolute ? label("visitsUnit") : "%",
          onChange: threshold => onChange({
            [rule]: {
              ...current,
              threshold: threshold / (absolute ? 1 : 100)
            }
          })
        }, current.basis), rule === "compact" && compactExtraControls && /*#__PURE__*/_jsx("div", {
          className: "ui-analysis-display-continuation-rule",
          children: compactExtraControls
        }), rule === "compact" && (current.enabled || compactAppearanceEnabled) && /*#__PURE__*/_jsxs("div", {
          className: "ui-analysis-display-compact-appearance",
          children: [percentage("compactScale", 20), percentage("compactOpacity"), percentage("compactSoftness")]
        })]
      });
    };
    $[4] = compactAppearanceEnabled;
    $[5] = compactExtraControls;
    $[6] = fixedBasisLabel;
    $[7] = label;
    $[8] = onChange;
    $[9] = onRuleBasisChange;
    $[10] = percentage;
    $[11] = value;
    $[12] = t2;
  } else {
    t2 = $[12];
  }
  const visibility = t2;
  const emphasis = value.emphasis;
  let t3;
  if ($[13] !== emphasis || $[14] !== onChange) {
    t3 = patch => onChange({
      emphasis: {
        ...emphasis,
        ...patch
      }
    });
    $[13] = emphasis;
    $[14] = onChange;
    $[15] = t3;
  } else {
    t3 = $[15];
  }
  const changeEmphasis = t3;
  let t4;
  if ($[16] !== changeEmphasis || $[17] !== emphasis || $[18] !== label) {
    t4 = (key_0, min_0, max) => /*#__PURE__*/_jsx(SliderSetting, {
      label: label(key_0),
      value: Number((emphasis[key_0] * 100).toFixed(3)),
      min: min_0,
      max: max,
      suffix: "%",
      onChange: next_0 => changeEmphasis({
        [key_0]: next_0 / 100
      })
    });
    $[16] = changeEmphasis;
    $[17] = emphasis;
    $[18] = label;
    $[19] = t4;
  } else {
    t4 = $[19];
  }
  const emphasisPercentage = t4;
  const t5 = id + "-preset";
  let t6;
  if ($[20] !== label) {
    t6 = label("presets");
    $[20] = label;
    $[21] = t6;
  } else {
    t6 = $[21];
  }
  let t7;
  if ($[22] !== t5 || $[23] !== t6) {
    t7 = /*#__PURE__*/_jsx("legend", {
      id: t5,
      children: t6
    });
    $[22] = t5;
    $[23] = t6;
    $[24] = t7;
  } else {
    t7 = $[24];
  }
  const t8 = id + "-preset";
  let t9;
  if ($[25] !== onPresetChange) {
    t9 = event_0 => onPresetChange(event_0.currentTarget.value);
    $[25] = onPresetChange;
    $[26] = t9;
  } else {
    t9 = $[26];
  }
  let t10;
  if ($[27] !== presets) {
    t10 = presets.map(_temp);
    $[27] = presets;
    $[28] = t10;
  } else {
    t10 = $[28];
  }
  let t11;
  if ($[29] !== preset || $[30] !== t10 || $[31] !== t8 || $[32] !== t9) {
    t11 = /*#__PURE__*/_jsx("select", {
      className: "ui-analysis-display-preset-select",
      "aria-labelledby": t8,
      value: preset,
      onChange: t9,
      children: t10
    });
    $[29] = preset;
    $[30] = t10;
    $[31] = t8;
    $[32] = t9;
    $[33] = t11;
  } else {
    t11 = $[33];
  }
  let t12;
  if ($[34] !== onResetPreset || $[35] !== preset || $[36] !== resetPresetLabel) {
    t12 = preset === "custom" && /*#__PURE__*/_jsx("button", {
      type: "button",
      className: "ui-analysis-display-preset-reset",
      onClick: onResetPreset,
      children: resetPresetLabel
    });
    $[34] = onResetPreset;
    $[35] = preset;
    $[36] = resetPresetLabel;
    $[37] = t12;
  } else {
    t12 = $[37];
  }
  let t13;
  if ($[38] !== t11 || $[39] !== t12) {
    t13 = /*#__PURE__*/_jsxs("div", {
      className: "ui-analysis-display-preset-picker",
      children: [t11, t12]
    });
    $[38] = t11;
    $[39] = t12;
    $[40] = t13;
  } else {
    t13 = $[40];
  }
  let t14;
  if ($[41] !== preview) {
    t14 = preview && /*#__PURE__*/_jsx("div", {
      className: "ui-analysis-display-preview",
      children: preview
    });
    $[41] = preview;
    $[42] = t14;
  } else {
    t14 = $[42];
  }
  let t15;
  if ($[43] !== t13 || $[44] !== t14) {
    t15 = /*#__PURE__*/_jsxs("div", {
      className: "ui-analysis-display-header",
      children: [t13, t14]
    });
    $[43] = t13;
    $[44] = t14;
    $[45] = t15;
  } else {
    t15 = $[45];
  }
  let t16;
  if ($[46] !== label) {
    t16 = label("opacity");
    $[46] = label;
    $[47] = t16;
  } else {
    t16 = $[47];
  }
  const t17 = opacity * 100;
  let t18;
  if ($[48] !== t17) {
    t18 = t17.toFixed(3);
    $[48] = t17;
    $[49] = t18;
  } else {
    t18 = $[49];
  }
  const t19 = Number(t18);
  const t20 = defaultOpacity * 100;
  let t21;
  if ($[50] !== label) {
    t21 = label("resetOpacity");
    $[50] = label;
    $[51] = t21;
  } else {
    t21 = $[51];
  }
  let t22;
  if ($[52] !== onOpacityChange) {
    t22 = next_1 => onOpacityChange(next_1 / 100);
    $[52] = onOpacityChange;
    $[53] = t22;
  } else {
    t22 = $[53];
  }
  let t23;
  if ($[54] !== t16 || $[55] !== t19 || $[56] !== t20 || $[57] !== t21 || $[58] !== t22) {
    t23 = /*#__PURE__*/_jsx(SliderSetting, {
      label: t16,
      value: t19,
      min: 20,
      max: 100,
      suffix: "%",
      resetValue: t20,
      resetLabel: t21,
      onChange: t22
    });
    $[54] = t16;
    $[55] = t19;
    $[56] = t20;
    $[57] = t21;
    $[58] = t22;
    $[59] = t23;
  } else {
    t23 = $[59];
  }
  let t24;
  if ($[60] !== t15 || $[61] !== t23 || $[62] !== t7) {
    t24 = /*#__PURE__*/_jsxs("fieldset", {
      className: "ui-settings-fieldset",
      children: [t7, t15, t23]
    });
    $[60] = t15;
    $[61] = t23;
    $[62] = t7;
    $[63] = t24;
  } else {
    t24 = $[63];
  }
  let t25;
  if ($[64] !== label) {
    t25 = label("visibility");
    $[64] = label;
    $[65] = t25;
  } else {
    t25 = $[65];
  }
  let t26;
  if ($[66] !== t25) {
    t26 = /*#__PURE__*/_jsx("legend", {
      children: t25
    });
    $[66] = t25;
    $[67] = t26;
  } else {
    t26 = $[67];
  }
  let t27;
  let t28;
  if ($[68] !== visibility) {
    t27 = visibility("hide");
    t28 = visibility("compact");
    $[68] = visibility;
    $[69] = t27;
    $[70] = t28;
  } else {
    t27 = $[69];
    t28 = $[70];
  }
  let t29;
  if ($[71] !== t26 || $[72] !== t27 || $[73] !== t28) {
    t29 = /*#__PURE__*/_jsxs("fieldset", {
      className: "ui-settings-fieldset",
      children: [t26, t27, t28]
    });
    $[71] = t26;
    $[72] = t27;
    $[73] = t28;
    $[74] = t29;
  } else {
    t29 = $[74];
  }
  let t30;
  if ($[75] !== label) {
    t30 = label("emphasis");
    $[75] = label;
    $[76] = t30;
  } else {
    t30 = $[76];
  }
  let t31;
  if ($[77] !== t30) {
    t31 = /*#__PURE__*/_jsx("legend", {
      children: t30
    });
    $[77] = t30;
    $[78] = t31;
  } else {
    t31 = $[78];
  }
  let t32;
  if ($[79] !== changeEmphasis) {
    t32 = event_1 => changeEmphasis({
      enabled: event_1.currentTarget.checked
    });
    $[79] = changeEmphasis;
    $[80] = t32;
  } else {
    t32 = $[80];
  }
  let t33;
  if ($[81] !== emphasis.enabled || $[82] !== t32) {
    t33 = /*#__PURE__*/_jsx("input", {
      type: "checkbox",
      checked: emphasis.enabled,
      onChange: t32
    });
    $[81] = emphasis.enabled;
    $[82] = t32;
    $[83] = t33;
  } else {
    t33 = $[83];
  }
  let t34;
  if ($[84] !== label) {
    t34 = label("emphasisEnabled");
    $[84] = label;
    $[85] = t34;
  } else {
    t34 = $[85];
  }
  let t35;
  if ($[86] !== t33 || $[87] !== t34) {
    t35 = /*#__PURE__*/_jsxs("label", {
      className: "ui-analysis-display-check",
      children: [t33, t34]
    });
    $[86] = t33;
    $[87] = t34;
    $[88] = t35;
  } else {
    t35 = $[88];
  }
  let t36;
  if ($[89] !== changeEmphasis || $[90] !== emphasis.basis || $[91] !== emphasis.enabled || $[92] !== emphasis.fullAt || $[93] !== emphasis.maxSaturation || $[94] !== emphasis.minSaturation || $[95] !== emphasisPercentage || $[96] !== emphasisVisitsHelp || $[97] !== fixedBasisLabel || $[98] !== label || $[99] !== onEmphasisBasisChange) {
    t36 = emphasis.enabled && /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsxs("div", {
        className: "ui-analysis-display-basis-row",
        children: [/*#__PURE__*/_jsx("span", {
          children: label("emphasisBasis")
        }), fixedBasisLabel ? /*#__PURE__*/_jsx("span", {
          className: "ui-analysis-display-fixed-basis",
          children: fixedBasisLabel
        }) : /*#__PURE__*/_jsx(AnalysisBasisChoices, {
          label: label("emphasisBasis"),
          value: emphasis.basis,
          bases: ["policy", "visitsRelative"],
          visitsRelativeHelp: emphasisVisitsHelp,
          onChange: basis_0 => onEmphasisBasisChange(basis_0)
        })]
      }), /*#__PURE__*/_jsx(SliderSetting, {
        label: label("fullAt"),
        value: Number((emphasis.fullAt * 100).toFixed(3)),
        max: 100,
        suffix: "%",
        onChange: next_2 => changeEmphasis({
          fullAt: next_2 / 100
        })
      }), emphasisPercentage("minSaturation", 0, emphasis.maxSaturation * 100), emphasisPercentage("maxSaturation", emphasis.minSaturation * 100, 100), emphasisPercentage("minScale", 20, 100), emphasisPercentage("minOpacity", 0, 100)]
    });
    $[89] = changeEmphasis;
    $[90] = emphasis.basis;
    $[91] = emphasis.enabled;
    $[92] = emphasis.fullAt;
    $[93] = emphasis.maxSaturation;
    $[94] = emphasis.minSaturation;
    $[95] = emphasisPercentage;
    $[96] = emphasisVisitsHelp;
    $[97] = fixedBasisLabel;
    $[98] = label;
    $[99] = onEmphasisBasisChange;
    $[100] = t36;
  } else {
    t36 = $[100];
  }
  let t37;
  if ($[101] !== t31 || $[102] !== t35 || $[103] !== t36) {
    t37 = /*#__PURE__*/_jsxs("fieldset", {
      className: "ui-settings-fieldset",
      children: [t31, t35, t36]
    });
    $[101] = t31;
    $[102] = t35;
    $[103] = t36;
    $[104] = t37;
  } else {
    t37 = $[104];
  }
  let t38;
  if ($[105] !== colorControls || $[106] !== layoutControls || $[107] !== t24 || $[108] !== t29 || $[109] !== t37) {
    t38 = /*#__PURE__*/_jsxs("div", {
      className: "ui-analysis-display-settings",
      children: [layoutControls, t24, t29, t37, colorControls]
    });
    $[105] = colorControls;
    $[106] = layoutControls;
    $[107] = t24;
    $[108] = t29;
    $[109] = t37;
    $[110] = t38;
  } else {
    t38 = $[110];
  }
  return t38;
}
function _temp(option) {
  return /*#__PURE__*/_jsx("option", {
    value: option.value,
    children: option.label
  }, option.value);
}
export function AnalysisPointDisplayControls(props) {
  const $ = _c(5);
  let t0;
  if ($[0] !== props) {
    t0 = /*#__PURE__*/_jsx(DisplayControls, {
      ...props
    });
    $[0] = props;
    $[1] = t0;
  } else {
    t0 = $[1];
  }
  let t1;
  if ($[2] !== props.label || $[3] !== t0) {
    t1 = /*#__PURE__*/_jsx(LabelsContext.Provider, {
      value: props.label,
      children: t0
    });
    $[2] = props.label;
    $[3] = t0;
    $[4] = t1;
  } else {
    t1 = $[4];
  }
  return t1;
}
export function AnalysisPointColorEditor(t0) {
  const $ = _c(8);
  let label;
  let props;
  if ($[0] !== t0) {
    ({
      label,
      ...props
    } = t0);
    $[0] = t0;
    $[1] = label;
    $[2] = props;
  } else {
    label = $[1];
    props = $[2];
  }
  let t1;
  if ($[3] !== props) {
    t1 = /*#__PURE__*/_jsx(ColorControls, {
      ...props
    });
    $[3] = props;
    $[4] = t1;
  } else {
    t1 = $[4];
  }
  let t2;
  if ($[5] !== label || $[6] !== t1) {
    t2 = /*#__PURE__*/_jsx(LabelsContext.Provider, {
      value: label,
      children: t1
    });
    $[5] = label;
    $[6] = t1;
    $[7] = t2;
  } else {
    t2 = $[7];
  }
  return t2;
}
//# sourceMappingURL=AnalysisPointDisplayControls.js.map
