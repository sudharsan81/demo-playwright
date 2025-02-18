import { test, expect } from '@playwright/test';
import EchoServerAPI from '../lib/api/echoServer/echo.server.api';
import { Auth, AuthTypes } from '../lib/api/base/base.api.types';

test('Create a new resource calling endpoint with POST verb', async () => {
    const auth: Auth = {
        authType: 'no-auth', // Echo Server do not need any auth.
        credentials: null
    };

    const echoServerApi = new EchoServerAPI({});
    await echoServerApi.initialise({ auth });

    const response = await echoServerApi.post({
        uri: '/post',
        body: {
            foo: 100
        }
    });

    // Assert status code
    expect(response.status()).toBe(200);

    // Assert response body
    const responseBody = await response.json();
    expect(responseBody.json).toEqual({
        foo: 100
    });
    expect(responseBody.data).toEqual({
        foo: 100
    });
});