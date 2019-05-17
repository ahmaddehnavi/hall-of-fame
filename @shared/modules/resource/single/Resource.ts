import autobind from 'autobind-decorator';
import {BaseResource} from '../base/BaseResource';

export type ResourceDataType<DataType> = {
    data: DataType,
    message?: string
}
type Loader<ReqType, DataType> = (req: ReqType) => Promise<ResourceDataType<DataType>>

/**
 * use can use this class to convert any async task to stateful Resource
 * fo example convert an api call to resource
 */
@autobind
export class Resource<ReqType, DataType, ErrorType = any>
    extends BaseResource <ReqType, ResourceDataType<DataType>, ErrorType, undefined, Resource<ReqType, DataType, ErrorType>> {

    static form<ReqType = any, DataType = any, ErrorType = any>(loader: Loader<ReqType, DataType>) {
        return new Resource<ReqType, DataType, ErrorType>(loader);
    }

    constructor(loader: Loader<ReqType, DataType>) {
        super(loader);
        super.setChildInstance(this);
    }

    async load(req: ReqType = super._request) {
        return super.load(req, undefined);
    }

    get data() {
        return super.response ? super.response.data : undefined;
    }

    get message() {
        return super.response ? super.response.message : undefined
    }
}
