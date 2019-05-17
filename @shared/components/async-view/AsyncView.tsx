import {Resource} from '@shared';
import {observer} from 'mobx-react';
import * as React from 'react';
import {StyleProp, ViewProps, ViewStyle} from 'react-native';
import {View} from 'react-native-animatable';
import {ErrorView} from '../error/ErrorView';
import {LoadingView} from '../loading/LoadingView';

type ComponentWithProps<Req, DataType> = React.ComponentType<{ resource: Resource<Req, DataType>, style?: StyleProp<ViewStyle> }>
type AsyncViewProps<Req, DataType> = Partial<ViewProps> & {
    resource: Resource<Req, DataType>
    ErrorComponent?: ComponentWithProps<Req, DataType>
    LoadingComponent?: ComponentWithProps<Req, DataType>
    children?: ComponentWithProps<Req, DataType> | ((res: Resource<Req, DataType>) => React.ReactNode)
};

@observer
export class AsyncView<Req, DataType> extends React.Component<AsyncViewProps<Req, DataType>> {

    static defaultProps = {
        ErrorComponent: ErrorView,
        LoadingComponent: LoadingView,
    };

    render() {
        let {
            style,
            ErrorComponent,
            LoadingComponent,
            resource,
            ...otherProps
        } = this.props;

        if (resource.isLoading && LoadingComponent) {
            return (
                <LoadingComponent
                    style={style}
                    resource={resource}/>
            )
        }
        if (resource.isError && ErrorComponent) {
            return (
                <ErrorComponent
                    style={style}
                    resource={resource}/>
            )
        }

        return (
            <View
                style={[{flexGrow: 1}, style]}
                {...otherProps}
            />
        );
    }

}