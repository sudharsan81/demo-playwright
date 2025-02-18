import BaseApi from '../base/base.api';
import * as BaseApiTypes from  '../base/base.api.types';

export default class EchoServerAPI extends BaseApi {
    private path: string;
    private defaultPostRequestBody: any;
    private uri: any;

    constructor({baseURL = new URL('https://postman-echo.com')} : {baseURL? : URL}) {
        super({ baseURL });
    }

    async initialise({ auth }: { auth: BaseApiTypes.Auth }): Promise<void> {
        await super.initialise({ auth });
    }

    async post({ uri, body }: { uri: string, body?: any }) {
        this.uri = uri;
        this.defaultPostRequestBody = {
            'foo': 'bar'
        };
        return await this.apiRequestContext.post(this.uri, {
            data: body,
            headers: this.headers,
        });
    }
}