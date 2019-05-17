import autobind from 'autobind-decorator';
import {toJS} from 'mobx';
import {observer} from 'mobx-react';
import * as React from 'react';
import {FlatList as RNFlatList, FlatListProps} from 'react-native';
import {ListResource} from '../../modules/resource/list/ListResource';
import {EmptyView} from '../empty/EmptyView';
import {LoadingView} from '../loading/LoadingView';
import {ErrorView} from '../error/ErrorView';

type EXFlatListProps<ItemType> = Partial<FlatListProps<ItemType>> & {
    resource?: ListResource<any, ItemType>
    /**
     * if resource require 'request' info to load you should set it before pass to
     * this component or set `autoLoad` prop to 'never' and call load method yourself
     */
    autoLoad?: 'always' | 'no-data' | 'never'
    emptyMessage?: string
    renderItem: (row: { item: ItemType, index: number }) => React.ReactElement<any>
    ListErrorComponent?: React.ComponentClass<{ resource: ListResource<any, ItemType>, style? }>
    ListEmptyComponent?: React.ComponentClass<{ resource: ListResource<any, ItemType>, style? }>
    ListLoadingComponent?: React.ComponentClass<{ resource: ListResource<any, ItemType>, style? }>
    ListLoadingMoreComponent?: React.ComponentClass<{ resource: ListResource<any, ItemType> }>
};

@observer
export class FlatList<ItemType> extends React.Component<EXFlatListProps<ItemType>> {

    static defaultProps = {
        ListErrorComponent: ErrorView,
        ListEmptyComponent: EmptyView,
        ListLoadingComponent: LoadingView,
        ListLoadingMoreComponent: LoadingView,
        autoLoad: 'no-data'
    };

    componentDidMount() {
        let autoLoad = this.props.autoLoad;
        let res = this.props.resource;
        if (!res) {
            return;
        }
        // do nothing if loading already in progress
        if (res.isLoading) {
            return;
        }
        if (autoLoad === 'always') {
            res.loadFirstPage()
        } else if (autoLoad === 'no-data' && !res.isSuccess) {
            res.loadFirstPage()
        }
    }

    render() {
        let {
            style,
            ListErrorComponent,
            ListLoadingComponent,
            ListLoadingMoreComponent,
            ListEmptyComponent,
            resource,
            ...listProps
        } = this.props;

        if (resource && resource.isError && resource.items.length === 0) {
            if (ListErrorComponent) {
                return <ListErrorComponent resource={resource} style={style}/>;
            }
        }
        if (resource && resource.isSuccess && resource.items.length === 0) {
            if (ListEmptyComponent) {
                return <ListEmptyComponent resource={resource} style={style}/>
            }
        }

        if (resource && resource.isFirstLoadInProgress) {
            if (ListLoadingComponent) {
                return <ListLoadingComponent resource={resource} style={style}/>
            }
        }

        return (
            <RNFlatList
                style={[{flex: 1}, style]}
                contentContainerStyle={{
                    flexGrow: 1
                }}
                ListFooterComponent={
                    resource && resource.isLoadMoreInProgress && ListLoadingMoreComponent ?
                        <ListLoadingMoreComponent resource={resource}/>
                        : undefined}
                keyExtractor={this.keyExtractor}
                data={resource ? toJS(resource.items) : []}
                refreshing={resource ? resource.isFirstLoadInProgress : undefined}
                onRefresh={resource ? this.onRefresh : undefined}
                onEndReached={resource ? this.onEndReached : undefined}
                onEndReachedThreshold={resource ? .7 : undefined}
                {...listProps}
            />
        );
    }

    @autobind
    protected keyExtractor(item, index) {
        return 'item-' + (item.id || index);
    }

    @autobind
    protected onEndReached() {
        if (this.props.resource) {
            this.props.resource.loadNextPage();
        }
    }

    @autobind
    protected onRefresh() {
        if (this.props.resource) {
            this.props.resource.loadFirstPage();
        }
    }


}