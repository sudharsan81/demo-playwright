import { Page, expect } from '@playwright/test';

// This Page Object Model (POM) class represents https://wwwviewautocomp.z33.web.core.windows.net/index.html

export default class DetailedServicePage {
    private page: Page;
    private url: string;

    constructor({page} : {page: Page}) {
        this.page = page;
    }

    // Locators
    private get vodafoneLogo() {
        return this.page.locator('img.vodafone-logo');
    }

    // Actions
    async openServiceId({id}) {
        await this.page.locator(`span.clickable:has-text("${id}")`).click();
    }

    // Util functons
    async verifyVodafoneLogoExists() {
        await expect(this.vodafoneLogo).toBeVisible();
    }

}