import {Col, INavigationService, DIInject, InjectedNavigationServiceProps, Screen, Touchable} from '@shared';
import autobind from 'autobind-decorator';
import {observer} from 'mobx-react';
import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {InjectedApiServiceProps} from '../../services/api/ApiService';
import {WelcomeScreen} from '../welcome/WelcomeScreen';

import AppIntroSlider from 'react-native-app-intro-slider';

export type IntroScreenProps =
    InjectedNavigationServiceProps

@DIInject('$navigation')
@observer
export class IntroScreen extends React.Component<IntroScreenProps> {
    static readonly ROUTE_NAME = 'IntroScreen';

    static start(nav: INavigationService) {
        nav.navigate(this.ROUTE_NAME);
    }

    static resetTo(nav: INavigationService) {
        nav.reset(this.ROUTE_NAME);
    }

    @autobind
    handleOnPress() {
        WelcomeScreen.start(this.props.$navigation);
    }

    render() {
        return (
            <IntroComponent
                onPress={this.handleOnPress}
            />
        )
    }
}


function IntroComponent(props: { onPress: () => void }) {
    return (
        <Screen>
            <Col style={styles.container}>
                <Text>IntroScreen</Text>
            </Col>
        </Screen>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
