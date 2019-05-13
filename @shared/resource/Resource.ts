import autobind from 'autobind-decorator';
import {BaseResource} from './BaseResource';

@autobind
export class Resource<ReqType, DataType, ErrorType = any>
    extends BaseResource <ReqType, DataType, ErrorType, undefined> {

    static form<ReqType, DataType, ErrorType = any>(loader: (req: ReqType) => Promise<DataType>) {
        return new Resource<ReqType, DataType, ErrorType>(loader);
    }

    async load(req: ReqType): Promise<void> {
        return super.load(req, undefined);
    }
}
