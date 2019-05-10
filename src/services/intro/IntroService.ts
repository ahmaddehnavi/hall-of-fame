import {BaseService} from '@shared';
import {AsyncStorage} from 'react-native';

export type InjectedIntroServiceProps = {
    $intro:IntroService
}

export class IntroService extends BaseService {
    public static readonly NAME = '$intro';
    public static readonly IS_INTRO_ENABLED_KEY = '$intro/is-enabled';

    async isIntroEnabled() {
        try {
            return await AsyncStorage.getItem(IntroService.IS_INTRO_ENABLED_KEY) === 'true';
        } catch (e) {
        }
        // default value
        return true;
    }

    setIntroEnabled(enabled: boolean) {
        return AsyncStorage.setItem(IntroService.IS_INTRO_ENABLED_KEY, enabled ? 'true' : 'false');
    }

}

