import autobind from 'autobind-decorator';
import {action, computed, IObservableArray, observable} from 'mobx';
import {BaseResource} from '../base/BaseResource';


export type ListResourceDataType<ItemType> = {
    items: Array<ItemType>,
    page: number,
    isFinished: boolean,
    message?: string
}

export type ListResourceLoaderType<ReqType, ItemType> = (req: ReqType, meta: { page: number }) => Promise<ListResourceDataType<ItemType>>;

/**
 * use can use this class to convert any async task to stateful ListResource so can be paginated
 * fo example convert an api call to ListResource so can be use in FlatList
 */
@autobind
export class ListResource<ReqType, ItemType, ErrorType = any>
    extends BaseResource <ReqType, ListResourceDataType<ItemType>, ErrorType, { page: number }, ListResource<ReqType, ItemType, ErrorType>> {

    static form<ReqType, ItemType, ErrorType = any>(loader: ListResourceLoaderType<ReqType, ItemType>) {
        return new ListResource<ReqType, ItemType, ErrorType>(loader);
    }

    constructor(loader: (req: ReqType, meta: { page: number }) => Promise<ListResourceDataType<ItemType>>) {
        super(loader)
    }

    public readonly items: IObservableArray<ItemType> = observable.array([], {deep: false});

    @observable
    protected _page?: number;

    @observable
    protected _isFinished?: boolean;

    protected pendingLoadRequest?: (self: ListResource<ReqType, ItemType, ErrorType>) => void;

    @action
    notifySuccess(info: ListResourceDataType<ItemType>) {
        if (!info) {
            return;
        }
        if (info.items && info.items.length > 0) {
            this.items.push(...info.items)
        }
        this._isFinished = info.isFinished;
        this._page = info.page;
        this._state = 'success';

        if (this.pendingLoadRequest) {
            this.loadNextPage().then(self => this.pendingLoadRequest && this.pendingLoadRequest(self))
        }
    }


    /**
     * last loaded page
     */
    @computed
    get page(): number {
        return this._page || 0;
    }

    /**
     * next page to be loaded
     * @see ListResource#isFinished
     */
    @computed
    get nextPage(): number {
        return Number(this.page) + 1;
    }

    /**
     * last paged was loaded and there is no more page available.
     */
    @computed
    get isFinished(): boolean {
        return this._isFinished || false;
    }

    @action
    loadNextPage(): Promise<ListResource<ReqType, ItemType, ErrorType>> {
        if (this.isFinished) {
            return Promise.resolve(this)
        }
        if (this.isLoading) {
            return new Promise(resolve => {
                this.pendingLoadRequest = resolve
            });
        }

        super.setMeta({page: this.nextPage});
        return super.load()
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

    /**
     * clear list items & reset all state
     */
    @action
    reset() {
        super.reset();
        this.items.clear();
        this.pendingLoadRequest = undefined;
        this._page = undefined;
        this._isFinished = undefined;
    }


    get message() {
        return super.response ? super.response.message : undefined
    }

}