import {NavigationService, ThemeService} from '@shared';
import React from 'react';
import 'react-native';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {WelcomeScreenStore} from './WelcomeScreen.store';
import {WelcomeScreen} from './WelcomeScreen';

it('renders correctly', () => {
    let tree = renderer.create(
        <WelcomeScreen
            $navigation={new NavigationService()}
            $welcomeStore={new WelcomeScreenStore()}
            $theme={new ThemeService()}
        />
    );
    expect(tree).toMatchSnapshot();
});

