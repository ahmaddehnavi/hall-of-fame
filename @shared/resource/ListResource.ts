import autobind from 'autobind-decorator';
import {action, computed, IObservableArray, observable} from 'mobx';
import {BaseResource} from './BaseResource';

export interface ParsedListApiResponse<ItemType> {
    items: Array<ItemType>
    isFinished: boolean
    page: number
    message?: string
}

export type ListResourceDataType<ItemType> = { items: Array<ItemType>, page: number, isFinished: boolean }

@autobind
export class ListResource<ReqType, ItemType, ErrorType = any>
    extends BaseResource <ReqType, ListResourceDataType<ItemType>, ErrorType, { page: number }> {

    static form<ReqType, ItemType, ErrorType = any>(loader: (req: ReqType, meta: { page: number }) => Promise<ListResourceDataType<ItemType>>) {
        return new ListResource<ReqType, ItemType, ErrorType>(loader);
    }

    public readonly items: IObservableArray<ItemType> = observable.array([], {deep: false});

    @observable
    protected _currentPage?: number;

    @observable
    protected _isFinished?: boolean;

    private _request: ReqType;

    protected hasPendingLoadRequest: boolean;


    @action
    protected notifySuccess(info: ListResourceDataType<ItemType>) {
        if (!info) {
            return;
        }
        if (info.items && info.items.length > 0) {
            this.items.push(...info.items)
        }
        this._isFinished = info.isFinished;
        this._currentPage = info.page;
        this._state = 'success';

        if (this.hasPendingLoadRequest) {
            this.hasPendingLoadRequest = false;
            this.loadNextPage()
        }
    }


    @computed
    get currentPage(): number {
        return this._currentPage || 0;
    }

    @computed
    get nextPage(): number {
        return Number(this.currentPage) + 1;
    }

    @computed
    get isFinished(): boolean {
        return this._isFinished || false;
    }

    @action
    loadNextPage() {
        if (this.isFinished) {
            return
        }
        if (this.isLoading) {
            this.hasPendingLoadRequest = true;
            return
        }

        return this.load(this._request, {page: this.nextPage})
    }

    @action
    loadFirstPage() {
        this.reset();
        return this.loadNextPage()
    }

    @computed
    get isFirstLoadInProgress() {
        return this.items.length === 0 && this.isLoading
    }

    @computed
    get isLoadMoreInProgress() {
        return this.items.length > 0 && this.isLoading
    }

    @action
    reset() {
        super.reset();
        this.items.clear();
        this._currentPage = undefined;
        this._isFinished = undefined;
    }

}