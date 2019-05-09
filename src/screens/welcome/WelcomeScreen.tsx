import {INavigationService} from '@shared';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class WelcomeScreen extends React.Component {
    static readonly RouteName = 'WelcomeScreen';

    static start(nav: INavigationService) {
        nav.navigate(WelcomeScreen.RouteName);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>WelcomeScreen</Text>
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