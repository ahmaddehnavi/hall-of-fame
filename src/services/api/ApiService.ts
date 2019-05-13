import {BaseService, ListResource, ListResourceDataType} from '@shared';
import {ADFetchClient, ADPrepareRequestInterceptor, ADRequest, ADRest, Chain, StatusCheckerHttpInterceptor} from 'ad-http';
import {DefaultRequestConfigType} from 'ad-http/build/ADRequest';
import ADResponseParseError from 'ad-http/build/error/ADResponseParseError';
import ADBaseUrlHttpInterceptor from 'ad-http/build/interceptors/ADBaseUrlHttpInterceptor';
import autobind from 'autobind-decorator';
import {FameItemModel} from '../../models/FameItemModel';

export type InjectedApiServiceProps = {
    $api: ApiService
}

@autobind
export class ApiService extends BaseService {
    public static readonly NAME = '$api';
    protected http: ADRest<Response>;

    $init(config: {}) {
        super.$init(config);

        /**
         * all interceptors from first to last can modify request
         * after last interceptor proceed , rest make request
         * and all interceptors from last to first can handle or modify response
         * then rest.process() resolve to modified response
         *
         * if you want throw any error from interceptors error should be extend ADHttpError
         */
        this.http = new ADRest<Response | any>(new ADFetchClient());


        // check for http status error
        this.http.interceptors.push(new StatusCheckerHttpInterceptor({
            isValid: (status) => status >= 200 && status < 300
        }));


        // if request use relative address then will be prefixed by this base url
        this.http.interceptors.push(new ADBaseUrlHttpInterceptor('https://api.myjson.com/bins/'));

        // modify request and add required headers
        this.http.interceptors.push({
            name: 'add-token',
            intercept(chain: Chain<Response, DefaultRequestConfigType>) {
                let newReq = chain.request.edit()
                    .build();
                return chain.proceed(newReq);
            }
        });

        // should be after all request change
        // fix some issue in request
        this.http.interceptors.push(new ADPrepareRequestInterceptor());

    }


    protected async fetch<T>(req: ADRequest): Promise<T> {
        try {
            let response = await this.http.process(req);
            let body = await response.body();
            return await body.json();
        } catch (e) {
            throw new ADResponseParseError('Error in parsing response.');
        }
    }


    protected async fetchList<T>(req: ADRequest): Promise<ListResourceDataType<T>> {
        try {
            let response = await this.http.process(req);
            let body = await response.body();
            let items = await body.json();
            return {
                items,
                isFinished: true, // todo use real value
                page: 1// todo use real value
            }
        } catch (e) {
            throw new ADResponseParseError('Error in parsing response.');
        }
    }
    
    //////////////////////////////////////////////////////////
    //                                                      //
    //               define new api here                   //
    //                                                      //
    //////////////////////////////////////////////////////////

    public fameListResource = ListResource.form<{}, FameItemModel>(async (req, {page}) => {
        // new ADRequest.Builder().url('test-list').build()
        return this.fetchList<FameItemModel>(ADRequest.get('https://api.myjson.com/bins/18pf6m'));
    })

}


