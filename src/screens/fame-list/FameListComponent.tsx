import {FlatList, ListResource, Screen} from '@shared';
import autobind from 'autobind-decorator';
import {toJS} from 'mobx';
import {observer} from 'mobx-react';
import React, {Component} from 'react';
import {Image, StyleSheet} from 'react-native';
import {PopularPersonItemType} from '../../services/api/models/PopularPersonResponseType';

type FameListComponentProps = {
    listResource: ListResource<{}, PopularPersonItemType>
    resolveProfileImageUrl: (path: string) => string
}

@observer
export class FameListComponent extends Component<FameListComponentProps> {
    render() {
        let items = toJS(this.props.listResource.items) || [];
        if (items.length) {
            let sheldonCooper: PopularPersonItemType = {
                profile_path: 'https://i.pinimg.com/originals/2e/29/c4/2e29c41787d04c4b3de4aa3832566357.jpg',
                adult: false,
                id: 'special',
                known_for: [],
                name: '',
                popularity: 0
            };
            // insert  sheldon cooper into 3 position
            items.splice(Math.min(2, items.length), 0, sheldonCooper);
        }
        return (
            <Screen style={styles.container}>
                <FlatList
                    style={{
                        flex: 1
                    }}
                    contentContainerStyle={{
                        flexGrow: 1
                    }}
                    resource={this.props.listResource}
                    data={items}
                    renderItem={this.renderItem}
                    removeClippedSubviews
                />
            </Screen>
        )

    }

    @autobind
    renderItem({item, index}: { item: PopularPersonItemType, index: number }) {
        return (
            <Image
                key={item.id}
                source={{uri: this.props.resolveProfileImageUrl(item.profile_path)}}
                resizeMode={'cover'}
                style={styles.image}
            />
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
