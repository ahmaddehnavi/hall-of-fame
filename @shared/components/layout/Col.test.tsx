import React from 'react';
import 'react-native';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {Col} from './Col';

describe('Col Tests', () => {

    it('should match snapshot', () => {
        let tree = renderer.create(
            <Col

            />
        );
        expect(tree).toMatchSnapshot();
    });

});
