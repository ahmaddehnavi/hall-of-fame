import React from 'react';
import 'react-native';
import {View} from 'react-native';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {Touchable} from './Touchable';

describe('Touchable Tests', () => {

    it('should match snapshot', () => {
        let tree = renderer.create(
            <Touchable>
                <View/>
            </Touchable>
        );
        expect(tree).toMatchSnapshot();
    });

});
