import {ThemeService} from '@shared';
import React from 'react';
import 'react-native';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {Button} from './Button';

describe('Button Tests', () => {

    it('should match snapshot', () => {
        let tree = renderer.create(
            <Button
                title={'test'}
                $theme={new ThemeService()}
            />
        );
        expect(tree).toMatchSnapshot();
    });

});
