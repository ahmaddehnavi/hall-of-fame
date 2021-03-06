import {NavigationNavigateActionPayload, NavigationResetActionPayload} from 'react-navigation';

type ParamsType = { [key: string]: any }

export type InjectedNavigationServiceProps = {
    $navigation: INavigationService
}

/**
 *  hide navigation specification from app component so you can replace navigation with another one
 *  #setNavigator should be called before dispatch any action.
 */
export interface INavigationService {

    setNavigator(navigator);

    dispatch(action);

    navigate(routeName: string, params?: ParamsType, payload?: NavigationNavigateActionPayload);

    reset(routeName: string, params?: ParamsType, payload?: NavigationResetActionPayload);
}