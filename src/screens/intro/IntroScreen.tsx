import {Col, INavigationService, PXInject, PXInjectedNavigationServiceProps, Screen, Touchable} from '@shared';
import autobind from 'autobind-decorator';
import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {WelcomeScreen} from '../welcome/WelcomeScreen';

export function IntroScreenComponent(props: { onPress: () => void }) {
    return (
        <Screen>
            <Touchable onPress={props.onPress}>
                <Col style={styles.container}>
                    <Text>IntroScreen</Text>
                </Col>
            </Touchable>
        </Screen>
    )
}

export type IntroScreenProps =
    PXInjectedNavigationServiceProps

@PXInject('$navigation')
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
            <IntroScreenComponent onPress={this.handleOnPress}/>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center'
    }
});