import {AsyncUtil} from '@shared';
import React from 'react';
import 'react-native';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import App from './App';

it('renders correctly', async () => {
    renderer.create(<App />);
    await AsyncUtil.waitForAllAsync();
});

