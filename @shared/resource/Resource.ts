import autobind from 'autobind-decorator';
import {BaseResource} from './BaseResource';

export type ResourceDataType<DataType> = {
    data: DataType,
    message?: string
}
type Loader<ReqType, DataType> = (req: ReqType) => Promise<ResourceDataType<DataType>>

@autobind
export class Resource<ReqType, DataType, ErrorType = any>
    extends BaseResource <ReqType, ResourceDataType<DataType>, ErrorType, undefined, Resource<ReqType, DataType, ErrorType>> {

    static form<ReqType, DataType, ErrorType = any>(loader: Loader<ReqType, DataType>) {
        return new Resource<ReqType, DataType, ErrorType>(loader);
    }

    constructor(loader: Loader<ReqType, DataType>) {
        super(loader);
        super.init(this);
    }

    async load(req: ReqType) {
        return super.load(req, undefined);
    }

    get data() {
        return super.response ? super.response.data : undefined;
    }
}
