import {BaseResource, Row} from '@shared';
import * as React from 'react';
import {Text} from 'react-native';

export class EmptyView extends React.Component<{ style?, message: string }> {
    render() {
        return (
            <Row style={{
                backgroundColor: 'rgba(255,255,255,.5)',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
            }}>
                <Text>
                    {
                        this.props.message || 'No Items!'
                    }
                </Text>
            </Row>
        )
    }
}