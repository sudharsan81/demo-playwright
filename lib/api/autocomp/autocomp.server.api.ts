import BaseApi from '../base/base.api';
import * as BaseApiTypes from  '../base/base.api.types';
import * as path from 'path';
import { readJsonFile } from '../../util/utils'

export default class AutocompServerAPI extends BaseApi {
    private path: string;
    private defaultPostRequestBody: any;
    private uri: any;

    constructor({baseURL = new URL('https://poc-assurance-savita.azurewebsites.net')} : {baseURL? : URL}) {
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

    async get({ uri }: { uri: string }) {
        this.uri = uri;

        return await this.apiRequestContext.post(this.uri, {
            headers: this.headers,
        });
    }

    async getResponseSchema({uri, verb, statusCode}) {
        try {
            const filePath = path.join(__dirname, '/autocomp.openapi.spec.json'); 
            const schema = await readJsonFile(filePath);
            return (schema.paths[uri].get.responses[statusCode].content['application/json'].schema);
          } catch (error) {
            console.error("Error getting schema:", error);
            throw error;
          }
    }
}