import { type ReactNode } from 'react';
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
/** Controlled board preferences; rendering, persistence and engine integration stay in the application. */
export declare const BoardSettings: <TTheme extends string>({ value, onChange, themes, labels: suppliedLabels, preview, children, className }: BoardSettingsProps<TTheme>) => import("react").JSX.Element;
//# sourceMappingURL=BoardSettings.d.ts.map