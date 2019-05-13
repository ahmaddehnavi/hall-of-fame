import * as React from 'react';
import {StyleSheet, ViewProps} from 'react-native';
import {Col} from '../layout/Col';

export type ScreenProps = ViewProps & {
    children: React.ReactNode
}

/**
 * can be use for root element of each screen
 */
export class Screen extends React.Component<ScreenProps> {


    render() {
        return (
            <Col
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