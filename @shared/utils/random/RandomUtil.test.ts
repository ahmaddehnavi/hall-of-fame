import {RandomUtil} from './RandomUtil';

it('should generate random int', () => {
    let result = [0, 0, 0, 0, 0];
    for (let i = 0; i < 10000; i++) {
        result[RandomUtil.randomInt(0, 4)] = 1;
        if (result.findIndex(_ => _ === 0) === -1) {
            break;
        }
    }

    expect(result.filter(_ => _ === 0)).toHaveLength(0);
});