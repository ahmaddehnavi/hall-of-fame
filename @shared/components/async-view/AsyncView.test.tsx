import {NavigationService, Resource} from '@shared';
import React from 'react';
import 'react-native';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {AsyncView} from './AsyncView';

describe('AsyncView Tests', () => {

    it('should match snapshot', () => {
        let res = Resource.form(req => Promise.resolve({data: 'test'}));
        let tree = renderer.create(
            <AsyncView
                resource={res}
            />
        );
        expect(tree).toMatchSnapshot();
    });

});
