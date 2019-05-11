import {Col, MultiBackHandler, Resource, Screen} from '@shared';
import autobind from 'autobind-decorator';
import {observer} from 'mobx-react';
import React, {Component} from 'react';
import {FlatList, Text, StyleSheet, Image} from 'react-native';
import {FameItemModel} from '../../models/FameItemModel';

type FameListComponentProps = {
    onBackPress: (count: number) => void | boolean | Promise<void>
    listResource: Resource<Array<FameItemModel>>
}

@observer
export class FameListComponent extends Component<FameListComponentProps> {
    render() {
        let data = this.props.listResource.data || [];
        return (
            <Screen style={styles.container}>
                <FlatList
                    style={{
                        flex: 1
                    }}
                    contentContainerStyle={{
                        padding: '5%'
                    }}
                    data={data}
                    renderItem={this.renderItem}
                />
                {
                    this.props.listResource.isError &&
                    <Col style={{
                        backgroundColor: 'rgba(255,255,255,.5)',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Text>
                            {this.props.listResource.error}
                        </Text>
                    </Col>
                }
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
