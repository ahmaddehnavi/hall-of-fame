import autobind from 'autobind-decorator';
import {action, observable} from 'mobx';

export type ResourceState = 'none' | 'loading' | 'success' | 'error';

@autobind
export class BaseResource<ReqType, ResponseType, ErrorType = any, MetaType = never, T = any> {

    @observable.ref
    protected _state: ResourceState = 'none';

    @observable.ref
    protected _response: ResponseType | undefined;

    @observable.ref
    protected _error: ErrorType | undefined;

    protected readonly _loader: (request: ReqType, meta: MetaType) => Promise<ResponseType>;

    protected _lastRequest: ReqType;
    protected _lastMeta: MetaType;
    protected _childInstance: T;

    public constructor(loader: (req: ReqType, meta: MetaType) => Promise<ResponseType>) {
        this._loader = loader;
    }

    init(childInstance: T) {
        this._childInstance = childInstance;
    }

    @action
    async load(req: ReqType, meta: MetaType): Promise<T> {
        this._lastRequest = req;
        this._lastMeta = meta;

        this.notifyLoading();
        try {
            let response = await this._loader(req, meta);
            this.notifySuccess(response);
        } catch (e) {
            this.notifyError(e);
        }
        return this._childInstance;
    }

    reload() {
        return this.load(this._lastRequest, this._lastMeta);
    }

    get state() {
        return this._state;
    }

    get response() {
        return this._response;
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
    protected notifySuccess(response: ResponseType) {
        this._response = response;
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
        this._response = undefined;
    }
}
