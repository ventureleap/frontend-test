export interface ISettings {
    projectName: string;
    description: string;
    apiBaseUrl: string;
    authBaseUrl: string;
}

const createSettings = (): ISettings => {
    const authUrl = 'https://frontend-test.getsandbox.com';
    const baseUrl = '';
    return <ISettings>{
        projectName: 'Venture',
        description: '',
        apiBaseUrl: baseUrl,
        authBaseUrl: authUrl,
    };
};

const settings = createSettings();

export default settings;
