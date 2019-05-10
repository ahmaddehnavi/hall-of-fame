import {PXProvider, PXNavigationService} from '@shared';
import {Provider} from 'mobx-react';
import React from 'react';
import AppNavigator from './screens/AppNavigator';


export default class App extends React.Component {

    protected services = {
        [PXNavigationService.NAME]: new PXNavigationService()
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
        let nav = this.services[PXNavigationService.NAME];

        return (
            <Provider {...this.services}>
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