import {AsyncUtil, PXInjectedNavigationServiceProps, Screen} from '@shared';
import {inject} from 'mobx-react';
import React from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {InjectedIntroServiceProps} from '../../services/intro/IntroService';
import {FameListScreen} from '../fame-list/FameListScreen';
import {IntroScreen} from '../intro/IntroScreen';

type Props = InjectedIntroServiceProps & PXInjectedNavigationServiceProps

@inject('$navigation', '$intro')
export class SplashScreen extends React.Component<Props> {
    static readonly ROUTE_NAME = 'SplashScreen';

    async componentDidMount() {
        let enabled = await this.props.$intro.isIntroEnabled();
        await this.props.$intro.setIntroEnabld(false);
        await AsyncUtil.wait(100);
        if (enabled) {
            IntroScreen.resetTo(this.props.$navigation)
        } else {
            FameListScreen.resetTo(this.props.$navigation)
        }
    }


    render() {
        return (
            <Screen style={styles.container}>
                <ActivityIndicator/>
            </Screen>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    }
});