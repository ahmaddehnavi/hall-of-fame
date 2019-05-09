import {PXInjectedNavigationServiceProps, PXScreen} from '@shared';
import {inject} from 'mobx-react';
import React from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {IntroScreen} from '../intro/IntroScreen';

@inject('$navigation')
export class SplashScreen extends React.Component<PXInjectedNavigationServiceProps> {
    static readonly ROUTE_NAME = 'SplashScreen';

    componentDidMount() {
        setTimeout(() => {
            IntroScreen.start(this.props.$navigation)
        },1000);
    }

    render() {
        return (
            <PXScreen style={styles.container}>
                <ActivityIndicator/>
            </PXScreen>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    }
});