export class ArrayUtil {
    static findClosestGreaterValue(array: Array<number>, value: number): number {
        let result;
        let lastDelta;
        array.some((item) => {
            let delta = Math.abs(value - item);
            if (delta > lastDelta) {
                return true;
            }
            result = item;
            lastDelta = delta;
            return false;
        });
        return result;
    }
}