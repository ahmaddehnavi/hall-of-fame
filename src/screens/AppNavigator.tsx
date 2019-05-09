import {createNavigationContainer, createStackNavigator, NavigationRouteConfig, NavigationRouteConfigMap} from 'react-navigation';
import FlameListScreen from './fame-list/FlameListScreen';
import IntroScreen from './intro/IntroScreen';
import WelcomeScreen from './welcome/WelcomeScreen';


const ROUTES: NavigationRouteConfigMap = {
    [IntroScreen.RouteName]: {
        screen: IntroScreen,
        navigationOptions: {
            title: 'IntroScreen'
        }
    } as NavigationRouteConfig
    ,
    [WelcomeScreen.RouteName]: {
        screen: WelcomeScreen
    },
    [FlameListScreen.RouteName]: {
        screen: FlameListScreen
    },

};
const AppNavigator = createStackNavigator(
    ROUTES,
    {
        headerMode: 'float',
        initialRouteName: IntroScreen.RouteName
    }
);

export default createNavigationContainer(AppNavigator)
