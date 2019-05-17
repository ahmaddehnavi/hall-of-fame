import {NavigationService} from './NavigationService';
import {NavigationAction} from 'react-navigation';

export class MockNavigationService extends NavigationService {

    constructor(dispatch: (action: NavigationAction) => void = jest.fn()) {
        super();
        super.setNavigator({
            dispatch
        })
    }

    dispatch = jest.fn();
    reset = jest.fn();
    navigate = jest.fn()
}