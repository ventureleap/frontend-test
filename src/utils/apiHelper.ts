export async function createHeaders(): Promise<any> {
    const headers = <any>{};
    headers['Content-Type'] = 'application/json; charset=utf-8';
    headers['Content-Type'] = 'application/json';
    headers['set-cookie'] = true;
    headers['Access-Control-Allow-Origin'] = '*';
    headers['Access-Control-Allow-Headers'] = 'X-Requested-With';
    headers['Allow-Control-Allow-Origin'] = '*';
    headers['Access-Control-Allow-Methods'] = 'GET,POST,PUT,DELETE,PATCH,OPTIONS';
    headers['Access-Control-Allow-Credentials'] = true;
    return headers;
}
