import {Logger} from 'ad-logger';
import autobind from 'autobind-decorator';
import {action, observable} from 'mobx';
import {NavigationAction, NavigationActions, NavigationContainerComponent, NavigationNavigateActionPayload} from 'react-navigation';
import {BaseService} from '../base/BaseService';
import {PXINavigationService} from './PXINavigationService';

type ParamsType = { [key: string]: any }


@autobind
export class NavigationService extends BaseService<{}> implements PXINavigationService {
    public static readonly NAME = '$navigation';
    protected Logger = Logger.withTag('NavigationService');

    @observable.ref
    protected _navigator: { dispatch: (action: NavigationAction) => void };

    @action
    setNavigator(navigator: { dispatch: (action: NavigationAction) => void }) {
        this._navigator = navigator;
    }

    dispatch(act) {
        if (!this._navigator) {
            console.warn('try dispatch action but this.navigator is not defined');
            return;
        }
        this._navigator.dispatch(act);
    }

    navigate(routeName: string, params?: ParamsType, payload?: NavigationNavigateActionPayload) {
        this.dispatch(NavigationActions.navigate({
            routeName,
            params,
        }))
    }
}