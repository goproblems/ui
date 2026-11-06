import { c as _c } from "react/compiler-runtime";
import { Fragment, useId } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBorderAll, faListOl, faVolumeHigh, faVolumeXmark } from '@fortawesome/free-solid-svg-icons';
import { clsx } from 'clsx';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const defaultLabels = {
  moveSound: 'Move sound',
  moveSoundVolume: 'Volume',
  coordinates: 'Coordinates',
  moveNumbers: 'Show move numbers',
  theme: 'Theme'
};

/** Controlled board preferences; rendering, persistence and engine integration stay in the application. */
export const BoardSettings = t0 => {
  const $ = _c(38);
  const {
    value,
    onChange,
    themes,
    labels: suppliedLabels,
    preview,
    children,
    className
  } = t0;
  const id = useId();
  let t1;
  if ($[0] !== suppliedLabels) {
    t1 = {
      ...defaultLabels,
      ...suppliedLabels
    };
    $[0] = suppliedLabels;
    $[1] = t1;
  } else {
    t1 = $[1];
  }
  const labels = t1;
  const t2 = value.moveSound ? faVolumeHigh : faVolumeXmark;
  let t3;
  if ($[2] !== t2) {
    t3 = {
      key: "moveSound",
      icon: t2
    };
    $[2] = t2;
    $[3] = t3;
  } else {
    t3 = $[3];
  }
  let t4;
  let t5;
  if ($[4] === Symbol.for("react.memo_cache_sentinel")) {
    t4 = {
      key: "coordinates",
      icon: faBorderAll
    };
    t5 = {
      key: "moveNumbers",
      icon: faListOl
    };
    $[4] = t4;
    $[5] = t5;
  } else {
    t4 = $[4];
    t5 = $[5];
  }
  let t6;
  if ($[6] !== t3) {
    t6 = [t3, t4, t5];
    $[6] = t3;
    $[7] = t6;
  } else {
    t6 = $[7];
  }
  const toggles = t6;
  let t7;
  if ($[8] !== className) {
    t7 = clsx("ui-board-settings", className);
    $[8] = className;
    $[9] = t7;
  } else {
    t7 = $[9];
  }
  let t8;
  if ($[10] !== id || $[11] !== labels || $[12] !== onChange || $[13] !== toggles || $[14] !== value) {
    t8 = toggles.map(t9 => {
      const {
        key,
        icon
      } = t9;
      return /*#__PURE__*/_jsxs(Fragment, {
        children: [/*#__PURE__*/_jsxs("label", {
          className: "ui-board-setting-row",
          children: [/*#__PURE__*/_jsxs("span", {
            children: [/*#__PURE__*/_jsx(FontAwesomeIcon, {
              icon: icon
            }), labels[key]]
          }), /*#__PURE__*/_jsx("input", {
            type: "checkbox",
            role: "switch",
            checked: value[key],
            onChange: event => onChange({
              ...value,
              [key]: event.currentTarget.checked
            })
          })]
        }), key === "moveSound" && value.moveSound && typeof value.moveSoundVolume === "number" && /*#__PURE__*/_jsxs("div", {
          className: "ui-board-sound-volume",
          children: [/*#__PURE__*/_jsx("label", {
            htmlFor: `${id}-volume`,
            children: labels.moveSoundVolume
          }), /*#__PURE__*/_jsx("input", {
            id: `${id}-volume`,
            type: "range",
            min: 0,
            max: 100,
            step: 1,
            value: Math.round(value.moveSoundVolume * 100),
            onChange: event_0 => onChange({
              ...value,
              moveSoundVolume: Number(event_0.currentTarget.value) / 100
            })
          }), /*#__PURE__*/_jsxs("output", {
            htmlFor: `${id}-volume`,
            children: [Math.round(value.moveSoundVolume * 100), "%"]
          })]
        })]
      }, key);
    });
    $[10] = id;
    $[11] = labels;
    $[12] = onChange;
    $[13] = toggles;
    $[14] = value;
    $[15] = t8;
  } else {
    t8 = $[15];
  }
  let t9;
  if ($[16] !== labels.theme) {
    t9 = /*#__PURE__*/_jsx("legend", {
      children: labels.theme
    });
    $[16] = labels.theme;
    $[17] = t9;
  } else {
    t9 = $[17];
  }
  let t10;
  if ($[18] !== id || $[19] !== onChange || $[20] !== themes || $[21] !== value) {
    let t11;
    if ($[23] !== id || $[24] !== onChange || $[25] !== value) {
      t11 = option => /*#__PURE__*/_jsxs("label", {
        className: clsx("ui-board-theme-option", value.theme === option.value && "is-selected"),
        children: [/*#__PURE__*/_jsx("input", {
          type: "radio",
          name: `${id}-theme`,
          value: option.value,
          checked: value.theme === option.value,
          onChange: () => onChange({
            ...value,
            theme: option.value
          })
        }), /*#__PURE__*/_jsx("span", {
          children: option.label
        })]
      }, option.value);
      $[23] = id;
      $[24] = onChange;
      $[25] = value;
      $[26] = t11;
    } else {
      t11 = $[26];
    }
    t10 = themes.map(t11);
    $[18] = id;
    $[19] = onChange;
    $[20] = themes;
    $[21] = value;
    $[22] = t10;
  } else {
    t10 = $[22];
  }
  let t11;
  if ($[27] !== t10) {
    t11 = /*#__PURE__*/_jsx("div", {
      className: "ui-board-theme-grid",
      children: t10
    });
    $[27] = t10;
    $[28] = t11;
  } else {
    t11 = $[28];
  }
  let t12;
  if ($[29] !== t11 || $[30] !== t9) {
    t12 = /*#__PURE__*/_jsxs("fieldset", {
      className: "ui-settings-fieldset ui-board-theme-fieldset",
      children: [t9, t11]
    });
    $[29] = t11;
    $[30] = t9;
    $[31] = t12;
  } else {
    t12 = $[31];
  }
  let t13;
  if ($[32] !== children || $[33] !== preview || $[34] !== t12 || $[35] !== t7 || $[36] !== t8) {
    t13 = /*#__PURE__*/_jsxs("div", {
      "data-ui": "board-settings",
      className: t7,
      children: [preview, t8, children, t12]
    });
    $[32] = children;
    $[33] = preview;
    $[34] = t12;
    $[35] = t7;
    $[36] = t8;
    $[37] = t13;
  } else {
    t13 = $[37];
  }
  return t13;
};
//# sourceMappingURL=BoardSettings.js.map
