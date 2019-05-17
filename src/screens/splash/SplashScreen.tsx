import {AsyncUtil, InjectedNavigationServiceProps, NavigationService, Screen} from '@shared';
import {inject, observer} from 'mobx-react';
import React from 'react';
import {ActivityIndicator, Alert, BackHandler, StyleSheet, Text} from 'react-native';
import {ApiService, InjectedApiServiceProps} from '../../services/api/ApiService';
import {InjectedIntroServiceProps, IntroService} from '../../services/intro/IntroService';
import {FameListScreen} from '../fame-list/FameListScreen';
import {IntroScreen} from '../intro/IntroScreen';
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

    render() {
        return (
            <SplashComponent/>
        )
    }
}

function SplashComponent() {
    return (
        <Screen style={styles.container}>
            <ActivityIndicator/>
            <Text>Loading...</Text>
        </Screen>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    }
});