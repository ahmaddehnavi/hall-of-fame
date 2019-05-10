import * as React from 'react';
import {StyleSheet, ViewProps} from 'react-native';
import {PXCol} from '../layout/PXCol';

export type ScreenProps = ViewProps & {
    children: React.ReactNode
    onBackPress?: () => void
}

/**
 * can be use for root element of each screen
 */
export class PXScreen extends React.Component<ScreenProps> {


    render() {
        return (
            <PXCol
                {...this.props}
                style={[
                    styles.screen,
                    this.props.style
                ]}
            />
        )
    }

}

const styles = StyleSheet.create({
    screen: {
        flex: 1
    }
});