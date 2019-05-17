import {InjectedNavigationServiceProps} from '@shared';
import {FameListScreenStore} from '../screens/fame-list/FameListScreen.store';
import {SplashScreenStore} from '../screens/splash/SplashScreen.store';
import {WelcomeStore} from '../screens/welcome/WelcomeStore';
import {InjectedApiServiceProps} from '../services/api/ApiService';
import {InjectedIntroServiceProps} from '../services/intro/IntroService';

type Props = InjectedApiServiceProps &
    InjectedIntroServiceProps &
    InjectedNavigationServiceProps

export function createAllStore(props: Props) {
    return {
        [WelcomeStore.NAME]: new WelcomeStore(),
        [SplashScreenStore.NAME]: new SplashScreenStore(props),
        [FameListScreenStore.NAME]: new FameListScreenStore(props),
    }
}