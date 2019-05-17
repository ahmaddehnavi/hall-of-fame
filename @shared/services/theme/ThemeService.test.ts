import {ThemeService} from './ThemeService';

describe('ThemeService Tests', () => {
    it('should correctly', () => {
        let s = new ThemeService();
        s.merge({
            colors: {
                accentColor: 'test'
            }
        });
        expect(s.colors.accentColor).toBe('test')
    });

});