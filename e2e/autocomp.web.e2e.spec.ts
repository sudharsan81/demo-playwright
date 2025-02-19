import { test, expect } from '@playwright/test';

import HomePage from '../lib/pages/autocomp/HomePage';
import DetailedServicePage from '../lib/pages/autocomp/DetailedServicePage';

let homePage: HomePage;
let detailedServicePage: DetailedServicePage;

test('Open Home page', async ({page}) => {
    // 1. Initialise POM for the home page
    homePage = new HomePage({ page });

    // 2. Performt the test
    await homePage.open();

    // Open the detailed page for the service Id VFC1234567
    await homePage.openServiceId({ id: 'VFC1234567'});
    detailedServicePage = new DetailedServicePage({page})

    // Assert Header and Footer for Legal Compliance
    await homePage.verifyHeaderIsVisible();
    await homePage.verifyFooterIsVisible();

    // Test cleanp
    await page.close();
});

test('View Detailed report page', async ({page}) => {
    // 1. Initialise POM for the home page
    homePage = new HomePage({ page });
    await homePage.open();

    // 2. Performt the test
    // Open the detailed page for the service Id VFC1234567
    await homePage.openServiceId({ id: 'VFC1234567'});
    detailedServicePage = new DetailedServicePage({page});

    // Test cleanp
    await page.close();
});