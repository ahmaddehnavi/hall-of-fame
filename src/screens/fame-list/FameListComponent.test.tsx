import {ListResource} from '@shared';
import React from 'react';
import 'react-native';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {PopularPersonItemType} from '../../services/api/models/PopularPersonResponseType';
import {FameListComponent} from './FameListComponent';

describe('FameListComponent Tests', () => {

    jest.useFakeTimers();

    it('renders correctly', () => {
        let res = ListResource.form<{}, PopularPersonItemType>((req, {page}) => {
            return Promise.resolve({
                page: 1,
                isFinished: true,
                items: [{
                    id: 1,
                    adult: false,
                    known_for: [],
                    name: 'test',
                    popularity: 1,
                    profile_path: 'https://test.com/test.png'
                }],
                message: ''
            });
        });

        function resolveImagePath(path) {
            return path;
        }

        let tree = renderer.create(
            <FameListComponent
                listResource={res}
                resolveProfileImageUrl={resolveImagePath}
            />
        );


        expect(tree).toMatchSnapshot();
    });

});
