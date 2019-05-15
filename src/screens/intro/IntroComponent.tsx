import {ResponsiveUtil} from '@shared';
import autobind from 'autobind-decorator';
import Color from 'color';
import React, {Component} from 'react';
import {Animated, Image, ImageSourcePropType} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

export type SlideItemType = { image: ImageSourcePropType, backgroundColor: string }
type Props = {
    onDonePress: () => void,
    slides: Array<SlideItemType>
}

export class IntroComponent extends Component<Props> {
    _scrollX = new Animated.Value(0);

    @autobind
    renderItem(item: SlideItemType) {
        return (
            <Image
                key={item.backgroundColor}
                style={{width: '90%', marginHorizontal: '5%', flex: 1}}
                resizeMode={'contain'}
                source={item.image}
            />
        );
    };

    render() {
        // convert animated scroll value to animated background color
        let backgroundColor = this._scrollX.interpolate({
            inputRange: this.props.slides.map((_, index) => index * ResponsiveUtil.width),
            outputRange: this.props.slides.map(item => {
                // covert color so we can use any valid color format
                let color = new Color(item.backgroundColor);
                return `rgba(${color.red()},${color.green()},${color.blue()},${color.alpha()})`
            })
        });
        return (
            <Animated.View style={{flex: 1, backgroundColor}}>
                <AppIntroSlider
                    renderItem={this.renderItem}
                    slides={this.props.slides}
                    onDone={this.props.onDonePress}
                    onScroll={Animated.event([{nativeEvent: {contentOffset: {x: this._scrollX}}}])}
                />
            </Animated.View>
        )
    }
}
