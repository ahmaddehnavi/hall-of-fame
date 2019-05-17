import {InjectedNavigationServiceProps, NavigationService, Screen} from '@shared';
import {inject, observer} from 'mobx-react';
import React from 'react';
import {ActivityIndicator, StyleSheet, Text} from 'react-native';
import {ApiService, InjectedApiServiceProps} from '../../services/api/ApiService';
import {InjectedIntroServiceProps, IntroService} from '../../services/intro/IntroService';
import {InjectedSplashScreenStore, SplashScreenStore} from './SplashScreen.store';

type Props = InjectedIntroServiceProps &
    InjectedNavigationServiceProps &
    InjectedApiServiceProps &
    InjectedSplashScreenStore

@inject(NavigationService.NAME, IntroService.NAME, ApiService.NAME, SplashScreenStore.NAME)
@observer
export class SplashScreen extends React.Component<Props> {
    static readonly ROUTE_NAME = 'SplashScreen';

    componentDidMount() {
        /**
         * load required config
         */
        this.props.$splashStore.loadConfigAndNavigate();
    }

    render() {
        return (
            <Screen style={styles.container}>
                <ActivityIndicator/>
                <Text>Loading...</Text>
            </Screen>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    }
});