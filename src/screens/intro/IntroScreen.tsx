import {INavigationService} from '@shared';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class IntroScreen extends React.Component {
    static readonly RouteName = 'IntroScreen';

    static start(nav: INavigationService) {
        nav.navigate(IntroScreen.RouteName);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>IntroScreen</Text>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'green'
    }
});