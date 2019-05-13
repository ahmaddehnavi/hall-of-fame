import {Logger} from 'ad-logger';
import {inject, Provider} from 'mobx-react';

type ServiceName = '$navigation' | string

export function DIInject(...names: Array<ServiceName>) {
    return inject((stores, nextProps, context) => {
        let injects = {};
        names.forEach((name) => {
            if (name in nextProps) {
                injects[name] = nextProps[name];
            } else if (name in context) {
                injects[name] = context[name];
            } else if (name in stores) {
                injects[name] = stores[name];
            } else {
                Logger.warn(`can not inject ${name}.`)
            }
        });
        return injects;
    })
}

export const DIProvider = Provider;