import Cookie from 'universal-cookie';

const cookie = new Cookie();

export class cookieService {
    async get(key: string): Promise<any> {
        cookie.get(key);
    }

    async set(key: string, value: string, options?: any): Promise<any> {
        cookie.set(key, value, options);
    }

    remove(key: string) {
        cookie.remove(key);
    }
}
