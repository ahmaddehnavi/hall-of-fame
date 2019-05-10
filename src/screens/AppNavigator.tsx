import {PXNavigationParamsToProps} from '@shared';
import {createNavigationContainer, createStackNavigator, NavigationRouteConfig, NavigationRouteConfigMap} from 'react-navigation';

import {FameListScreen} from './fame-list/FameListScreen';
import {IntroScreen} from './intro/IntroScreen';
import {SplashScreen} from './splash/SplashScreen';
import {WelcomeScreen} from './welcome/WelcomeScreen';
import { fromRight } from 'react-navigation-transitions';


const ROUTES: NavigationRouteConfigMap = {
    [SplashScreen.ROUTE_NAME]: {
        screen: PXNavigationParamsToProps(SplashScreen)
    } as NavigationRouteConfig
    ,
    [WelcomeScreen.ROUTE_NAME]: {
        screen: PXNavigationParamsToProps(WelcomeScreen)
    },
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
        mode: 'card',
        transitionConfig: () => fromRight(300),
        navigationOptions: {
            swipeEnabled: true
        }
    }
);

export default createNavigationContainer(AppNavigator)
