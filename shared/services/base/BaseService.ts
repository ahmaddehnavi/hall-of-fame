import autobind from 'autobind-decorator';
import {IService} from './IService';

@autobind
export class BaseService<Config extends { [key: string]: IService<any> } = any> implements IService<Config> {
    protected _config;

    protected get $config() {
        return this._config;
    }

    $init(config: Config) {
        this._config = config;
    }

    $onStart() {

    }

    $onStop() {

    }
}

export default BaseService;