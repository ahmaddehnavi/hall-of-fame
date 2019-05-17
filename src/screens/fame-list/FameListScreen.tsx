import {DIInject, FlatList, INavigationService, InjectedNavigationServiceProps, MultiBackHandler, NavigationService, Screen} from '@shared';
import autobind from 'autobind-decorator';
import {observer} from 'mobx-react';
import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {ApiService, InjectedApiServiceProps} from '../../services/api/ApiService';
import {PopularPersonItemType} from '../../services/api/models/PopularPersonResponseType';
import {FameListScreenStore, InjectedFameListScreenStoreProps} from './FameListScreen.store';

type FameListScreenProps =
    InjectedNavigationServiceProps &
    InjectedFameListScreenStoreProps &
    InjectedApiServiceProps

@DIInject(NavigationService.NAME, ApiService.NAME, FameListScreenStore.NAME)
@observer
export class FameListScreen extends React.Component<FameListScreenProps> {
    static readonly ROUTE_NAME = 'FameListScreen';

    static start(nav: INavigationService) {
        nav.navigate(this.ROUTE_NAME);
    }

    static resetTo(nav: INavigationService) {
        nav.reset(this.ROUTE_NAME);
    }

    @autobind
    renderItem({item, index}: { item: PopularPersonItemType, index: number }) {
        return (
            <Image
                key={item.id}
                source={{uri: this.props.$api.resolveProfileImageUrl(item.profile_path)}}
                resizeMode={'cover'}
                style={styles.image}
            />
        )
    }

    render() {
        return (
            <Screen style={styles.container}>
                <FlatList
                    style={{
                        flex: 1
                    }}
                    contentContainerStyle={{
                        flexGrow: 1
                    }}
                    resource={this.props.$fameListStore.popularListResource}
                    data={this.props.$fameListStore.items}
                    renderItem={this.renderItem}
                    removeClippedSubviews
                />
                <MultiBackHandler
                    timeout={500}
                    maxCount={2}
                    onPress={this.props.$fameListStore.handleBackPress}/>
            </Screen>
        )
    }


}


const styles = StyleSheet.create({
    container: {},
    image: {
        marginBottom: 16,
        marginHorizontal: '5%',
        width: '100%',
        alignSelf: 'center',
        height: 200,
        backgroundColor: '#919191'
    }
});
