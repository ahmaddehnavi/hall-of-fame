import {Dimensions} from 'react-native';

export class ResponsiveUtil {
    static get scale() {
        return Dimensions.get('window').scale
    }

    static get height() {
        return Dimensions.get('window').height
    }

    static get width() {
        return Dimensions.get('window').width
    }

    static get fontScale() {
        return Dimensions.get('window').fontScale
    }

    static get isSmall() {
        return this.width < 321
    }

    static get isNormal() {
        return this.width >= 321 && this.width < 599
    }

    static get isLarge() {
        return this.width >= 599 && this.width < 1000
    }

    static get isXLarge() {
        return this.width >= 1000
    }


    static dimen(small, normal, large = normal, xLarge = large) {
        if (this.isSmall) {
            return small;
        }

        if (this.isNormal) {
            return normal;
        }

        if (this.isLarge) {
            return large;
        }

        if (this.isXLarge) {
            return xLarge;
        }

        return normal
    }

    static plus(normal: number, diff: number): number {
        return this.dimen(normal - diff, normal, normal + diff, normal + diff + diff)
    }

    static size(normal: number, min: number | undefined, max: number | undefined) {
        return Math.max(Math.min(normal, max || normal), min || normal)
    }
}
