import {ThemeService} from '@shared';
import React from 'react';
import 'react-native';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {WelcomeComponent} from './WelcomeComponent';

describe('WelcomeComponent Test', () => {

    it('should match snapshot', () => {
        let onNumberChanged = jest.fn();
        let oSavePress = jest.fn();
        let onRandomisePress = jest.fn();
        let tree = renderer.create(
            <WelcomeComponent
                $theme={new ThemeService()}
                onNumberChanged={onNumberChanged}
                oSavePress={oSavePress}
                onRandomisePress={onRandomisePress}
                inputValue={'0'}
            />
        );
        expect(tree).toMatchSnapshot();
    });


    it('should match snapshot', () => {
        let onNumberChanged = jest.fn();
        let oSavePress = jest.fn();
        let onRandomisePress = jest.fn();
        let tree = renderer.create(
            <WelcomeComponent
                $theme={new ThemeService()}
                onNumberChanged={onNumberChanged}
                oSavePress={oSavePress}
                onRandomisePress={onRandomisePress}
                inputValue={'0'}
            />
        );
        let saveBtn = tree.root.findByProps({testID: 'btn-save'});
        expect(saveBtn).toBeDefined();
        saveBtn.props.onPress();
        expect(oSavePress).toBeCalled();

        let randomiseBtn = tree.root.findByProps({testID: 'btn-randomise'});
        expect(randomiseBtn).toBeDefined();
        randomiseBtn.props.onPress();
        expect(onRandomisePress).toBeCalled();

    });

});
