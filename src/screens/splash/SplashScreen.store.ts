import {AsyncUtil, BaseStore, InjectedNavigationServiceProps} from '@shared';
import autobind from 'autobind-decorator';
import {Alert, BackHandler} from 'react-native';
import {InjectedApiServiceProps} from '../../services/api/ApiService';
import {InjectedIntroServiceProps} from '../../services/intro/IntroService';
import {FameListScreen} from '../fame-list/FameListScreen';
import {IntroScreen} from '../intro/IntroScreen';

type Props = InjectedApiServiceProps &
    InjectedIntroServiceProps &
    InjectedNavigationServiceProps

export type InjectedSplashScreenStore = {
    $splashStore: SplashScreenStore
}

@autobind
export class SplashScreenStore extends BaseStore<Props> {
    public static readonly NAME = '$splashStore';

    loadConfigAndNavigate() {
        return this.props.$api.Config.configuration.load()
            .then(async (self) => {
                if (self.isError) {
                    Alert.alert(
                        'Loading failed',
                        self.error.message || String(self.error),
                        [
                            {
                                text: 'exit',
                                onPress: () => BackHandler.exitApp()
                            },
                            {
                                text: 'retry',
                                onPress: () => self.reload()
                            }
                        ])
                } else {
                    // on first run we need to show intro screen
                    let enabled = await this.props.$intro.isIntroEnabled();
                    // on second run we dont want to show intro screen so disable it
                    await this.props.$intro.setIntroEnabled(false);
                    await AsyncUtil.wait(100);
                    if (enabled) {
                        IntroScreen.resetTo(this.props.$navigation)
                    } else {
                        FameListScreen.resetTo(this.props.$navigation)
                    }
                }
            });
    }
}