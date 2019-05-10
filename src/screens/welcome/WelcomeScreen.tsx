import {INavigationService, PXInject, PXInjectedNavigationServiceProps, MultiBackHandler, Row, Screen} from '@shared';
import autobind from 'autobind-decorator';
import React from 'react';
import {BackHandler, Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {SoundUtil} from '../../utils/SoundUtil';
import {FameListScreen} from '../fame-list/FameListScreen';

type WelcomeScreenProps =
    PXInjectedNavigationServiceProps


@PXInject('$navigation')
export class WelcomeScreen extends React.Component<WelcomeScreenProps> {
    static readonly ROUTE_NAME = 'WelcomeScreen';

    static start(nav: INavigationService) {
        nav.navigate(this.ROUTE_NAME);
    }

    render() {
        return (
            <Screen style={styles.container}>
                <Text>WelcomeScreen</Text>

                <TextInput
                    placeholder={'Enter a number'}
                    style={styles.textInput}
                />

                <Row>
                    <Button
                        title={'Save'}
                        onPress={this.handleSavePress}
                    />
                    <View style={{width:16}}/>
                    <Button
                        title={'Randomise'}
                        onPress={this.handleRandomisePress}
                    />
                </Row>

                <MultiBackHandler
                    timeout={500}
                    maxCount={2}
                    onPress={this.handleBackPress}/>
            </Screen>
        )
    }

    @autobind
    handleSavePress() {

    }

    @autobind
    handleRandomisePress() {

    }

    @autobind
    handleBackPress(count: number) {
        if (count === 1) {
            FameListScreen.start(this.props.$navigation)
        } else if (count === 2) {
            SoundUtil.playTest()
                .then(success => {
                    BackHandler.exitApp();
                })
        }
    }
}


const styles = StyleSheet.create({
    container: {
        alignItems: 'stretch',
        justifyContent: 'center'
    },
    textInput: {}
});