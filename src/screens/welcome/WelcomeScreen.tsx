import {
    DIInject,
    INavigationService,
    InjectedNavigationServiceProps,
    InjectedThemeServiceProps,
    MultiBackHandler,
    NavigationService,
    Screen,
    ThemeService
} from '@shared';
import autobind from 'autobind-decorator';
import {observer} from 'mobx-react';
import React from 'react';
import {BackHandler, StyleSheet} from 'react-native';
import {InjectedWelcomeStoreProps, WelcomeStore} from '../../stores/WelcomeStore';
import {SoundUtil} from '../../utils/SoundUtil';
import Assets from '../../assets/Assets';
import {FameListScreen} from '../fame-list/FameListScreen';
import {WelcomeComponent} from './WelcomeComponent';

type WelcomeScreenProps =
    InjectedNavigationServiceProps &
    InjectedThemeServiceProps &
    InjectedWelcomeStoreProps


@DIInject(NavigationService.NAME, ThemeService.NAME, WelcomeStore.NAME)
@observer
export class WelcomeScreen extends React.Component<WelcomeScreenProps> {
    static readonly ROUTE_NAME = 'WelcomeScreen';

    static start(nav: INavigationService) {
        nav.navigate(this.ROUTE_NAME);
    }

    static resetTo(nav: INavigationService) {
        nav.reset(this.ROUTE_NAME);
    }

    componentDidMount() {
        this.props.$welcomeStore.startAnimationChanger();
    }

    componentWillUnmount(): void {
        this.props.$welcomeStore.stopAnimationChanger();
    }

    render() {
        let store = this.props.$welcomeStore;
        let activeAnimation = store.activeAnimation;
        return (
            <Screen style={styles.container}>

                <WelcomeComponent
                    onRandomisePress={store.randomise}
                    oSavePress={store.save}
                    onNumberChanged={store.updateNumber}
                    inputValue={String(store.numberValue)}
                    animation={activeAnimation.animationName}
                    image={activeAnimation.image}
                    $theme={this.props.$theme}
                />

                <MultiBackHandler
                    timeout={500}
                    maxCount={2}
                    onPress={this.handleBackPress}/>
            </Screen>
        )
    }

    @autobind
    handleBackPress(count: number) {
        if (count === 1) {
            FameListScreen.start(this.props.$navigation)
        } else if (count === 2) {
            SoundUtil.play(Assets.sounds.test)
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
});