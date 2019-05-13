import {DIInject, INavigationService, InjectedNavigationServiceProps, Resource} from '@shared';
import autobind from 'autobind-decorator';
import {observer} from 'mobx-react';
import React from 'react';
import {BackHandler, StyleSheet} from 'react-native';
import Assets from '../../assets/Assets';
import {FameItemModel} from '../../models/FameItemModel';
import {InjectedApiServiceProps} from '../../services/api/ApiService';
import {SoundUtil} from '../../utils/SoundUtil';
import {WelcomeScreen} from '../welcome/WelcomeScreen';
import {FameListComponent} from './FameListComponent';

type FameListScreenProps =
    InjectedNavigationServiceProps &
    InjectedApiServiceProps

@DIInject('$navigation', '$api')
@observer
export class FameListScreen extends React.Component<FameListScreenProps> {
    static readonly ROUTE_NAME = 'FameListScreen';

    static start(nav: INavigationService) {
        nav.navigate(this.ROUTE_NAME);
    }

    static resetTo(nav: INavigationService) {
        nav.reset(this.ROUTE_NAME);
    }

    componentDidMount(): void {
        this.props.$api.fameListResource.loadFirstPage()
    }

    render() {
        return (
            <FameListComponent
                listResource={this.props.$api.fameListResource}
                onBackPress={this.handleBackPress}/>
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


