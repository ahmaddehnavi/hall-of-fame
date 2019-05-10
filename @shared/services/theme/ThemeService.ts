import {DEFAULT_THEME} from '@shared';
import autobind from 'autobind-decorator';
import deepmerge from 'deepmerge';
import {action, observable} from 'mobx';
import {BaseService} from '../base/BaseService';
import {IThemeService, ThemeType} from './IThemeService';

export type InjectedThemeServiceProps = {
    $theme: IThemeService
}

@autobind
export class ThemeService extends BaseService<{}>
    implements IThemeService {

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

    get colors() {
        return this.get().colors || {};
    }

    get dimens() {
        return this.get().dimens || {};
    }
}