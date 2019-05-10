import * as React from 'react';
import {NavigationInjectedProps} from 'react-navigation';

export function NavigationParamsToProps(Screen: React.ComponentType<any>) {
    return (props: NavigationInjectedProps) => (
        <Screen {...props} {...props.navigation.state.params}/>
    )
}