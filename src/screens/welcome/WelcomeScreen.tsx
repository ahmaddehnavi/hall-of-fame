import {DIInject, INavigationService, InjectedNavigationServiceProps, InjectedThemeServiceProps, RandomUtil} from '@shared';
import autobind from 'autobind-decorator';
import {observer} from 'mobx-react';
import React from 'react';
import {BackHandler, ImageSourcePropType} from 'react-native';
import Assets from '../../assets/Assets';
import {SoundUtil} from '../../utils/SoundUtil';
import {FameListScreen} from '../fame-list/FameListScreen';
import {WelcomeComponent} from './WelcomeComponent';

type WelcomeScreenProps =
    InjectedNavigationServiceProps &
    InjectedThemeServiceProps


type State = {
    activeAnimationIndex: number
    numberValue: number
}

type AnimationData = {
    image: ImageSourcePropType
    animationName: string
}

@DIInject('$navigation', '$theme')
@observer
export class WelcomeScreen extends React.Component<WelcomeScreenProps, State> {
    static readonly ROUTE_NAME = 'WelcomeScreen';

    static start(nav: INavigationService) {
        nav.navigate(this.ROUTE_NAME);
    }

    static resetTo(nav: INavigationService) {
        nav.reset(this.ROUTE_NAME);
    }

    state = {
        activeAnimationIndex: 0,
        numberValue: 1
    };

    animations: Array<AnimationData> = [
        {animationName: 'fadeIn', image: Assets.images.gif_1},
        {animationName: 'zoomIn', image: Assets.images.gif_2},
        {animationName: 'slideInLeft', image: Assets.images.gif_3},
        {animationName: 'slideInRight', image: Assets.images.gif_4},
        {animationName: 'bounce', image: Assets.images.gif_5},
    ];

    protected animationChangerIntervalId;

    componentDidMount() {
        // change animation every 5 second
        this.animationChangerIntervalId = setInterval(this.showNextAnimation, 5000)
    }

    componentWillUnmount() {
        clearInterval(this.animationChangerIntervalId);
    }

    @autobind
    showNextAnimation() {
        // set next animation as active (loop)
        this.setState({
            activeAnimationIndex: (this.state.activeAnimationIndex + 1) % this.animations.length
        })
    }

    render() {
        let activeAnimation = this.animations[this.state.activeAnimationIndex];
        return (
            <WelcomeComponent
                onBackPress={this.handleBackPress}
                onRandomisePress={this.handleRandomisePress}
                oSavePress={this.handleSavePress}
                onNumberChanged={this.handleNumberChanged}
                numberValue={String(this.state.numberValue)}
                animation={activeAnimation.animationName}
                image={activeAnimation.image}
                $theme={this.props.$theme}
            />
        )
    }

    @autobind
    handleNumberChanged(num: string) {
        this.setState({
            numberValue: Number(num),
        })
    }

    @autobind
    handleSavePress() {
        // randomise animations based on number value
        let shuffleRate = Number(this.state.numberValue) / 10 || .5;
        this.animations = this.animations.sort(_ => {
            return Math.random() > shuffleRate ? -1 : 1
        });
        // update current animation based on new animation list
        this.showNextAnimation();
    }

    @autobind
    handleRandomisePress() {
        this.setState({
            numberValue: RandomUtil.randomInt(0, 9)
        })
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
