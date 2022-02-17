import { TokenModel } from '../models';
const TOKEN_RESULT = 'TOKEN_RESULT';
import { cookieService } from '../services/cookieService';

export class StorageHelper {
    static setTokenResult(tokenModel: TokenModel) {
        localStorage.setItem(TOKEN_RESULT, JSON.stringify(tokenModel));
        const cookie = new cookieService();
        cookie.set('sessionId', tokenModel.session, { secure: true, sameSite: 'none' });
    }

    static onSignOut() {
        localStorage.removeItem(TOKEN_RESULT);
        const cookie = new cookieService();
        cookie.remove('sessionId');
    }

    static tryGetTokenResult(): Promise<TokenModel | null> {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await localStorage.getItem(TOKEN_RESULT);
                if (res !== null) {
                    resolve(<TokenModel>JSON.parse(res));
                } else {
                    resolve(null);
                }
            } catch (err) {
                reject(err);
            }
        });
    }
}
