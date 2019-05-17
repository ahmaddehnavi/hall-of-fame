import {BaseService} from '@shared';
import autobind from 'autobind-decorator';
import {action} from 'mobx';


export type InjectedAuthServiceProps = {
    $auth: AuthService
}

@autobind
export class AuthService extends BaseService {
    public static readonly NAME = '$auth';

    protected static readonly AUTH_REFRESH_TOKEN_KEY = '$auth/refresh-token';
    protected static readonly AUTH_ACCESS_TOKEN_KEY = '$auth/access-token';

    onStart() {
    }

    @action
    login(tokens: { accessToken: string, refreshToken: string }) {
    }

    @action
    logout() {
    }

}
