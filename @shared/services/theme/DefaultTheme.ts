import {ViewStyle} from 'react-native';
import {ResponsiveUtil} from '../../utils/responsive/ResponsiveUtil';


export type ThemeType = typeof DEFAULT_THEME;

export const DEFAULT_THEME = ({
    colors: {
        accentColor: '#ac3426',
        accentTextColor: '#fff',
        primaryColor: '#7100ff',
        primaryTextColor: '#fff',
        secondaryColor: '#de8a00',
        secondaryTextColor: '#000',
        backgroundColor: '#f1f1f1',
        backgroundTextColor: '#727272',
    },
    dimens: {
        screen: {
            paddingHorizontal: ResponsiveUtil.width * .05,
            paddingVertical: ResponsiveUtil.height * .05,
        }
    },

    styles: {
        boxShadow: (x = 0,
                    y = 3,
                    radius = 2,
                    opacity = .2,
                    color = '#727272',
                    elevation = Math.min(Math.max(x, y), 1)) => {
            return {
                shadowColor: color,
                shadowOffset: {width: x, height: y},
                shadowOpacity: opacity,
                shadowRadius: radius,
                elevation,
            }
        },

        boxShadowBottom: {
            shadowColor: '#9e9e9e',
            shadowOffset: {width: 0, height: 3},
            shadowOpacity: 0.2,
            shadowRadius: 2,
            elevation: 3,
        } as ViewStyle,

        boxShadowBottomLight: {
            shadowColor: '#9e9e9e',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.05,
            shadowRadius: 2,
            elevation: 2,
        } as ViewStyle,
    }
});