import { test, expect } from '../support/test';
import { LoginPage } from '../support/pages/login-page';
import { InventoryPage } from '../support/pages/inventory-page';
import { InventoryItemPage } from '../support/pages/inventory-item-page';
import { CartPage } from '../support/pages/cart-page';
import { STANDARD_USER } from '../support/user';

test.describe('Add to Cart - Single Item', () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        await loginPage.visit();
        await loginPage.login(STANDARD_USER);
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });

    test('should change the button to "Remove" and show a badge count of 1 after adding one item', async () => {
        await expect(inventoryPage.getInventoryItemButton().first()).toHaveText('Add to cart');
        await expect(inventoryPage.getCartBadge()).toBeHidden();

        await inventoryPage.getInventoryItemButton().first().click();

        await expect(inventoryPage.getInventoryItemButton().first()).toHaveText('Remove');
        await expect(inventoryPage.getCartBadge()).toBeVisible();
        await expect(inventoryPage.getCartBadge()).toHaveText('1');
    });

    test('should show the added item with correct name, price and quantity on the cart page', async ({ page }) => {
        const expectedName = (await inventoryPage.getProductNames())[0];
        const expectedPrice = (await inventoryPage.getProductPrices())[0];
        console.log('expectedName', expectedName);
        console.log('expectedPrice', expectedPrice);

        await inventoryPage.getInventoryItemButton().first().click();
        await inventoryPage.getCartLink().click();

        const cartPage = new CartPage(page);
        await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
        await expect(cartPage.getCartItem()).toHaveCount(1);
        await expect(cartPage.getCartItemName()).toHaveText(expectedName);
        await expect(cartPage.getCartItemPrice()).toHaveText(expectedPrice);
        await expect(cartPage.getCartItemQuantity()).toHaveText('1');
    });

    test('should revert the button to "Add to cart" and clear the badge when removed via the inventory page', async () => {
        await inventoryPage.getInventoryItemButton().first().click();
        await expect(inventoryPage.getInventoryItemButton().first()).toHaveText('Remove');
        await expect(inventoryPage.getCartBadge()).toHaveText('1');

        await inventoryPage.getInventoryItemButton().first().click();

        await expect(inventoryPage.getInventoryItemButton().first()).toHaveText('Add to cart');
        await expect(inventoryPage.getCartBadge()).toBeHidden();
    });

    test('should remove the line item from the cart page when removed there', async ({ page }) => {
        await inventoryPage.getInventoryItemButton().first().click();
        await inventoryPage.getCartLink().click();

        const cartPage = new CartPage(page);
        await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
        await expect(cartPage.getCartItem()).toHaveCount(1);

        await cartPage.removeItem(0);

        await expect(cartPage.getCartItem()).toHaveCount(0);
        await expect(inventoryPage.getCartBadge()).toBeHidden();
    });

    test('should add the item to cart from the product detail page', async ({ page }) => {
        const expectedName = (await inventoryPage.getProductNames())[0];
        const expectedPrice = (await inventoryPage.getProductPrices())[0];

        await inventoryPage.openProductByName(0);

        const inventoryItemPage = new InventoryItemPage(page);
        await expect(page).toHaveURL(/inventory-item\.html\?id=\d+/);
        await expect(inventoryItemPage.getAddToCartButton()).toHaveText('Add to cart');

        await inventoryItemPage.getAddToCartButton().click();

        await expect(inventoryItemPage.getAddToCartButton()).toHaveText('Remove');
        await expect(inventoryPage.getCartBadge()).toHaveText('1');

        await inventoryPage.getCartLink().click();

        const cartPage = new CartPage(page);
        await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
        await expect(cartPage.getCartItem()).toHaveCount(1);
        await expect(cartPage.getCartItemName()).toHaveText(expectedName);
        await expect(cartPage.getCartItemPrice()).toHaveText(expectedPrice);
    });
});
