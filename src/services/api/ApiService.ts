import {ArrayUtil, BaseService, ListResource, Resource, ResponsiveUtil} from '@shared';
import autobind from 'autobind-decorator';
import Axios, {AxiosInstance} from 'axios';
import {Config} from '../../Config';
import {ApiConfigurationType} from './models/ApiConfigurationType';
import {PopularPersonItemType, PopularPersonResponseType} from './models/PopularPersonResponseType';

export type InjectedApiServiceProps = {
    $api: ApiService
}

@autobind
export class ApiService extends BaseService {
    public static readonly NAME = '$api';

    protected http: AxiosInstance;


    constructor() {
        super();
        /*
         * create http instance with default configs
         */
        this.http = Axios.create({
            baseURL: Config.BASE_URL,
            params: {
                api_key: Config.API_KEY
            },
            validateStatus: status => (status >= 200 && status < 300),
            responseType: 'json',
        });

        // to configure jwt see axios document

    }


    protected resolveProfileImageUrlCache?: (url: string) => string;

    resolveProfileImageUrl(path: string, preferredSize = ResponsiveUtil.width) {
        if (!path || path.startsWith('http://') || path.startsWith('https://')) {
            return path;
        }

        if (this.resolveProfileImageUrlCache) {
            return this.resolveProfileImageUrlCache(path);
        }

        if (!this.resolveProfileImageUrlCache && this.Config.configuration.data) {
            let base = this.Config.configuration.data.images.secure_base_url;

            // find closed available size of profile image
            let sizes = this.Config.configuration.data.images.profile_sizes;
            let widths = sizes.filter(it => it.startsWith('w')).map(it => Number(it.substring(1)));
            let closestWidth = ArrayUtil.findClosestGreaterValue(widths, preferredSize);

            let size;
            if (closestWidth) {
                size = 'w' + closestWidth
            }

            let heights = sizes.filter(it => it.startsWith('h')).map(it => Number(it.substring(1)));
            let closestHeight = ArrayUtil.findClosestGreaterValue(heights, preferredSize);
            if (!closestWidth || (closestWidth < preferredSize && closestHeight > closestWidth)) {
                size = 'h' + closestHeight;
            }

            if (!size) {
                size = 'original';
            }

            this.resolveProfileImageUrlCache = (p) => base + size + p;
            return base + size + path
        }
        return path
    }

    // ----------------------------------------------------------------------------------------------------------
    //////////////////////////////////////////////////////////
    //                                                      //
    //               define new api here                    //
    //                                                      //
    //////////////////////////////////////////////////////////


    public readonly Config = {
        configuration: Resource.form<never, ApiConfigurationType>(async (req) => {
            let res = await this.http.get<ApiConfigurationType>('/configuration');
            return {
                data: res.data,
                message: res.statusText
            }
        })
    };

    // ----------------------------------------------------------------------------------------------------------

    public readonly Person = {
        popularList: ListResource.form<{}, PopularPersonItemType>(async (req, {page}) => {
            let res = await this.http.get<PopularPersonResponseType>('/person/popular', {params: {page}});
            return {
                items: res.data.results,
                message: res.statusText,
                page: res.data.page,
                isFinished: res.data.page >= res.data.total_pages
            }
        })
    }

    // ----------------------------------------------------------------------------------------------------------


}


