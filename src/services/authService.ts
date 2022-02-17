import { LoginModel, RegisterModel } from '../models';
import * as apiHelper from '../utils/apiHelper';
import Axios from 'axios';
import settings from '../models/settings.model';
import { TokenResult } from '../models/result.model';

export class authService {
    async login(model: LoginModel): Promise<TokenResult> {
        const url: string = settings.authBaseUrl + '/users/login';
        const headers = await apiHelper.createHeaders();
        const body = { username: model.username, password: model.password };
        const response: any = await Axios.post(url, body, {
            withCredentials: true,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                mode: 'cors',
                'Set-Cookie': true,
            },
        });
        console.log(response, 'response axios.default0');
        console.log(response.headers, 'response axios.default');
        console.log(response.cookie, 'response axios.default2');
        return response;
    }

    async register(model: RegisterModel): Promise<any> {
        console.log(model, 'model');
        const url: string = settings.authBaseUrl + '/users';
        const headers = await apiHelper.createHeaders();
        const body = { username: model.firstName, password: model.password };
        const response: any = await Axios.post(url, body, { headers: headers });
        return response;
    }
}
