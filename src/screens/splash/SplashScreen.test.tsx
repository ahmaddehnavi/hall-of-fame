import {PXNavigationService} from '@shared';
import React from 'react';
import 'react-native';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {SplashScreen} from './SplashScreen';

it('renders correctly', () => {
    let tree = renderer.create(
    <SplashScreen
       $navigation = {new PXNavigationService()}
    />
)
    ;
    expect(tree).toMatchSnapshot();
});

