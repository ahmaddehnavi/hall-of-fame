import React from 'react';
import 'react-native';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {LoadingView} from './LoadingView';

describe('LoadingView Tests', () => {

    it('should match snapshot', () => {
        let tree = renderer.create(
            <LoadingView

            />
        );
        expect(tree).toMatchSnapshot();
    });

});
