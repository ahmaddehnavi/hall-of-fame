import {Button, Col, ListResource, Resource,} from '@shared';
import {observer} from 'mobx-react';
import * as React from 'react';
import {StyleProp, StyleSheet, Text, ViewStyle} from 'react-native';
import {BaseResource} from '../../modules/resource/base/BaseResource';

type ADFlatListRetryProps = {
    resource?: BaseResource<any, any> | Resource<any, any> | ListResource<any, any>,
    /**
     * if not set use resource#reload
     */
    onRetryPress?: () => void
    /**
     * if not set use resource#message
     */
    message?: string,
    style?: StyleProp<ViewStyle>
}

@observer
export class ErrorView extends React.Component<ADFlatListRetryProps> {

    get message() {

        if (this.props.message) {
            return this.props.message
        }

        let res = this.props.resource;
        if (res) {
            if (res instanceof ListResource || res instanceof Resource) {
                if (res.isError) {
                    return res.error.message || String(res.error);
                }
                return res.message
            }
        }

        return undefined
    }

    render() {
        let {resource} = this.props;
        if (resource && !resource.isError) {
            return false
        }

        return (
            <Col style={[styles.container, this.props.style]}>
                <Text style={{textAlign: 'center', margin: 16}}>
                    {this.message}
                </Text>
                {
                    !!(this.props.onRetryPress || resource) && (
                        <Button
                            filled
                            accent
                            title={'retry'}
                            onPress={this.props.onRetryPress || (resource ? resource.reload : undefined)}/>
                    )
                }
            </Col>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: 1,
    }
});