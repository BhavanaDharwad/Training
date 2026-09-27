import {test, expect} from '../support/test';
import { InventoryPage } from '../support/pages/inventory-page';
import { CART_TEST } from '../support/pages/test-cart';

test.describe('test cart', () => {
    let inventoryPage: InventoryPage;
    let cartPage: CART_TEST;

    test.beforeEach(async ({ page}) => {
        inventoryPage = new InventoryPage(page);
        cartPage = new CART_TEST(page);
        await inventoryPage.visit();
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