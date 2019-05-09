import {NavigationNavigateActionPayload} from 'react-navigation';

type ParamsType = { [key: string]: any }

export type PXInjectedNavigationServiceProps = {
    $navigation: PXINavigationService
}

export interface PXINavigationService {

    setNavigator(navigator);

    dispatch(action);

    navigate(routeName: string, params?: ParamsType, payload?: NavigationNavigateActionPayload);
}