import {NavigationNavigateActionPayload} from 'react-navigation';

type ParamsType = { [key: string]: any }

export type InjectedNavigationServiceProps = {
    $navigation: INavigationService
}

export interface INavigationService {

    setNavigator(navigator);

    dispatch(action);

    navigate(routeName: string, params?: ParamsType, payload?: NavigationNavigateActionPayload);
}