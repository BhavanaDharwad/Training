import { test, expect } from '../support/test';
import { LoginPage } from '../support/pages/login-page';
import { InventoryPage, SortOption } from '../support/pages/inventory-page';
import { InventoryItemPage } from '../support/pages/inventory-item-page';
import { STANDARD_USER, PROBLEM_USER } from '../support/user';

const PRICE_FORMAT = /^\$\d+\.\d{2}$/;
const PRODUCT_COUNT = 6;

test.describe('Inventory Page - Display & Content', () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        await loginPage.visit();
        await loginPage.login(STANDARD_USER);
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });

    test('should display all 6 products with image, name, description, price and Add to cart button', async () => {
        await expect(inventoryPage.getInventoryItem()).toHaveCount(PRODUCT_COUNT);

        const itemCount = await inventoryPage.getInventoryItem().count();
        for (let i = 0; i < itemCount; i++) {
            await expect(inventoryPage.getInventoryItemImage().nth(i)).toBeVisible();
            await expect(inventoryPage.getInventoryItemName().nth(i)).not.toBeEmpty();
            await expect(inventoryPage.getInventoryItemDescription().nth(i)).not.toBeEmpty();
            await expect(inventoryPage.getInventoryItemPrice().nth(i)).toHaveText(PRICE_FORMAT);
            await expect(inventoryPage.getInventoryItemButton().nth(i)).toBeVisible();
            await expect(inventoryPage.getInventoryItemButton().nth(i)).toHaveText('Add to cart');
        }
        const srcs = await inventoryPage.getProductImageSrcs();
        expect(new Set(srcs).size).toBe(PRODUCT_COUNT);
    });

    test('should display all prices in $X.XX format', async () => {
        const prices = await inventoryPage.getProductPrices();
        expect(prices).toHaveLength(PRODUCT_COUNT);
        for (const price of prices) {
            expect(price).toMatch(PRICE_FORMAT);
        }
    });

    test('should hide the cart badge when the cart is empty', async () => {
        await expect(inventoryPage.getCartBadge()).toBeHidden();
    });

    test('should keep the sort order as the default "Name (A to Z)" on initial load', async () => {
        await expect(inventoryPage.getSortDropdown()).toHaveValue('az');
        const names = await inventoryPage.getProductNames();
        expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b)));
    });

    test('should open the matching product detail page when clicking a product image', async ({ page }) => {
        const expectedName = (await inventoryPage.getProductNames())[0];

        await inventoryPage.openProductByImage(0);

        const inventoryItemPage = new InventoryItemPage(page);
        await expect(page).toHaveURL(/inventory-item\.html\?id=\d+/);
        await expect(inventoryItemPage.getBackButton()).toBeVisible();
        await expect(inventoryItemPage.getName()).toHaveText(expectedName);
    });
});

test.describe('Inventory Page - problem_user regression', () => {
    test('should show the known broken-image bug for problem_user', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);

        await loginPage.visit();
        await loginPage.login(PROBLEM_USER);
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        await expect(inventoryPage.getInventoryItem()).toHaveCount(PRODUCT_COUNT);

        // Known bug: problem_user renders the same broken placeholder image for every
        // product instead of each product's distinct image.
        const srcs = await inventoryPage.getProductImageSrcs();
        expect(new Set(srcs).size).toBe(1);
    });
});
