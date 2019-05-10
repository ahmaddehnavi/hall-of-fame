import {PXNavigationParamsToProps} from '@shared';
import {Dimensions} from 'react-native';
import {
    createNavigationContainer,
    createStackNavigator,
    NavigationRouteConfig,
    NavigationRouteConfigMap
} from 'react-navigation';
import {FameListScreen} from './fame-list/FameListScreen';
import {IntroScreen} from './intro/IntroScreen';
import {SplashScreen} from './splash/SplashScreen';
import {WelcomeScreen} from './welcome/WelcomeScreen';


const ROUTES: NavigationRouteConfigMap = {
    [WelcomeScreen.ROUTE_NAME]: {
        screen: PXNavigationParamsToProps(WelcomeScreen)
    },
    [SplashScreen.ROUTE_NAME]: {
        screen: PXNavigationParamsToProps(SplashScreen)
    } as NavigationRouteConfig
    ,
    [IntroScreen.ROUTE_NAME]: {
        screen: PXNavigationParamsToProps(IntroScreen)
    } as NavigationRouteConfig
    ,
    [FameListScreen.ROUTE_NAME]: {
        screen: PXNavigationParamsToProps(FameListScreen)
    },

};
const AppNavigator = createStackNavigator(
    ROUTES,
    {
        headerMode: 'none',
        mode: 'modal',
        navigationOptions: {
            swipeEnabled: true
        }
    }
);

export default createNavigationContainer(AppNavigator)
