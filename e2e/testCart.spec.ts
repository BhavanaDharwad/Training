import {test, expect} from '../support/test';
import { LoginPage } from '../support/pages/login-page';
import { InventoryPage } from '../support/pages/inventory-page';
import { CART_TEST } from '../support/pages/test-cart';
import { STANDARD_USER } from '../support/user';

test.describe('test cart', () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;
    let cartPage: CART_TEST;

    test.beforeEach(async ({ page}) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        cartPage = new CART_TEST(page);
        loginPage.login(STANDARD_USER);
        loginPage.visit();
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    })

    test('validate the card 1 item', async ({page}) => {
        let itemName = (await inventoryPage.getInventoryItemName().allTextContents())[0];
        let itemPrice = (await inventoryPage.getInventoryItemPrice().allTextContents())[0];
        console.log('itemName', (await inventoryPage.getInventoryItemPrice().allTextContents()));
        let itemsAdded = (await inventoryPage.getCartBadge().allTextContents())[0];
        await inventoryPage.getInventoryItemButton().first().click();
        await expect(inventoryPage.getInventoryItemButton().first()).toHaveText('Remove');
        await expect(inventoryPage.getCartBadge()).toHaveText('1');
        await inventoryPage.getCartLink().click();
        await expect(cartPage.getCheckoutBtn()).toBeVisible();
        await expect(cartPage.getContinueShoppingBtn()).toBeVisible();
        await expect(cartPage.getRemoveBtn()).toBeVisible();
        await expect(cartPage.getPrice()).toHaveText(itemPrice);
        await expect(cartPage.getItemName()).toHaveText(itemName);

        
    })
})