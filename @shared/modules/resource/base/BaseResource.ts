import autobind from 'autobind-decorator';
import {action, observable} from 'mobx';
import {IResourceState, ResourceStateType} from './IResourceState';
import {IResourceUpdater} from './IResourceUpdater';


@autobind
export class BaseResource<ReqType, ResponseType, ErrorType = any, MetaType = never, T = any>
    implements IResourceState, IResourceUpdater<ResponseType, ErrorType> {

    @observable.ref
    protected _state: ResourceStateType = 'none';

    @observable.ref
    protected _response: ResponseType | undefined;

    @observable.ref
    protected _error: ErrorType | undefined;

    protected readonly _loader: (request: ReqType, meta: MetaType) => Promise<ResponseType>;

    protected _request: ReqType;
    protected _meta: MetaType;
    protected _childInstance: T;

    public constructor(loader: (req: ReqType, meta: MetaType) => Promise<ResponseType>) {
        this._loader = loader;
    }

    setChildInstance(childInstance: T) {
        this._childInstance = childInstance;
    }


    get request() {
        return this._request
    }

    @action
    setRequest(req: ReqType) {
        this._request = req
    }

    get meta() {
        return this._meta
    }

    @action
    setMeta(meta: MetaType) {
        this._meta = meta
    }

    @action
    async load(request: ReqType = this._request, meta: MetaType = this._meta): Promise<T> {
        this.setRequest(request);
        this.setMeta(meta);
        this.notifyLoading();
        try {
            let response = await this._loader(request, meta);
            this.notifySuccess(response);
        } catch (e) {
            this.notifyError(e);
        }
        return this._childInstance;
    }

    reload() {
        return this.load();
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
    notifyLoading() {
        this._state = 'loading';
        this._error = undefined;
        this._response = undefined;
    }

    @action
    notifySuccess(response: ResponseType) {
        this._response = response;
        this._state = 'success';
    }

    @action
    notifyError(error: ErrorType) {
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
