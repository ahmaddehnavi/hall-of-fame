import * as React from 'react';
import {Platform, TouchableNativeFeedback, TouchableOpacity, TouchableWithoutFeedback, TouchableWithoutFeedbackProps, View} from 'react-native';


export type TouchableProps = TouchableWithoutFeedbackProps & {
    circle?: boolean
    withoutFeedback?: boolean
    children: React.ReactNode
}

export function Touchable(props: TouchableProps) {

    if (props.withoutFeedback) {
        return (
            <TouchableWithoutFeedback
                {...props}
            />
        );
    }
    if (Platform.OS === 'android') {
        if (Platform.Version >= 21) {
            return (
                <TouchableNativeFeedback
                    {...props}
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
                {...props}
                background={undefined}
            />
        )
    }

    return (
        <TouchableOpacity {...props}/>
    )
}