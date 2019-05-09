import {PXINavigationService, PXInject, PXInjectedNavigationServiceProps, PXScreen} from '@shared';
import React from 'react';
import {StyleSheet, Text} from 'react-native';

export type IntroScreenProps =
    PXInjectedNavigationServiceProps

@PXInject('$navigation')
export class IntroScreen extends React.Component<IntroScreenProps> {
    static readonly ROUTE_NAME = 'IntroScreen';
    static readonly IS_INTRO_ENABLED_KEY = 'intro-screen/enabled';

    static start(nav: PXINavigationService) {
        nav.navigate(this.ROUTE_NAME);
    }

    render() {
        return (
            <PXScreen style={styles.container}>
                <Text>IntroScreen</Text>
            </PXScreen>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center'
    }
});