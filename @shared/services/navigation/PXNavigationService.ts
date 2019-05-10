import {Logger} from 'ad-logger';
import autobind from 'autobind-decorator';
import {action, observable} from 'mobx';
import {
    NavigationAction,
    NavigationActions,
    NavigationContainerComponent,
    NavigationNavigateActionPayload, NavigationResetAction,
    NavigationResetActionPayload, StackActions
} from 'react-navigation';
import {PXBaseService} from '../base/PXBaseService';
import {PXINavigationService} from './PXINavigationService';

type ParamsType = { [key: string]: any }

/**
 *  hide navigation specification from app component so you can replace navigation with another one
 *  #setNavigator should be called before dispatch any action.
 */
@autobind
export class PXNavigationService extends PXBaseService<{}> implements PXINavigationService {
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

    reset(routeName: string, params?: ParamsType, payload?: NavigationResetActionPayload) {
        this.dispatch(StackActions.reset({
                actions: [
                    NavigationActions.navigate({
                        routeName,
                        params
                    })
                ],
                index: 0,
                ...payload,
            })
        )
    }
}