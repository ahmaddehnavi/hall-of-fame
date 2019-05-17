import React from 'react';
import 'react-native';
import {View} from 'react-native';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {Screen} from './Screen';

describe('Screen Tests', () => {

    it('should match snapshot', () => {
        let tree = renderer.create(
            <Screen>
                <View/>
            </Screen>
        );
        expect(tree).toMatchSnapshot();
    });

});
