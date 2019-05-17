import {DIInject, INavigationService, InjectedNavigationServiceProps, InjectedThemeServiceProps} from '@shared';
import autobind from 'autobind-decorator';
import {observer} from 'mobx-react';
import React from 'react';
import {Assets} from '../../assets/Assets';
import {WelcomeScreen} from '../welcome/WelcomeScreen';
import {IntroSlider, SlideItemType} from './IntroSlider';

export type IntroScreenProps =
    InjectedNavigationServiceProps &
    InjectedThemeServiceProps

@DIInject('$navigation', '$theme')
@observer
export class IntroScreen extends React.Component<IntroScreenProps> {
    static readonly ROUTE_NAME = 'IntroScreen';

    static start(nav: INavigationService) {
        nav.navigate(this.ROUTE_NAME);
    }

    static resetTo(nav: INavigationService) {
        nav.reset(this.ROUTE_NAME);
    }

    slides: Array<SlideItemType> = [
        {
            image: Assets.images.gif_1,
            backgroundColor: '#00b8d4',
        },
        {
            image: Assets.images.gif_2,
            backgroundColor: '#64dd17',
        },
        {
            image: Assets.images.gif_3,
            backgroundColor: '#ffd600',
        },
        {
            image: Assets.images.gif_4,
            backgroundColor: '#ff6d00',
        },
        {
            image: Assets.images.gif_5,
            backgroundColor: '#ff0000',
        }
    ];

    @autobind
    handleOnPress() {
        WelcomeScreen.resetTo(this.props.$navigation);
    }

    render() {
        return (
            <IntroSlider
                onDonePress={this.handleOnPress}
                slides={this.slides}
            />
        )
    }
}

