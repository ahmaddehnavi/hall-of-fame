import {Logger} from 'ad-logger';
import autobind from 'autobind-decorator';
import {observable} from 'mobx';
import {NavigationActions, NavigationContainerComponent, NavigationNavigateActionPayload} from 'react-navigation';
import BaseService from '../base/BaseService';
import {INavigationService} from './INavigationService';

type ParamsType = { [key: string]: any }


@autobind
export class NavigationService extends BaseService<{}> implements INavigationService {
    public static readonly NAME = '$navigation';
    protected _navigator: NavigationContainerComponent;
    protected Logger = Logger.withTag('NavigationService');

    @observable.ref
    protected _state;

    setNavigator(navigator: NavigationContainerComponent) {
        this._navigator = navigator;
    }

    updateState(state) {
        this._state = state;
    }

    get state() {
        return this._state;
    }

    dispatch(action) {
        if (!this._navigator) {
            this.Logger.warn('try dispatch action but this.navigator is not defined');
            return;
        }
        this._navigator.dispatch(action);
    }

    navigate(routeName: string, params?: ParamsType, payload?: NavigationNavigateActionPayload) {
        this.dispatch(NavigationActions.navigate({
            routeName,
            params,
            ...payload
        }))
    }
}