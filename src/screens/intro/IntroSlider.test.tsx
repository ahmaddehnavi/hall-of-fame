import {NavigationService, ThemeService} from '@shared';
import React from 'react';
import 'react-native';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {Assets} from '../../assets/Assets';
import {IntroSlider} from './IntroSlider';

it('renders correctly', () => {
    function x() {
    }

    let tree = renderer.create(
        <IntroSlider
            slides={[
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
            ]}
            onDonePress={x}
        />
    );
    expect(tree).toMatchSnapshot();
});

