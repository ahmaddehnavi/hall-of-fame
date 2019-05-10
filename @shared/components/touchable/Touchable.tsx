import * as React from 'react';
import {Platform, TouchableNativeFeedback, TouchableOpacity, TouchableWithoutFeedback, TouchableWithoutFeedbackProps} from 'react-native';


export type PXTouchableProps = TouchableWithoutFeedbackProps & {
    circle?: boolean
    withoutFeedback?: boolean
    children: React.ReactNode
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