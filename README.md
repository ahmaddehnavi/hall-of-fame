# hall of fame
## directory structure
* @shared
   * components
   * services 
* src
   * screens
   * components
   * services
   * utils
   * assets
  
## @shared
include all component and services that can be used in other projects

_it better if we can create an library for this_

[see @shared docs](./@shared/README.md)

 
## screens
* all screen should be create in this directory
* to create screen 
    
    * first create a folder inside screens 
    * then create screen file inside that folder.
     and make sure screen file name ends with 'Screen'.
 
## components
  * include all app specific components.
  * screen specific component like list item component should be in their screen directory.


#how to add new screen

a simple screen should be like below

```
import {INavigationService} from '@shared';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export type ParamsType = {
    
}

export type ScreenNameProps = 
... &
ParamsType

@observer
export default class ScreenName extends React.Component<ScreenNameProps> {
    static readonly RouteName = 'ScreenName';

    static start(nav: INavigationService,params:ParamsType) {
        nav.navigate(ScreenName.RouteName,params);
    }

    render() {
        return (
           ...
        )
    }
}


const styles = StyleSheet.create({
    ...
});
```

* should have an static filed for RouteName;

```
  static readonly RouteName = 'ScreenName';
```
*  should have one or more starter method to show witch param need to passed to screen

        ```typescript
        static start(nav: INavigationService) {
            nav.navigate(this.RouteName);  // to access to static class property from static method should use this
        }
        ```
        or start with params
        ```typescript
        static start(nav: INavigationService,params:ParamsType) {
            nav.navigate(ScreenName.RouteName,params);
        }
        ```
#How to add new screen to navigator

wrap screen component in **navigationParamsToProps** HOC
and then add it to AppNavigator routes



#where to add test file
test file should be create beside the test target file and
ends with **.test.tsx** or **.test.ts**


# assets 
all assets files should be in this directory
see document for more details
[see assets docs](/src/assets/README.md)


# services
if you have reusable logic maybe you need a service

for example AuthService can be written to save and update token or check for current loggedIn state 

all service should init in `App.tsx` so all component can access them.

## how to create service

create a folder for that in `services` directory.
then create file for it 

each service most implement `IService` interface

for most case can extend `BaseService` class.

then add service to `App.tsx`

service name use in `DI` should be started `$` so we dont have any conflict with normal component props

# how to use service

inject service by `@DIInject('$name')` decorator into your component.

then you access service in component props. (`this.props.$name`)