import { test, expect } from '@playwright/test'
import LoginPage from '../lib/pages/LoginPage'
import ProductsPage from '../lib/pages/ProductsPage'

test.describe('Products Page', () => {
    let loginPage: LoginPage
    let productsPage: ProductsPage

    test.beforeEach(async ({ page }) => {
        // Initialize page objects
        loginPage = new LoginPage({ page })
        productsPage = new ProductsPage({ page })

        // Perform login
        await loginPage.open()
        await loginPage.login({ username: 'standard_user', password: 'secret_sauce' })
    })

    test('Verify products are displayed', async () => {
        expect(true).toBeTruthy()
        await expect(productsPage.productItems).toHaveCount(6)
    })
})
