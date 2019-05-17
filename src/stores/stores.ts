import {WelcomeStore} from '../screens/welcome/WelcomeStore';
import remotedev from 'mobx-remotedev/lib/dev';

remotedev({global: true});

class Stores {
    [WelcomeStore.NAME] = new WelcomeStore()
}

export const stores = new Stores();