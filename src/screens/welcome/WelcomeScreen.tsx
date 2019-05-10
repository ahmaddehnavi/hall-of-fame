import {PXINavigationService, PXInject, PXInjectedNavigationServiceProps, PXMultiBackHandler, PXScreen} from '@shared';
import autobind from 'autobind-decorator';
import React from 'react';
import {BackHandler, StyleSheet, Text, TextInput} from 'react-native';
import {SoundUtil} from '../../utils/SoundUtil';
import {FameListScreen} from '../fame-list/FameListScreen';

type WelcomeScreenProps =
    PXInjectedNavigationServiceProps

@PXInject('$navigation')
export class WelcomeScreen extends React.Component<WelcomeScreenProps> {
    static readonly ROUTE_NAME = 'WelcomeScreen';

    static start(nav: PXINavigationService) {
        nav.navigate(this.ROUTE_NAME);
    }

    render() {
        return (
            <PXScreen style={styles.container}>
                <Text>WelcomeScreen</Text>
                <TextInput
                    placeholder={''}
                />
                <PXMultiBackHandler
                    timeout={500}
                    maxCount={2}
                    onPress={this.handleBackPress}/>
            </PXScreen>
        )
    }

    @autobind
    handleBackPress(count: number) {
        if (count === 1) {
            FameListScreen.start(this.props.$navigation)
        } else if (count === 2) {
            SoundUtil.playTest()
                .then(value => {
                    BackHandler.exitApp();
                })
        }
    }
}


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center'
    }
});