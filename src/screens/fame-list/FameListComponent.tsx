import {FlatList, ListResource, MultiBackHandler, Screen} from '@shared';
import autobind from 'autobind-decorator';
import {toJS} from 'mobx';
import {observer} from 'mobx-react';
import React, {Component} from 'react';
import {Image, StyleSheet} from 'react-native';
import {FameItemModel} from '../../models/FameItemModel';

type FameListComponentProps = {
    onBackPress: (count: number) => void | boolean | Promise<void>
    listResource: ListResource<{}, FameItemModel>
}

@observer
export class FameListComponent extends Component<FameListComponentProps> {
    render() {
        let data = toJS(this.props.listResource.items) || [];
        let sheldonCooperIndex = data.findIndex(item => item.id === 'sheldon_cooper');
        if (sheldonCooperIndex >= 0) {
            let sheldonCooper = data[sheldonCooperIndex];
            // remove sheldon cooper from old position
            data.splice(sheldonCooperIndex, 1);
            // insert  sheldon cooper into 3 position
            data.splice(2, 0, sheldonCooper);
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
                    data={data}
                    renderItem={this.renderItem}
                />

                <MultiBackHandler
                    timeout={500}
                    maxCount={2}
                    onPress={this.props.onBackPress}/>
            </Screen>
        )

    }

    @autobind
    renderItem({item, index}: { item: FameItemModel, index: number }) {
        return (
            <Image
                key={index}
                source={{uri: item.photo}}
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
