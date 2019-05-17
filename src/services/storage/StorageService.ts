import {BaseService} from '@shared';

export type InjectedStorageServiceProps = {
    $storage: StorageService
}

/**
 * todo implement this service
 */
export class StorageService extends BaseService {
    public static readonly NAME = '$storage';
    /**
     * use to detect witch key should be loaded on startup
     */
    public static readonly PREFIX = '$storage';


}

