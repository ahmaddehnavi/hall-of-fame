import autobind from 'autobind-decorator';
import * as React from 'react';
import {BackHandler, StyleSheet} from 'react-native';

export type PBackHandlerProps = {
    children?: React.ReactNode
    onPress?: (count: number) => boolean | void | Promise<void>
    /***
     * max duration between back press to be counted
     */
    timeout?: number
    /**
     *  if press count > maxCount then timeout will ignore and press notified
     */
    maxCount?: number

    notifyAll?: boolean
}

/**
 *
 */
export class MultiBackHandler extends React.PureComponent<PBackHandlerProps> {

    static defaultProps = {
        maxCount: 2
    };

    protected pressCount = 0;
    protected notifyAndResetTimeoutId: number | undefined = undefined;

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
    }

    render() {
        return this.props.children || false;
    }


    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
        this.notifyAndResetTimeoutId &&
        clearTimeout(this.notifyAndResetTimeoutId);
    }

    @autobind
    notifyBackPress(count) {
        count = Math.min(count, this.props.maxCount || Number.MAX_SAFE_INTEGER);
        if (this.props.onPress) {
            return this.props.onPress(count)
        }
        return false;
    }

    @autobind
    resetPressCount() {
        let count = this.pressCount;
        this.pressCount = 0;
        return count;
    }

    @autobind
    notifyAndResetPressCount() {
        let count = this.resetPressCount();
        return this.notifyBackPress(count)
    }

    @autobind
    handleBackPress() {
        // cancel pending reset
        if (this.notifyAndResetTimeoutId) {
            clearTimeout(this.notifyAndResetTimeoutId);
            this.notifyAndResetTimeoutId = undefined;
        }
        // plus counter
        this.pressCount++;

        // check if max count not reached .
        if (!this.props.maxCount || this.pressCount < this.props.maxCount) {
            if (this.props.timeout && this.props.timeout > 0) {

                if (this.props.notifyAll) {
                    // notify count then schedule counter reset
                    this.notifyAndResetTimeoutId = setTimeout(this.resetPressCount, this.props.timeout);
                    return this.notifyBackPress(this.pressCount)
                } else {
                    // schedule counter reset and notify
                    this.notifyAndResetTimeoutId = setTimeout(this.notifyAndResetPressCount, this.props.timeout);
                    return true;
                }
            }
        }

        return this.notifyBackPress(this.pressCount)
    }

}
