import {action, observable} from 'mobx';

export type ResourceState = 'none' | 'loading' | 'success' | 'error';

export class Resource<DataType, ErrorType = any> {

    static form<T, E = any>(loader: () => Promise<T>) {
        return new Resource<T, E>(loader);
    }

    @observable.ref
    protected _state: ResourceState = 'none';

    @observable.ref
    protected _data: DataType | undefined;

    @observable.ref
    protected _error: ErrorType | undefined;

    protected readonly _loader: () => Promise<DataType>;

    public constructor(loader: () => Promise<DataType>) {
        this._loader = loader
    }

    @action
    async load() {
        this.updateState('loading');
        try {
            this._data = await this._loader();
            this.updateState('success');
        } catch (e) {
            this._error = e;
            this.updateState('error');
        }
    }

    get state() {
        return this._state;
    }

    get data() {
        return this._data;
    }

    get error() {
        return this._error;
    }

    @action
    protected updateState(state: ResourceState) {
        this._state = state;
    }

    get isLoading() {
        return this.state === 'loading'
    }

    get isError() {
        return this.state === 'error'
    }

    get isSuccess() {
        return this.state === 'success'
    }


    get isNone() {
        return this.state === 'none'
    }


}
