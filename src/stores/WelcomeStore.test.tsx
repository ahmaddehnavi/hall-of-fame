import {AsyncUtil} from '@shared';
import {WelcomeStore} from './WelcomeStore';

describe('WelcomeStore Tests', () => {

    it('should have valid init value', () => {
        let store = new WelcomeStore();
        expect(store.numberValue).toBe(1);
        expect(store.activeAnimationIndex).toBe(0);
    });

    it('should have update number correctly', () => {
        let store = new WelcomeStore();
        expect(store.numberValue).toBe(1);
        store.updateNumber(3);
        expect(store.numberValue).toBe(3);
    });

    it('should show next animation correctly', () => {
        let store = new WelcomeStore();
        expect(store.activeAnimationIndex).toBe(0);
        store.setNextAnimationAsActive();
        expect(store.activeAnimationIndex).toBe(1);
    });

    it('should change after 1 second', async () => {
        let store = new WelcomeStore();
        let oldIndex = store.activeAnimationIndex;
        store.startAnimationChanger(500);
        await AsyncUtil.wait(700);
        let newIndex = store.activeAnimationIndex;
        expect(newIndex).not.toBe(oldIndex);
        store.stopAnimationChanger();
    });


});

