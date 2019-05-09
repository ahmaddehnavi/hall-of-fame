import {INavigationService} from '@shared';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class FlameListScreen extends React.Component {
    static readonly RouteName = 'FlameListScreen';

    static start(nav: INavigationService) {
        nav.navigate(FlameListScreen.RouteName);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>FlameListScreen</Text>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});