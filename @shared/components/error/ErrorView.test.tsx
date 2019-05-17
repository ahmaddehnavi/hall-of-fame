import {NavigationService} from '@shared';
import React from 'react';
import 'react-native';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {ErrorView} from './ErrorView';

describe('ErrorView Tests', () => {

    it('should match snapshot', () => {
        let tree = renderer.create(
            <ErrorView

            />
        );
        expect(tree).toMatchSnapshot();
    });

});
