# hall of fame
 [![Build Status](https://travis-ci.com/ahmaddehnavi/hall-of-fame.svg?branch=master)](https://travis-ci.com/ahmaddehnavi/hall-of-fame)
 
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
exportW class ScreenName extends React.Component<ScreenNameProps> {
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


# naming conventions
|                       | name convention        | example    |
| -------------         | -------------          | ---------- |
|  component            | PascalCase             | TextInput
|  component file       | PascalCase.jsx         | TextInput.tsx
|  test file            | $targetName.test       | TextInput.test.tsx
|  store file           | $targetName.store      | TextInput.store.ts
|  folder               | dash-case              | text-input
|  instance             | camelCase              | let textInputStore   

* you can use `file nesting` feature of your ide to show related file in same category 
    *  jetbrains products :  https://www.jetbrains.com/help/webstorm/file-nesting-dialog.html
* also see https://github.com/airbnb/javascript/tree/master/react


* do not use default export (use named export) so you can reexport id needed by one line.

 
# binding this
you can use auto binding decorator `@autobind` to bind all method of class or single method

do not bind react component class because may override lifecycle binding



# mobx
* decorate any component that may use observable value.
    * if you dont know it use observable or not then decorate it :)
    * decorate component with  `@observer` help to mobx to rerender it 
    if any of observable value changed and improve performance.
    
    * `@observer`should be the first decoration add other above it   
    ```
        @DIInject('$store') // to optional injection or inject(''$store) to throw erro of can not inject
        @observer // should be the first one
        class MyComponent extends React.Component { ...
    ``` 
    *  you can use `Provider` component to provide dependency (it use in App.tsx check it)
 
 for more info [@see mobx docs](https://mobx.js.org/)
 
 
 # npm or yarn
 we use yarn as package manager