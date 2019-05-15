import {DIInject, FlatList, ListResource, MultiBackHandler, Screen} from '@shared';
import autobind from 'autobind-decorator';
import {toJS} from 'mobx';
import {observer} from 'mobx-react';
import React, {Component} from 'react';
import {Image, StyleSheet, Text} from 'react-native';
import {PopularPersonItem} from '../../models/PopularPersonResponse';
import {ApiService} from '../../services/api/ApiService';

type FameListComponentProps = {
    onBackPress: (count: number) => void | boolean | Promise<void>
    listResource: ListResource<{}, PopularPersonItem>
    $api: ApiService
}

@observer
export class FameListComponent extends Component<FameListComponentProps> {
    render() {
        let items = toJS(this.props.listResource.items) || [];
        if (items.length) {
            let sheldonCooper: PopularPersonItem = {
                profile_path: 'https://i.pinimg.com/originals/2e/29/c4/2e29c41787d04c4b3de4aa3832566357.jpg',
                adult: false,
                id: 'special',
                known_for: [],
                name: '',
                popularity: 0
            };
            // insert  sheldon cooper into 3 position
            items.splice(2, 0, sheldonCooper);
        }
        return (
            <Screen style={styles.container}>
                <FlatList
                    style={{
                        flex: 1
                    }}
                    contentContainerStyle={{
                        padding: '5%'
                    }}
                    resource={this.props.listResource}
                    data={items}
                    renderItem={this.renderItem}
                    removeClippedSubviews
                />

                <MultiBackHandler
                    timeout={500}
                    maxCount={2}
                    onPress={this.props.onBackPress}/>
            </Screen>
        )

    }

    @autobind
    renderItem({item, index}: { item: PopularPersonItem, index: number }) {
        return (
            <Image
                key={item.id}
                source={{uri: this.props.$api.resolveProfileImageUrl(item.profile_path)}}
                resizeMode={'cover'}
                style={{
                    marginBottom: 16,
                    width: '100%',
                    alignSelf: 'center',
                    height: 200,
                    backgroundColor: '#919191'
                }}
            />
        )
    }
}

const styles = StyleSheet.create({
    container: {}
});
