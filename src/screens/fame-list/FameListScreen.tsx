import {DIInject, INavigationService, InjectedNavigationServiceProps, MultiBackHandler, NavigationService, Screen} from '@shared';
import autobind from 'autobind-decorator';
import {observer} from 'mobx-react';
import React from 'react';
import {BackHandler} from 'react-native';
import {Assets} from '../../assets/Assets';
import {ApiService, InjectedApiServiceProps} from '../../services/api/ApiService';
import {SoundUtil} from '../../utils/SoundUtil';
import {WelcomeScreen} from '../welcome/WelcomeScreen';
import {FameListComponent} from './FameListComponent';

type FameListScreenProps =
    InjectedNavigationServiceProps &
    InjectedApiServiceProps

@DIInject(NavigationService.NAME, ApiService.NAME)
@observer
export class FameListScreen extends React.Component<FameListScreenProps> {
    static readonly ROUTE_NAME = 'FameListScreen';

    static start(nav: INavigationService) {
        nav.navigate(this.ROUTE_NAME);
    }

    static resetTo(nav: INavigationService) {
        nav.reset(this.ROUTE_NAME);
    }


    render() {
        return (
            <MultiBackHandler
                timeout={500}
                maxCount={2}
                onPress={this.handleBackPress}>
                <FameListComponent
                    resolveProfileImageUrl={this.props.$api.resolveProfileImageUrl}
                    listResource={this.props.$api.Person.popularList}/>
            </MultiBackHandler>
        )
    }

    @autobind
    async handleBackPress(pressCount: number) {
        if (pressCount === 1) {
            WelcomeScreen.start(this.props.$navigation);
            return;
        }

        if (pressCount === 2) {
            await SoundUtil.play(Assets.sounds.test);
            BackHandler.exitApp();
        }
    }
}


