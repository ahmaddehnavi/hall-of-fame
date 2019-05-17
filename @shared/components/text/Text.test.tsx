import React from 'react';
import 'react-native';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {Text} from './Text';

describe('Text Tests', () => {

    it('should match snapshot', () => {
        let tree = renderer.create(
            <Text
            />
        );
        expect(tree).toMatchSnapshot();
    });

});
