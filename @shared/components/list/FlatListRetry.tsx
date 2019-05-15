import {Button, Col,} from '@shared';
import {observer} from 'mobx-react';
import * as React from 'react';
import {StyleSheet, Text} from 'react-native';
import {BaseResource} from '../../resource/BaseResource';

type ADFlatListRetryProps = { resource: BaseResource<any, any>, style? };

@observer
export class FlatListRetry extends React.Component<ADFlatListRetryProps> {
    render() {
        let {resource} = this.props;
        if (!resource.isError) {
            return false
        }

        return (
            <Col style={styles.container}>
                <Text style={{textAlign: 'center', margin: 16}}>
                    {String(resource.error.message || resource.error)}
                </Text>
                <Button
                    filled
                    accent
                    title={'retry'}
                    onPress={resource.reload}/>
            </Col>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(255,255,255,.5)',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    }
});