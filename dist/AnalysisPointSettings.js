import { useId } from 'react';
import { clsx } from 'clsx';
import { ANALYSIS_POINT_COLORS, ANALYSIS_POINT_METRICS, DEFAULT_ANALYSIS_POINT_COLOR_THRESHOLDS, DEFAULT_ANALYSIS_POINT_OPACITY, defaultAnalysisPointOpacity } from './analysisPointConfig.js';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
export const AnalysisPointColorScale = ({
  value,
  onChange,
  defaultValue,
  colors = ANALYSIS_POINT_COLORS,
  legendLabels,
  title = 'Point-loss colors',
  labels = ['Green → Yellow', 'Yellow → Orange', 'Orange → Dark orange', 'Dark orange → Red', 'Red → Purple'],
  resetLabel = 'Reset colors',
  className
}) => {
  const id = useId();
  const defaults = defaultValue ?? DEFAULT_ANALYSIS_POINT_COLOR_THRESHOLDS;
  return /*#__PURE__*/_jsxs("fieldset", {
    className: clsx('ui-settings-fieldset ui-board-theme-fieldset ui-analysis-point-colors', className),
    children: [/*#__PURE__*/_jsx("legend", {
      children: title
    }), /*#__PURE__*/_jsx("div", {
      className: "ui-analysis-point-color-controls",
      children: value.map((threshold, index) => {
        const min = index === 0 ? 0.1 : Number((value[index - 1] + 0.1).toFixed(1));
        const max = index === value.length - 1 ? 30 : Number((value[index + 1] - 0.1).toFixed(1));
        return /*#__PURE__*/_jsxs("label", {
          htmlFor: `${id}-${index}`,
          children: [/*#__PURE__*/_jsxs("span", {
            className: "ui-analysis-point-color-heading",
            children: [/*#__PURE__*/_jsxs("span", {
              className: "ui-analysis-point-color-pair",
              children: [/*#__PURE__*/_jsx("i", {
                style: {
                  background: colors[index]
                }
              }), /*#__PURE__*/_jsx("i", {
                style: {
                  background: colors[index + 1]
                }
              })]
            }), /*#__PURE__*/_jsx("span", {
              children: labels[index]
            }), /*#__PURE__*/_jsx("output", {
              htmlFor: `${id}-${index}`,
              children: threshold.toFixed(1)
            })]
          }), /*#__PURE__*/_jsx("input", {
            id: `${id}-${index}`,
            type: "range",
            min: min,
            max: max,
            step: 0.1,
            value: threshold,
            onChange: event => {
              const next = value.map((threshold_0, itemIndex) => itemIndex === index ? Number(Number(event.currentTarget.value).toFixed(1)) : threshold_0);
              onChange(next);
            }
          })]
        }, index);
      })
    }), /*#__PURE__*/_jsx("div", {
      className: "ui-analysis-point-color-legend",
      children: colors.map((color, index_0) => /*#__PURE__*/_jsxs("span", {
        children: [/*#__PURE__*/_jsx("i", {
          style: {
            background: color
          }
        }), legendLabels?.[index_0] ?? /*#__PURE__*/_jsxs(_Fragment, {
          children: [index_0 === 0 ? '0' : value[index_0 - 1].toFixed(1), index_0 === value.length ? '+' : `–<${value[index_0].toFixed(1)}`]
        })]
      }, color))
    }), /*#__PURE__*/_jsx("button", {
      type: "button",
      className: "ui-analysis-point-reset",
      disabled: value.length === defaults.length && value.every((threshold_1, index_1) => threshold_1 === defaults[index_1]),
      onClick: () => onChange([...defaults]),
      children: resetLabel
    })]
  });
};
const defaultLabels = {
  style: 'Analysis point style',
  opacity: 'Point opacity',
  resetOpacity: 'Reset opacity',
  shape: 'Point shape',
  none: 'None',
  badge: 'Top-right label',
  badgeStyle: 'Top-right label style',
  badgeStyles: {
    plain: 'Plain text',
    filled: 'With background'
  },
  lines: ['First line', 'Second line', 'Third line'],
  shapes: {
    circle: 'Circle',
    square: 'Square'
  },
  presets: {
    moveOrderOnly: 'Move order only',
    variationMarkers: 'Variation markers',
    policyOrderOnly: 'Policy order only',
    policyOnly: 'Policy only',
    standard: 'Analysis',
    analysisVisits: 'Analysis (visits)',
    analysisFutureNodes: 'Analysis (Future nodes)',
    analysisVisitsWithPolicy: 'Analysis (visits with policy)',
    detailed: 'Analysis (with policy)',
    custom: 'Custom'
  },
  metrics: {
    moveOrder: 'Move order',
    policyOrder: 'Policy order',
    score: 'Score change',
    policy: 'Policy',
    visits: 'Visits',
    descendantCount: 'Future nodes'
  },
  lowPolicy: 'Low-policy points',
  lowPolicyModes: {
    show: 'Show',
    compact: 'Compact',
    hide: 'Hide'
  },
  existingNodes: 'Always show existing nodes',
  colors: 'Point-loss colors',
  colorBoundaries: ['Green → Yellow', 'Yellow → Orange', 'Orange → Dark orange', 'Dark orange → Red', 'Red → Purple'],
  resetColors: 'Reset colors'
};
export const AnalysisPointOpacityControl = ({
  value,
  defaultValue = DEFAULT_ANALYSIS_POINT_OPACITY,
  onChange,
  label = 'Point opacity',
  resetLabel = 'Reset opacity'
}) => {
  const id = useId();
  return /*#__PURE__*/_jsxs("div", {
    className: "ui-analysis-point-opacity-group",
    children: [/*#__PURE__*/_jsx("label", {
      htmlFor: id,
      children: label
    }), /*#__PURE__*/_jsxs("div", {
      className: "ui-analysis-point-opacity-row",
      children: [/*#__PURE__*/_jsx("input", {
        id: id,
        type: "range",
        min: 20,
        max: 100,
        step: 1,
        value: Math.round(value * 100),
        onChange: event => onChange(Number(event.currentTarget.value) / 100)
      }), /*#__PURE__*/_jsxs("output", {
        htmlFor: id,
        children: [Math.round(value * 100), "%"]
      }), /*#__PURE__*/_jsx("button", {
        type: "button",
        disabled: value === defaultValue,
        onClick: () => onChange(defaultValue),
        children: resetLabel
      })]
    })]
  });
};

/** Controlled settings only: data, persistence, translations and preview rendering belong to the application. */
export const AnalysisPointSettings = ({
  value,
  onChange,
  preview,
  labels: suppliedLabels,
  metrics = ANALYSIS_POINT_METRICS,
  presets = ['moveOrderOnly', 'variationMarkers', 'policyOrderOnly', 'policyOnly', 'standard', 'detailed', 'custom'],
  showLowPolicyControls = true,
  showExistingNodesControl = true,
  existingNodesAvailable = false,
  lowPolicyHelp,
  existingNodesHelp,
  showColors = true,
  showOpacity = true,
  showBadgeStyleControl = false,
  className
}) => {
  const id = useId();
  const labels = {
    ...defaultLabels,
    ...suppliedLabels,
    presets: {
      ...defaultLabels.presets,
      ...suppliedLabels?.presets
    },
    metrics: {
      ...defaultLabels.metrics,
      ...suppliedLabels?.metrics
    }
  };
  const custom = value.style.custom;
  const slots = [...custom.lines, custom.badge];
  const changeCustom = next => onChange({
    ...value,
    style: {
      ...value.style,
      custom: next
    }
  });
  const metricSelect = (slot, label, change) => /*#__PURE__*/_jsxs("label", {
    className: "ui-analysis-point-slot",
    children: [/*#__PURE__*/_jsx("span", {
      children: label
    }), /*#__PURE__*/_jsxs("select", {
      value: slot,
      onChange: event => change(event.currentTarget.value),
      children: [/*#__PURE__*/_jsx("option", {
        value: "none",
        disabled: slot !== 'none' && slots.filter(metric => metric !== 'none').length === 1,
        children: labels.none
      }), metrics.map(metric_0 => /*#__PURE__*/_jsx("option", {
        value: metric_0,
        disabled: metric_0 !== slot && slots.includes(metric_0),
        children: labels.metrics[metric_0]
      }, metric_0))]
    })]
  });
  return /*#__PURE__*/_jsxs("div", {
    "data-ui": "analysis-point-settings",
    className: clsx('ui-analysis-point-settings', className),
    children: [preview, /*#__PURE__*/_jsxs("fieldset", {
      className: "ui-settings-fieldset ui-board-theme-fieldset ui-analysis-point-style",
      children: [/*#__PURE__*/_jsx("legend", {
        children: labels.style
      }), /*#__PURE__*/_jsx("div", {
        className: "ui-analysis-point-presets",
        children: presets.map(preset => /*#__PURE__*/_jsxs("label", {
          className: value.style.preset === preset ? 'is-selected' : undefined,
          children: [/*#__PURE__*/_jsx("input", {
            type: "radio",
            name: `${id}-preset`,
            checked: value.style.preset === preset,
            onChange: () => onChange({
              ...value,
              style: {
                ...value.style,
                preset
              }
            })
          }), labels.presets[preset]]
        }, preset))
      }), showOpacity && /*#__PURE__*/_jsx(AnalysisPointOpacityControl, {
        value: value.opacity,
        defaultValue: defaultAnalysisPointOpacity(value.style),
        onChange: opacity => onChange({
          ...value,
          opacity
        }),
        label: labels.opacity,
        resetLabel: labels.resetOpacity
      }), value.style.preset === 'custom' && /*#__PURE__*/_jsxs("div", {
        className: "ui-analysis-point-custom",
        children: [/*#__PURE__*/_jsxs("div", {
          className: "ui-analysis-point-shape",
          children: [/*#__PURE__*/_jsx("span", {
            children: labels.shape
          }), /*#__PURE__*/_jsx("div", {
            className: "ui-analysis-point-shape-options",
            role: "radiogroup",
            "aria-label": labels.shape,
            children: ['circle', 'square'].map(shape => /*#__PURE__*/_jsxs("label", {
              className: custom.shape === shape ? 'is-selected' : undefined,
              children: [/*#__PURE__*/_jsx("input", {
                type: "radio",
                name: `${id}-shape`,
                checked: custom.shape === shape,
                onChange: () => changeCustom({
                  ...custom,
                  shape
                })
              }), labels.shapes[shape]]
            }, shape))
          })]
        }), custom.lines.map((slot_0, index) => /*#__PURE__*/_jsx("div", {
          children: metricSelect(slot_0, labels.lines[index], metric_1 => {
            const lines = [...custom.lines];
            lines[index] = metric_1;
            changeCustom({
              ...custom,
              lines
            });
          })
        }, index)), metricSelect(custom.badge, labels.badge, badge => changeCustom({
          ...custom,
          badge
        })), showBadgeStyleControl && /*#__PURE__*/_jsxs("div", {
          className: "ui-analysis-point-shape",
          children: [/*#__PURE__*/_jsx("span", {
            id: `${id}-badge-style-label`,
            children: labels.badgeStyle
          }), /*#__PURE__*/_jsx("div", {
            className: "ui-analysis-point-shape-options ui-analysis-point-badge-options",
            role: "radiogroup",
            "aria-labelledby": `${id}-badge-style-label`,
            children: ['plain', 'filled'].map(badgeStyle => /*#__PURE__*/_jsxs("label", {
              className: (custom.badgeStyle ?? 'plain') === badgeStyle ? 'is-selected' : undefined,
              children: [/*#__PURE__*/_jsx("input", {
                type: "radio",
                name: `${id}-badge-style`,
                checked: (custom.badgeStyle ?? 'plain') === badgeStyle,
                disabled: custom.badge === 'none',
                onChange: () => changeCustom({
                  ...custom,
                  badgeStyle
                })
              }), labels.badgeStyles[badgeStyle]]
            }, badgeStyle))
          })]
        })]
      })]
    }), showLowPolicyControls && /*#__PURE__*/_jsxs("fieldset", {
      className: "ui-settings-fieldset ui-board-theme-fieldset ui-analysis-point-low-policy",
      children: [/*#__PURE__*/_jsx("legend", {
        children: labels.lowPolicy
      }), /*#__PURE__*/_jsx("div", {
        className: "ui-analysis-point-low-policy-modes",
        children: ['show', 'compact', 'hide'].map(mode => /*#__PURE__*/_jsxs("span", {
          className: value.lowPolicyDisplay === mode ? 'is-selected' : undefined,
          children: [/*#__PURE__*/_jsxs("label", {
            children: [/*#__PURE__*/_jsx("input", {
              type: "radio",
              name: `${id}-low-policy`,
              checked: value.lowPolicyDisplay === mode,
              onChange: () => onChange({
                ...value,
                lowPolicyDisplay: mode
              })
            }), labels.lowPolicyModes[mode]]
          }), lowPolicyHelp?.[mode]]
        }, mode))
      }), showExistingNodesControl && /*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsxs("label", {
          children: [/*#__PURE__*/_jsx("input", {
            type: "checkbox",
            checked: value.alwaysShowExistingNodes,
            disabled: !existingNodesAvailable,
            onChange: event_0 => onChange({
              ...value,
              alwaysShowExistingNodes: event_0.currentTarget.checked
            })
          }), labels.existingNodes]
        }), existingNodesHelp]
      })]
    }), showColors && /*#__PURE__*/_jsx(AnalysisPointColorScale, {
      value: value.colorThresholds,
      onChange: colorThresholds => onChange({
        ...value,
        colorThresholds
      }),
      title: labels.colors,
      labels: labels.colorBoundaries,
      resetLabel: labels.resetColors
    })]
  });
};
//# sourceMappingURL=AnalysisPointSettings.js.map
