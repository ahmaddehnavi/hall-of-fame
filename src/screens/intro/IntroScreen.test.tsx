import {PXNavigationService} from '@shared';
import React from 'react';
import 'react-native';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {IntroScreen} from './IntroScreen';

it('renders correctly', () => {
    let tree = renderer.create(
        <IntroScreen
            $navigation={new PXNavigationService()}
        />
    );
    expect(tree).toMatchSnapshot();
});

