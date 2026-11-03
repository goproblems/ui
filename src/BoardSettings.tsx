import {Fragment, useId, type ReactNode} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBorderAll, faListOl, faVolumeHigh, faVolumeXmark} from '@fortawesome/free-solid-svg-icons';
import {clsx} from 'clsx';

export type BoardSettingsValue<TTheme extends string = string> = {
    theme: TTheme;
    coordinates: boolean;
    moveNumbers: boolean;
    moveSound: boolean;
    /** Supply a volume from 0 to 1 to enable the optional volume control. */
    moveSoundVolume?: number;
};

export type BoardSettingsThemeOption<TTheme extends string = string> = {
    value: TTheme;
    label: ReactNode;
};

export type BoardSettingsLabels = {
    moveSound: string;
    moveSoundVolume: string;
    coordinates: string;
    moveNumbers: string;
    theme: string;
};

export type BoardSettingsProps<TTheme extends string = string> = {
    value: BoardSettingsValue<TTheme>;
    onChange: (value: BoardSettingsValue<TTheme>) => void;
    themes: readonly BoardSettingsThemeOption<TTheme>[];
    labels?: Partial<BoardSettingsLabels>;
    preview?: ReactNode;
    children?: ReactNode;
    className?: string;
};

const defaultLabels: BoardSettingsLabels = {
    moveSound: 'Move sound',
    moveSoundVolume: 'Volume',
    coordinates: 'Coordinates',
    moveNumbers: 'Show move numbers',
    theme: 'Theme',
};

/** Controlled board preferences; rendering, persistence and engine integration stay in the application. */
export const BoardSettings = <TTheme extends string,>({value, onChange, themes, labels: suppliedLabels, preview, children, className}: BoardSettingsProps<TTheme>) => {
    const id = useId();
    const labels = {...defaultLabels, ...suppliedLabels};
    const toggles = [
        {key: 'moveSound', icon: value.moveSound ? faVolumeHigh : faVolumeXmark},
        {key: 'coordinates', icon: faBorderAll},
        {key: 'moveNumbers', icon: faListOl},
    ] as const;

    return <div data-ui="board-settings" className={clsx('ui-board-settings', className)}>
        {preview}
        {toggles.map(({key, icon}) => <Fragment key={key}><label className="ui-board-setting-row">
            <span><FontAwesomeIcon icon={icon}/>{labels[key]}</span>
            <input type="checkbox" role="switch" checked={value[key]} onChange={event => onChange({...value, [key]: event.currentTarget.checked})}/>
        </label>
            {key === 'moveSound' && value.moveSound && typeof value.moveSoundVolume === 'number' && <div className="ui-board-sound-volume">
                <label htmlFor={`${id}-volume`}>{labels.moveSoundVolume}</label>
                <input id={`${id}-volume`} type="range" min={0} max={100} step={1} value={Math.round(value.moveSoundVolume * 100)} onChange={event => onChange({...value, moveSoundVolume: Number(event.currentTarget.value) / 100})}/>
                <output htmlFor={`${id}-volume`}>{Math.round(value.moveSoundVolume * 100)}%</output>
            </div>}
        </Fragment>)}
        {children}
        <fieldset className="ui-board-theme-fieldset">
            <legend>{labels.theme}</legend>
            <div className="ui-board-theme-grid">{themes.map(option => <label key={option.value} className={clsx('ui-board-theme-option', value.theme === option.value && 'is-selected')}>
                <input type="radio" name={`${id}-theme`} value={option.value} checked={value.theme === option.value} onChange={() => onChange({...value, theme: option.value})}/>
                <span>{option.label}</span>
            </label>)}</div>
        </fieldset>
    </div>;
};
