import {AsyncUtil, InjectedNavigationServiceProps, NavigationService, Screen} from '@shared';
import {inject, observer} from 'mobx-react';
import React from 'react';
import {ActivityIndicator, StyleSheet, Text} from 'react-native';
import {InjectedIntroServiceProps} from '../../services/intro/IntroService';
import {FameListScreen} from '../fame-list/FameListScreen';
import {IntroScreen} from '../intro/IntroScreen';

type Props = InjectedIntroServiceProps & InjectedNavigationServiceProps

@inject(NavigationService.NAME, '$intro')
@observer
export class SplashScreen extends React.Component<Props> {
    static readonly ROUTE_NAME = 'SplashScreen';

    async componentDidMount() {
        let enabled = await this.props.$intro.isIntroEnabled();
        await this.props.$intro.setIntroEnabled(false);
        await AsyncUtil.wait(100);
        if (enabled) {
            IntroScreen.resetTo(this.props.$navigation)
        } else {
            FameListScreen.resetTo(this.props.$navigation)
        }
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