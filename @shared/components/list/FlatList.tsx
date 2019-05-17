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
    resource: ListResource<any, ItemType>
    autoLoad?: boolean
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
        autoLoad: true,
        ListErrorComponent: ErrorView,
        ListEmptyComponent: EmptyView,
        ListLoadingComponent: LoadingView,
        ListLoadingMoreComponent: LoadingView,
    };

    componentDidMount() {
        if (this.props.autoLoad) {
            this.props.resource.loadFirstPage();
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
        toJS(resource.isLoading);

        if (resource.isError && resource.items.length === 0) {
            if (ListErrorComponent) {
                return <ListErrorComponent resource={resource} style={style}/>;
            }
        }
        if (resource.isSuccess && resource.items.length === 0) {
            if (ListEmptyComponent) {
                return <ListEmptyComponent resource={resource} style={style}/>
            }
        }

        if (resource.isFirstLoadInProgress) {
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
                    resource.isLoadMoreInProgress && ListLoadingMoreComponent ?
                        <ListLoadingMoreComponent resource={resource}/>
                        : undefined}
                keyExtractor={this.keyExtractor}
                data={toJS(resource.items)}
                refreshing={resource.isFirstLoadInProgress}
                onRefresh={this.onRefresh}
                onEndReached={this.onEndReached}
                onEndReachedThreshold={.7}
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