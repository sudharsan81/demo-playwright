import { test, expect } from '@playwright/test';
import AutocompServerAPI from '../lib/api/autocomp/autocomp.server.api';
import { Auth, AuthTypes } from '../lib/api/base/base.api.types';

import chai from 'chai';
import jsonSchema from 'chai-json-schema';

chai.use(jsonSchema);
const chaiExpect = chai.expect;

test('Autocomp Service - Read All Records', async () => {
    //  Test Preparation
    const auth: Auth = {
        authType: 'no-auth', // Autocomp Demo Server do not need any auth.
        credentials: null
    };
    const autocompServerApi =  new AutocompServerAPI({});
    await autocompServerApi.initialise({auth});
    
    // Perform the test
    const response = await autocompServerApi.post({
        uri: '/api/read_all_records',
    });

    // Assert status code
    expect(response.status()).toBe(200);

    // Read Response Body
    const responseBody = await response.json();

});

test('Autocomp Service - Read All Summary', async () => {
    //  Test Preparation
    const auth: Auth = {
        authType: 'no-auth', // Autocomp Demo Server do not need any auth.
        credentials: null
    };
    const autocompServerApi =  new AutocompServerAPI({});
    await autocompServerApi.initialise({auth});
    
    // Perform the test
    const response = await autocompServerApi.post({
        uri: '/api/read_all_summary',
    });

    // Assert status code
    expect(response.status()).toBe(200);

    // Read Response Body
    const responseBody = await response.json();
});


