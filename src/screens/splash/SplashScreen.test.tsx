import {NavigationService} from '@shared';
import React from 'react';
import 'react-native';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {IntroService} from '../../services/intro/IntroService';
import {SplashScreen} from './SplashScreen';

it('renders correctly', () => {
    let tree = renderer.create(
    <SplashScreen
        $navigation = {new NavigationService()}
        $intro={new IntroService()}
    />
)
    ;
    expect(tree).toMatchSnapshot();
});

