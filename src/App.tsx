import {NavigationService} from '@shared';
import React from 'react';
import AppNavigator from './screens/AppNavigator';


export default class App extends React.Component {

    protected services = {
        [NavigationService.NAME]: new NavigationService()
    };

    constructor(p) {
        super(p);

        // init services
        for (let key in this.services) {
            if (this.services[key]) {
                this.services[key].$init(this.services);
            }
        }

        // start services when all service initialized.
        for (let key in this.services) {
            if (this.services[key]) {
                this.services[key].$onStart();
            }
        }
    }

    componentWillUnmount(): void {
        // stop all services
        for (let key in this.services) {
            if (this.services[key]) {
                this.services[key].$onStop();
            }
        }
    }

    render() {
        let nav = this.services[NavigationService.NAME];
        return (
            <AppNavigator
                ref={nav.setNavigator}
            />
        );
    }
}