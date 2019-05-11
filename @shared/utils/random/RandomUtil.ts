export class RandomUtil {
    /**
     *
     * @param min
     * @param max
     * @return number >= min & number <= max
     * if min is not an integer min = next larger int
     * if max is not an integer max = next smaller int
     */
    static randomInt(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}