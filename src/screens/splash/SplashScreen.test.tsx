import {AsyncUtil, NavigationService} from '@shared';
import React from 'react';
import 'react-native';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {IntroService} from '../../services/intro/IntroService';
import {SplashScreen} from './SplashScreen';

describe('Splash Screen test', () => {
    let $navigation = new NavigationService();
    let dispatch = jest.fn();
    $navigation.setNavigator({dispatch});

    it('renders correctly', async () => {

        let tree = renderer.create(
            <SplashScreen
                $navigation={$navigation}
                $intro={new IntroService()}
            />
        );
        expect(tree).toMatchSnapshot();
        // make sure async operation done
        await AsyncUtil.waitForAllAsync(1000);
    });
});


