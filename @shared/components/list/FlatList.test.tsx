import React from 'react';
import 'react-native';
import {View} from 'react-native';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {FlatList} from './FlatList';

describe('FlatList Tests', () => {

    it('should match snapshot', () => {
        let renderItem = () => {
            return <View/>
        };
        let tree = renderer.create(
            <FlatList
                renderItem={renderItem}
                data={[{id: '1'}]}
            />
        );
        expect(tree).toMatchSnapshot();
    });

});
