import {AsyncUtil, NavigationService} from '@shared';
import React from 'react';
import 'react-native';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {ApiService} from '../../services/api/ApiService';
import {IntroService} from '../../services/intro/IntroService';
import {SplashScreen} from './SplashScreen';
import {SplashScreenStore} from './SplashScreen.store';

describe('Splash Screen test', () => {
    let $navigation = new NavigationService();
    let dispatch = jest.fn();
    $navigation.setNavigator({dispatch});

    it('renders correctly', async () => {
        let $api = new ApiService();
        let $splashStore = new SplashScreenStore({$navigation, $api, $intro: new IntroService()});
        let tree = renderer.create(
            <SplashScreen
                $api={$api}
                $navigation={$navigation}
                $intro={new IntroService()}
                $splashStore={$splashStore}
            />
        );
        expect(tree).toMatchSnapshot();
        // make sure async operation done
        await AsyncUtil.waitForAllAsync(1000);
    });
});


