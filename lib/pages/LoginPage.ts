import { Page, expect } from '@playwright/test'

// This Page Object Model represents the home page https://www.saucedemo.com/

export default class LoginPage {
    private page: Page
    private url: string

    constructor({ page, url = 'https://www.saucedemo.com/' }: { page: Page; url?: string }) {
        this.page = page
        this.url = url
        this.performDefaultAssertions()
    }

    // Locators
    private get usernameInput() {
        return this.page.locator('#user-name')
    }

    private get passwordInput() {
        return this.page.locator('#password')
    }

    private get loginButton() {
        return this.page.locator('#login-button')
    }

    // Behaviours
    async open() {
        await this.page.goto(this.url)
    }

    async login({ username, password }: { username: string; password: string }) {
        await this.usernameInput.fill(username)
        await this.passwordInput.fill(password)
        await this.loginButton.click()
    }

    // Default Assertions
    // Everytime, this page is loaded we test critical information are rendered
    private async performDefaultAssertions() {
        await expect(this.page).toHaveTitle('Swag Labs')
    }
}
