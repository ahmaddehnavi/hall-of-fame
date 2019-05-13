import {RandomUtil} from './RandomUtil';

it('should generate random int', () => {
    let isValid = true;
    for (let i = 0; i < 100; i++) {
        let rnd = RandomUtil.randomInt(1, 5);
        if (rnd < 1) {
            isValid = false;
        }
        if (rnd > 5) {
            isValid = false;
        }
        if (!Number.isInteger(rnd)) {
            isValid = false;
        }

        if (!isValid) {
            break;
        }
    }

    expect(isValid).toBeTruthy();
});