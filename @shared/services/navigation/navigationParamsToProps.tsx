import * as React from 'react';
import {NavigationInjectedProps} from 'react-navigation';

export function navigationParamsToProps(Screen: React.ComponentType<any> & { RouteName?: string }) {
    function Component(props: NavigationInjectedProps) {
        return (
            <Screen {...props} {...props.navigation.state.params}/>
        );
    }

    const wrappedComponentName = Screen.displayName
        || Screen.name
        || Screen.RouteName
        || 'Component';

    Component.displayName = `navigationParamsToProps(${wrappedComponentName})`;
    return Component;
}