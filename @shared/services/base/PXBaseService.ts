import autobind from 'autobind-decorator';
import {PXIService} from './PXIService';

@autobind
export class PXBaseService<Config extends { [key: string]: PXIService<any> } = any> implements PXIService<Config> {
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
