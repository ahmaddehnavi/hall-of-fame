import {Row} from '@shared';
import * as React from 'react';
import {ActivityIndicator, Text} from 'react-native';

export class FlatListLoading extends React.Component<{ style? }> {

    render() {
        return (
            <Row style={{
                backgroundColor: 'rgba(255,255,255,.5)',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
            }}>
                <ActivityIndicator size={'small'}/>
                <Text style={{marginStart: 8}}>
                    Loading...
                </Text>
            </Row>
        )
    }
}