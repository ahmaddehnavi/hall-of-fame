import React from 'react';
import 'react-native';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {EmptyView} from './EmptyView';

describe('EmptyView Tests', () => {

    it('should match snapshot', () => {
        let tree = renderer.create(
            <EmptyView
                message={'no item'}
                style={{padding: 16}}
            />
        );
        expect(tree).toMatchSnapshot();
    });

});
