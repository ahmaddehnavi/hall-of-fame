import {INavigationService, MultiBackHandler, DIInject, InjectedNavigationServiceProps, Screen} from '@shared';
import autobind from 'autobind-decorator';
import {observer} from 'mobx-react';
import React from 'react';
import {BackHandler, StyleSheet, Text} from 'react-native';
import Assets from '../../assets/Assets';
import {SoundUtil} from '../../utils/SoundUtil';
import {WelcomeScreen} from '../welcome/WelcomeScreen';

type FameListScreenProps =
    InjectedNavigationServiceProps

@DIInject('$navigation')
@observer
export class FameListScreen extends React.Component<FameListScreenProps> {
    static readonly ROUTE_NAME = 'FameListScreen';

    static start(nav: INavigationService) {
        nav.navigate(this.ROUTE_NAME);
    }

    static resetTo(nav: INavigationService) {
        nav.reset(this.ROUTE_NAME);
    }

    render() {
        return (
            <FameListComponent
                onBackPress={this.handleBackPress}/>
        )
    }

    @autobind
    async handleBackPress(pressCount: number) {
        if (pressCount === 1) {
            WelcomeScreen.start(this.props.$navigation);
            return;
        }

        if (pressCount === 2) {
            await SoundUtil.play(Assets.sounds.test);
            BackHandler.exitApp();
        }
    }
}


type FameListComponentProps = {
    onBackPress: (count: number) => void | boolean | Promise<void>
}

function FameListComponent(props: FameListComponentProps) {
    return (
        <Screen style={styles.container}>
            <Text>FameListScreen</Text>

            <MultiBackHandler
                timeout={500}
                maxCount={2}
                onPress={props.onBackPress}/>
        </Screen>
    )

}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center'
    }
});