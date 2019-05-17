import {Resource} from '@shared';
import React from 'react';
import 'react-native';
import {Text} from 'react-native';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {AsyncView} from './AsyncView';

describe('AsyncView Tests', () => {

    it('should match snapshot', () => {
        let res = Resource.form(_ => Promise.resolve({data: 'test'}));
        let tree = renderer.create(
            <AsyncView
                resource={res}
            />
        );
        expect(tree).toMatchSnapshot();
    });


    it('should show data', async () => {
        let res = Resource.form(_ => Promise.resolve({data: 'test'}));
        await res.load();
        let tree = renderer.create(
            <AsyncView resource={res}>
                {
                    !!res.data &&
                    <Text>{res.data}</Text>
                }
            </AsyncView>
        );
        let text = tree.root.findByType(Text);
        expect(text.props.children).toBe('test');
    });
});