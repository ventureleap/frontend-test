import * as apiHelper from '../utils/apiHelper';
import Axios from 'axios';
import settings from '../models/settings.model';

export class applicationService {

    async getApplications(): Promise<any> {
        Axios.defaults.withCredentials = true;
        const url: string = settings.authBaseUrl + '/applications';
        const headers = await apiHelper.createHeaders();
        const response: any = await Axios.get(url, headers);
        return response;
    }

    async editApplication(body: any): Promise<any> {
        Axios.defaults.withCredentials = true;
        const url: string = settings.authBaseUrl + '/applications';
        const headers = await apiHelper.createHeaders();
        const response: any = await Axios.post(url, body, headers);
        return response;
    }

    async setApplication(body: any): Promise<any> {
        Axios.defaults.withCredentials = true;
        const url: string = settings.authBaseUrl + '/applications';
        const headers = await apiHelper.createHeaders();
        const response: any = await Axios.post(url, body, headers);
        return response;
    }

    async deleteApplication(id: string): Promise<any> {
        Axios.defaults.withCredentials = true;
        const url: string = settings.authBaseUrl + '/applications/' + id;
        const headers = await apiHelper.createHeaders();
        const response: any = await Axios.delete(url, headers);
        return response;
    }
}
