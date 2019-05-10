import {ResponsiveUtil} from '../../utils/responsive/ResponsiveUtil';
import {ThemeType} from './IThemeService';

export const DEFAULT_THEME :ThemeType = ({
    colors: {
        accentColor: '#ac3426',
        primaryColor: '#7100ff',
        secondaryColor: '#de8a00',
        backgroundColor: '#f1f1f1',
    },
    dimens: {
        screen: {
            paddingHorizontal: ResponsiveUtil.width * .05,
            paddingVertical: ResponsiveUtil.height * .05,
        }
    }
});