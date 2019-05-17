import React from 'react';
import 'react-native';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {MultiBackHandler} from './MultiBackHandler';

describe('MultiBackHandler Tests', () => {

    it('should match snapshot', () => {
        let tree = renderer.create(
            <MultiBackHandler
            />
        );
        expect(tree).toMatchSnapshot();
    });

    // todo write some logic test
});
