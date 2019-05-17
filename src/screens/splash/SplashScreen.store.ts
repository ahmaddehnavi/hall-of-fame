import {AsyncUtil} from '@shared';
import {Alert, BackHandler} from 'react-native';
import {FameListScreen} from '../fame-list/FameListScreen';
import {IntroScreen} from '../intro/IntroScreen';

type Props = {}

export class SplashScreenStore {
    props;
    constructor() {

    }

    loadConfig() {
        this.props.$api.Config.configuration.load({})
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