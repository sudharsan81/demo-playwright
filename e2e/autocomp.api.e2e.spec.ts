import { test, expect } from '@playwright/test';
import AutocompServerAPI from '../lib/api/autocomp/autocomp.server.api';
import { Auth, AuthTypes } from '../lib/api/base/base.api.types';

import chai from 'chai';
import jsonSchema from 'chai-json-schema';

chai.use(jsonSchema);
const chaiExpect = chai.expect;

test('Autocomp Service - Read All Records', async () => {
    const auth: Auth = {
        authType: 'no-auth', // Autocomp Demo Server do not need any auth.
        credentials: null
    };

    const autocompServerApi =  new AutocompServerAPI({});
    await autocompServerApi.initialise({auth});
    
    const response = await autocompServerApi.post({
        uri: '/api/read_all_records',
    });

    // Assert status code
    expect(response.status()).toBe(200);

    // Read Response Body
    const responseBody = await response.json();

    // Validate Response body schema
    const schema = await autocompServerApi.getResponseSchema(
        {
            uri: '/read_all_records',
            verb: 'get',
            statusCode: 200
        }
    );

    chaiExpect(responseBody).to.be.jsonSchema(schema);
});

test('Autocomp Service - Read All Summary', async () => {
    const auth: Auth = {
        authType: 'no-auth', // Autocomp Demo Server do not need any auth.
        credentials: null
    };

    const autocompServerApi =  new AutocompServerAPI({});
    await autocompServerApi.initialise({auth});
    
    const response = await autocompServerApi.post({
        uri: '/api/read_all_summary',
    });

    // Assert status code
    expect(response.status()).toBe(200);

    // Read Response Body
    const responseBody = await response.json();
});


