import {Logger} from 'ad-logger';
import {inject, Provider} from 'mobx-react';

type ServiceName = '$theme' | '$navigation'|    string

/**
 *
 * @param names : inject names
 * @constructor
 */
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
                if (__DEV__) {
                    console.warn(`can not inject ${name}.`)
                }
            }
        });
        return injects;
    })
}

export const DIProvider = Provider;