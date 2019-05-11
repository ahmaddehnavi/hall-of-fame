import {BaseService, Resource} from '@shared';
import {ADFetchClient, ADPrepareRequestInterceptor, ADRequest, ADRest, Chain, StatusCheckerHttpInterceptor} from 'ad-http';
import {ADRequestOptions, DefaultRequestConfigType} from 'ad-http/build/ADRequest';
import ADBaseUrlHttpInterceptor from 'ad-http/build/interceptors/ADBaseUrlHttpInterceptor';
import autobind from 'autobind-decorator';

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
         */
        this.http = new ADRest<Response>(new ADFetchClient());

        this.http.interceptors.push(new ADBaseUrlHttpInterceptor('https://raw.githubusercontent.com/ahmaddehnavi/json/master/'));
        this.http.interceptors.push({
            name: 'add-token',
            intercept(chain: Chain<Response, DefaultRequestConfigType>) {
                let newReq = chain.request.edit()
                    .header('test', 'test-token')
                    .build();
                return chain.proceed(newReq);
            }
        });

        this.http.interceptors.push({
            name: 'api-error-handling',
            async intercept(chain: Chain<Response, DefaultRequestConfigType>) {
                let response = await chain.proceed();
                // can check body for error (ex: check can be parsed to json)
                return response;
            }
        });

        // should be after all request change
        this.http.interceptors.push(new ADPrepareRequestInterceptor());

        this.http.interceptors.push(new StatusCheckerHttpInterceptor({
            isValid: (status) => status >= 200 && status < 300
        }))

    }

    protected fetch<T>(req: ADRequestOptions<DefaultRequestConfigType>) {
        return this.http.process(req)
            .then(res => res.body())
            .then(body => body.json()
        )
    }

    //////////////////////////////////////////////////////////
    //                                                      //
    //               define new api here                   //
    //                                                      //
    //////////////////////////////////////////////////////////


    getFameList() {
        return this.fetch(ADRequest.get('test-list'))
    }

    public fameListApi = Resource.form(() => this.getFameList())
}

