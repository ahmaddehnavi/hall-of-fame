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

    loadConfig() {
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
                    let enabled = await this.props.$intro.isIntroEnabled();
                    await this.props.$intro.setIntroEnabled(true);
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