import autobind from 'autobind-decorator';
import * as React from 'react';
import {BackHandler, StyleSheet} from 'react-native';

export type PBackHandlerProps = {
    children?: React.ReactNode
    onPress?: (count: number) => boolean | void | Promise<void>
    /***
     * if next press happen before timeout onPress only notified for last press
     */
    timeout?: number
    /**
     *  if press count > maxCount then timeout will ignore and press notified
     */
    maxCount?: number
}

/**
 *
 */
export class PXMultiBackHandler extends React.PureComponent<PBackHandlerProps> {

    static defaultProps = {
        maxCount: 2
    };

    protected pressCount = 0;
    protected resetPressCountTimeoutId: number | undefined = undefined;

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
    }

    render() {
        return this.props.children || false;
    }


    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
        this.resetPressCountTimeoutId &&
        clearTimeout(this.resetPressCountTimeoutId);
    }

    @autobind
    notifyBackPress() {
        if (this.props.onPress) {
            return this.props.onPress(this.pressCount)
        }
        return false;
    }

    @autobind
    notifyAndResetPressCount() {
        let count = Math.min(this.pressCount, this.props.maxCount || Number.MAX_SAFE_INTEGER);
        this.pressCount = 0;
        if (this.props.onPress) {
            return this.props.onPress(count)
        }
        return false;
    }

    @autobind
    handleBackPress() {
        // cancel pending reset && plus counter
        if (this.resetPressCountTimeoutId) {
            clearTimeout(this.resetPressCountTimeoutId);
            this.resetPressCountTimeoutId = undefined;
        }
        this.pressCount++;

        if (!this.props.maxCount || this.pressCount < this.props.maxCount) {
            // schedule counter reset
            if (this.props.timeout && this.props.timeout > 0) {
                this.resetPressCountTimeoutId = setTimeout(this.notifyAndResetPressCount, this.props.timeout);
                return true;
            }
        }

        return this.notifyBackPress()
    }

}
