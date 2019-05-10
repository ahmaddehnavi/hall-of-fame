import {DEFAULT_THEME, ThemeType} from '@shared';
import autobind from 'autobind-decorator';
import deepmerge from 'deepmerge';
import {action, observable} from 'mobx';
import {BaseService} from '../base/BaseService';

export type InjectedThemeServiceProps = {
    $theme: ThemeService
}

@autobind
export class ThemeService extends BaseService<{}> {

    public static readonly NAME = '$theme';

    @observable.ref
    protected _configs: ThemeType = DEFAULT_THEME;

    @action
    merge(config: ThemeType) {
        this._configs = deepmerge(this._configs, config);
    }

    get() {
        return this._configs || {}
    }

    get styles() {
        return this.get().styles || {};
    }

    get colors() {
        return this.get().colors || {};
    }

    get dimens() {
        return this.get().dimens || {};
    }
}