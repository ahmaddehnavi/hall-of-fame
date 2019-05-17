import {NavigationService, ThemeService} from '@shared';
import {Provider} from 'mobx-react';
import React from 'react';
import {I18nManager} from 'react-native';
import AppNavigator from './screens/AppNavigator';
import {ApiService} from './services/api/ApiService';
import {IntroService} from './services/intro/IntroService';
import {createAllStore} from './stores/Stores';


export default class App extends React.Component {

    protected services = {
        [NavigationService.NAME]: new NavigationService(),
        [IntroService.NAME]: new IntroService(),
        [ThemeService.NAME]: new ThemeService(),
        [ApiService.NAME]: new ApiService(),
    };

    protected stores;

    constructor(p) {
        super(p);

        // init services
        for (let key in this.services) {
            if (this.services[key]) {
                this.services[key].init(this.services);
            }
        }

        // start services when all service initialized.
        for (let key in this.services) {
            if (this.services[key]) {
                this.services[key].onStart();
            }
        }
        this.stores = createAllStore(this.services);

        I18nManager.allowRTL(false);
        I18nManager.forceRTL(false);
    }

    componentWillUnmount(): void {
        // stop all services
        for (let key in this.services) {
            if (this.services[key]) {
                this.services[key].onStop();
            }
        }
    }

    render() {
        let nav = this.services[NavigationService.NAME];

        return (
            <Provider {...this.services} {...this.stores}>
                <AppNavigator
                    ref={(ref) => {
                        if (ref) {
                            nav.setNavigator(ref)
                        }
                    }}
                />
            </Provider>
        );
    }
}