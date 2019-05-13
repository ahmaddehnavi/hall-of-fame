import autobind from 'autobind-decorator';
import {action, observable} from 'mobx';

export type ResourceState = 'none' | 'loading' | 'success' | 'error';

@autobind
export class BaseResource<ReqType, DataType, ErrorType = any, MetaType = never> {

    @observable.ref
    protected _state: ResourceState = 'none';

    @observable.ref
    protected _data: DataType | undefined;

    @observable.ref
    protected _error: ErrorType | undefined;

    protected readonly _loader: (request: ReqType, meta: MetaType) => Promise<DataType>;

    protected _lastRequest: ReqType;
    protected _lastMeta: MetaType;

    public constructor(loader: (req: ReqType, meta: MetaType) => Promise<DataType>) {
        this._loader = loader
    }

    @action
    async load(req: ReqType, meta: MetaType) {
        this._lastRequest = req;
        this._lastMeta = meta;

        this.notifyLoading();
        try {
            let data = await this._loader(req, meta);
            this.notifySuccess(data);
        } catch (e) {
            this.notifyError(e)
        }
    }

    reload() {
        return this.load(this._lastRequest, this._lastMeta);
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


    @action
    protected notifyLoading() {
        this._state = 'loading';
    }

    @action
    protected notifySuccess(data: DataType) {
        this._data = data;
        this._state = 'success';
    }

    @action
    protected notifyError(error: ErrorType) {
        this._error = error;
        this._state = 'error';
    }

    @action
    reset() {
        this._state = 'none';
        this._error = undefined;
        this._data = undefined;
    }
}
