import {PXINavigationService, PXInject, PXInjectedNavigationServiceProps, PXMultiBackHandler} from '@shared';
import autobind from 'autobind-decorator';
import React from 'react';
import {BackHandler, StyleSheet, Text, View} from 'react-native';
import {SoundUtil} from '../../utils/SoundUtil';
import {WelcomeScreen} from '../welcome/WelcomeScreen';

type FameListScreenProps =
    PXInjectedNavigationServiceProps

@PXInject('$navigation')
export class FameListScreen extends React.Component<FameListScreenProps> {
    static readonly ROUTE_NAME = 'FameListScreen';

    static start(nav: PXINavigationService) {
        nav.navigate(this.ROUTE_NAME);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>FameListScreen</Text>
                <PXMultiBackHandler
                    timeout={500}
                    maxCount={2}
                    onPress={this.handleBackPress}/>
            </View>
        )
    }

    @autobind
    async handleBackPress(pressCount: number) {
        if (pressCount === 1) {
            WelcomeScreen.start(this.props.$navigation);
            return;
        }

        if (pressCount === 2) {
            let success = await SoundUtil.playTest();
            BackHandler.exitApp();
        }
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});