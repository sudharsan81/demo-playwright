import { test, expect } from '@playwright/test';
import EchoServerAPI from '../lib/api/echoServer/echo.server.api';
import { Auth, AuthTypes } from '../lib/api/base/base.api.types';
import { parseStringPromise } from 'xml2js';

test('Create a new resource calling endpoint with POST verb', async () => {
    const auth: Auth = {
        authType: 'no-auth', // Echo Server do not need any auth.
        credentials: null
    };

    const echoServerApi = new EchoServerAPI({});
    await echoServerApi.initialise({ auth });
    const xmlPayload = `
        <note>
            <to>Dave</to>
            <from>Joe</from>
            <body>Be Happy</body>
        </note>
    `;

    const response = await echoServerApi.post({
        uri: '/post',
        body:xmlPayload,
    });

    // Assert status code
    expect(response.status()).toBe(200);

    // Read Response Body
    const responseBody = await response.json();
    const receivedXml = responseBody.data;

    // Normalize both XML strings using xml2js
    const expectedXmlParsed = await parseStringPromise(xmlPayload.trim());
    const receivedXmlParsed = await parseStringPromise(receivedXml.trim());

    // Compare the parsed XML objects
    expect(receivedXmlParsed).toEqual(expectedXmlParsed);
});