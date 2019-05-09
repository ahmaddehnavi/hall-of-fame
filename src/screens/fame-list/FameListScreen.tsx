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
    handleBackPress(count: number) {
        if (count === 1) {
            WelcomeScreen.start(this.props.$navigation)
        } else if (count === 2) {
            SoundUtil.play()
                .then(value => {
                    BackHandler.exitApp();
                })
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