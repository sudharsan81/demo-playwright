import { test, expect } from '@playwright/test';

import HomePage from '../lib/pages/autocomp/HomePage';
import DetailedServicePage from '../lib/pages/autocomp/DetailedServicePage';

let homePage: HomePage;
let detailedServicePage: DetailedServicePage;

test('Open Home page', async ({page}) => {
    // Prepare for the test
    homePage = new HomePage({ page });

    // Performt the test
    await homePage.open();

    // Assert Header and Footer for Legal Compliance
    await homePage.verifyHeaderIsVisible();
    await homePage.verifyFooterIsVisible();

    // Test cleanp
    await page.close();
});

test('View Detailed report page', async ({page}) => {
    // Prepare for the test
    homePage = new HomePage({ page });
    await homePage.open();

    // Performt the test
    // Open the detailed page for the service Id VFC1234567
    await homePage.openServiceId({ id: 'VFC1234567'});
    detailedServicePage = new DetailedServicePage({page});

    // Test cleanp
    await page.close();
});