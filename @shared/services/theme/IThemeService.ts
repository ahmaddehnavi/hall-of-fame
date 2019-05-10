export type ThemeColorsType = {
    accentColor: string,
    primaryColor: string,
    secondaryColor: string,
    backgroundColor: string,
}

export type ThemeDimensType = {
    screen: {
        paddingHorizontal: number,
        paddingVertical: number,
    }
}

export type ThemeType = {
    colors: ThemeColorsType,
    dimens: ThemeDimensType
}

export interface IThemeService {

    get(): ThemeType

    merge(theme: ThemeType)

    readonly colors: ThemeColorsType
    readonly dimens: ThemeDimensType
}