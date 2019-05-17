import {NavigationService} from '@shared';
import React from 'react';
import 'react-native';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {ApiService} from '../../services/api/ApiService';
import {FameListScreen} from './FameListScreen';
import {FameListScreenStore} from './FameListScreen.store';

it('renders correctly', () => {
    let tree = renderer.create(
        <FameListScreen
            $navigation={new NavigationService()}
            $api={new ApiService()}
            $fameListStore={new FameListScreenStore({$api: new ApiService(), $navigation: new NavigationService()})}
        />
    );
    expect(tree).toMatchSnapshot();
});

