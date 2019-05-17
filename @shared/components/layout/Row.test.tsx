import React from 'react';
import 'react-native';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {Row} from './Row';

describe('Row Tests', () => {

    it('should match snapshot', () => {
        let tree = renderer.create(
            <Row

            />
        );
        expect(tree).toMatchSnapshot();
    });

});
