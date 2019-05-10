import {PropsWithChildren} from 'react';
import * as React from 'react';
import {Platform, StyleSheet, TouchableNativeFeedback, TouchableOpacity, TouchableWithoutFeedback, TouchableWithoutFeedbackProps} from 'react-native';


export type PXTouchableProps = PropsWithChildren<TouchableWithoutFeedbackProps> & {
    circle?: boolean
    withoutFeedback?: boolean
}

export function Touchable(props: PXTouchableProps) {

    if (props.withoutFeedback) {
        return (
            <TouchableWithoutFeedback
                {...this.props}
            />
        );
    }
    if (Platform.OS === 'android') {
        if (Platform.Version >= 21) {
            return (
                <TouchableNativeFeedback
                    {...this.props}
                    background={
                        props.circle ?
                            TouchableNativeFeedback.SelectableBackgroundBorderless() :
                            TouchableNativeFeedback.SelectableBackground()
                    }
                />
            )
        }
        return (
            <TouchableNativeFeedback
                {...this.props}
                background={undefined}
            />
        )
    }

    return (
        <TouchableOpacity {...this.props}/>
    )
}

const styles = StyleSheet.create({
    row: {flexDirection: 'row'}
});