import { Page, expect } from '@playwright/test';
import { link } from 'fs';

// This Page Object Model (POM) class represents https://wwwviewautocomp.z33.web.core.windows.net/index.html

export default class HomePage {
    private page: Page;
    private url: string;

    constructor({page, url = 'https://wwwviewautocomp.z33.web.core.windows.net/index.html'} : {page: Page; url?: string}) {
        this.page = page;
        this.url = url;
    }

    // Locators
    private get vodafoneLogo() {
        return this.page.locator('img.vodafone-logo');
    }

    private get pageHeaders() {
        return {
            div: this.page.locator('div.header'),
            link: 'a[href="index.html"]',
            logo: 'img.home-logo',
        }
    }

    private get pageFooters() {
        return {
            copyrightText: 'p:has-text("© 2024 Vodafone")'
        }
    }

    // Actions
    async open() {
        await this.page.goto(this.url);
        await this.page.waitForLoadState();
    }

    async openServiceId({id}) {
        await this.page.locator(`span.clickable:has-text("${id}")`).click();
    }

    // Assertions

    async verifyHeaderIsVisible() {
        const pageHeaders = this.pageHeaders;
        const { div, link, logo} = pageHeaders;

        const homeLink = div.locator(link);
        const homeLogo = div.locator(logo);

        await expect(homeLink).toBeDefined();
        await expect(homeLogo).toBeDefined();
        await expect(this.page.getByText('Compensation Details')).toBeDefined();
    }

    async verifyFooterIsVisible() {
        const pageFooters = this.pageFooters;
        await expect(await this.page.locator(pageFooters.copyrightText)).toBeDefined();

    }
}