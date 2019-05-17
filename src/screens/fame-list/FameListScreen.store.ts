import {BaseStore, InjectedNavigationServiceProps} from '@shared';
import autobind from 'autobind-decorator';
import {toJS} from 'mobx';
import {BackHandler} from 'react-native';
import {Assets} from '../../assets/Assets';
import {InjectedApiServiceProps} from '../../services/api/ApiService';
import {PopularPersonItemType} from '../../services/api/models/PopularPersonResponseType';
import {SoundUtil} from '../../utils/SoundUtil';
import {WelcomeScreen} from '../welcome/WelcomeScreen';

export type InjectedFameListScreenStoreProps = {
    $fameListStore: FameListScreenStore
}

type Props = InjectedNavigationServiceProps & InjectedApiServiceProps

export class FameListScreenStore extends BaseStore<Props> {

    public static readonly NAME = '$fameListStore';

    get popularListResource() {
        return this.props.$api.Person.popularList
    };

    get items() {
        let items = toJS(this.popularListResource.items);
        if (items.length) {
            let sheldonCooper: PopularPersonItemType = {
                profile_path: 'https://i.pinimg.com/originals/2e/29/c4/2e29c41787d04c4b3de4aa3832566357.jpg',
                adult: false,
                id: 'special',
                known_for: [],
                name: '',
                popularity: 0
            };
            // insert  sheldon cooper into 3 position
            items.splice(Math.min(2, items.length), 0, sheldonCooper);
        }
        return items;
    }

    @autobind
    handleBackPress(pressCount: number) {
        if (pressCount === 1) {
            WelcomeScreen.start(this.props.$navigation);
            return;
        }

        if (pressCount === 2) {
            SoundUtil.play(Assets.sounds.test)
                .then(BackHandler.exitApp)
        }
    }
}