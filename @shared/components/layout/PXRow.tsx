import * as React from 'react';
import {View, StyleSheet, ViewProps} from 'react-native';

/**
 * use Row or Col to make jsx more readable
 */
export function PXRow(props: ViewProps) {
    return (
        <View
            {...props}
            style={[styles.row, props.style]}/>
    )
}

const styles = StyleSheet.create({
    row: {flexDirection: 'row'}
});