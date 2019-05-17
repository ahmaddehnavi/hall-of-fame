import {Resource} from '@shared';
import {observer} from 'mobx-react';
import * as React from 'react';
import {StyleProp, UIManager, ViewProps, ViewStyle} from 'react-native';
import {View} from 'react-native-animatable';
import {ErrorView} from '../error/ErrorView';
import {LoadingView} from '../loading/LoadingView';

type ComponentWithProps<Req, DataType> = React.ComponentType<{ resource: Resource<Req, DataType>, style?: StyleProp<ViewStyle> }>
type AsyncViewProps<Req, DataType> = Partial<ViewProps> & {
    /**
     * if resource require 'request' info to load you should set it before pass to
     * this component or set `autoLoad` prop to 'never' and call load method yourself
     */
    autoLoad?: 'always' | 'no-data' | 'never'
    resource: Resource<Req, DataType>
    ErrorComponent?: ComponentWithProps<Req, DataType>
    LoadingComponent?: ComponentWithProps<Req, DataType>
    SuccessComponent?: ComponentWithProps<Req, DataType>
    children?: ComponentWithProps<Req, DataType> | ((res: Resource<Req, DataType>) => React.ReactNode)
};

@observer
export class AsyncView<Req, DataType> extends React.Component<AsyncViewProps<Req, DataType>> {

    static defaultProps = {
        ErrorComponent: ErrorView,
        LoadingComponent: LoadingView,
        autoLoad: 'no-data'
    };

    componentDidMount() {
        let autoLoad = this.props.autoLoad;
        let res = this.props.resource;
        // do nothing if loading already in progress
        if (res.isLoading) {
            return;
        }
        if (autoLoad === 'always') {
            this.props.resource.load()
        } else if (autoLoad === 'no-data' && !res.isSuccess) {
            this.props.resource.load()
        }
    }

    render() {
        let {
            style,
            ErrorComponent,
            LoadingComponent,
            SuccessComponent,
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

        if (SuccessComponent) {
            return <SuccessComponent
                resource={resource}
                style={style}
                children={this.props.children}/>
        }
        return (
            this.props.children || false
        );
    }

}