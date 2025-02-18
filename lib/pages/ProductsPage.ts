import { Page, expect } from '@playwright/test'

export default class ProductsPage {
    private page: Page

    constructor({ page }: { page: Page }) {
        this.page = page
        this.performDefaultAssertions()
    }

    // Actions
    async isRendered(): Promise<boolean> {
        return this.pageHeader.isVisible()
    }

    async addItemToCart(index: number = 0) {
        // Add the first product to cart by default (or specify index)
        await this.addToCartButtons.nth(index).click()
    }

    async viewCart() {
        await this.cartIcon.click()
    }
    get productItems() {
        return this.page.locator('.inventory_item') // Selects all product items
    }

    // Locators
    private get burgerMenu() {
        return this.page.locator('#react-burger-menu-btn')
    }

    private get cartIcon() {
        return this.page.locator('[data-test="shopping-cart-link"]')
    }

    private get pageHeader() {
        return this.page.locator('.inventory_list')
    }

    private get addToCartButtons() {
        return this.page.locator('.btn_primary')
    }

    private get cartBadge() {
        return this.page.locator('.shopping_cart_badge')
    }

    async getCartCount(): Promise<number> {
        const countText = await this.cartBadge.textContent()
        return countText ? parseInt(countText) : 0
    }

    // Default assertions
    private async performDefaultAssertions() {
        expect(await this.cartIcon).toBeVisible()
        expect(await this.pageHeader).toBeVisible()
    }
}
