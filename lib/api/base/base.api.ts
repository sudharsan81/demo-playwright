import { APIRequestContext, request } from "@playwright/test";
import { URL } from "url";

import * as BaseApiTypes from './base.api.types';

export default class BaseApi {
    protected baseURL: URL;
    protected url: URL;

    protected apiRequestContext: APIRequestContext;
    protected defaultHeaders: BaseApiTypes.Headers;
    protected headers: BaseApiTypes.Headers;
    protected queryParams: BaseApiTypes.QueryParams;

    protected auth: BaseApiTypes.Auth;

    constructor({baseURL = new URL('https://example.com')} : {baseURL? : URL}) {
        this.baseURL = new URL(baseURL); 

        this.defaultHeaders = {
            'Content-Type': 'application/xml'
        };
    }

    protected async initialise({ auth }: { auth: BaseApiTypes.Auth }) {
        this.auth = auth;
        this.headers = {
            ...this.defaultHeaders,
            ...this.buildAuthorizationHeader({auth})
        };
        this.apiRequestContext = await request.newContext({
            baseURL: this.baseURL.toString(),
            extraHTTPHeaders: this.headers,
        });
    }

    private buildAuthorizationHeader({auth}: {auth: BaseApiTypes.Auth}): BaseApiTypes.Headers {
        let authHeader: string | undefined;

        switch (auth.authType) {
            case 'basic-auth':
                if (auth.credentials && 'key' in auth.credentials && 'secret' in auth.credentials) {
                    const base64Credentials = btoa(`${auth.credentials.key}:${auth.credentials.secret}`);
                    authHeader = `Basic ${base64Credentials}`;
                }
                break;
            case 'bearer-token':
                if (auth.credentials && 'token' in auth.credentials) {
                    authHeader = `Bearer ${auth.credentials.token}`;
                }
                break;
            case 'no-auth':
                authHeader = undefined;
                break;
        }

        if (authHeader) {
            return { Authorization: authHeader };
        }

        return {};
    }
}
