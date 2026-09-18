import {Page, Locator} from '@playwright/test';

export class InventoryItemPage {
    constructor(private page: Page) {}

    getName(): Locator {
        return this.page.locator('[data-test="inventory-item-name"]');
    }

    getDescription(): Locator {
        return this.page.locator('[data-test="inventory-item-desc"]');
    }

    getPrice(): Locator {
        return this.page.locator('[data-test="inventory-item-price"]');
    }

    getImage(): Locator {
        return this.page.locator('.inventory_details_img');
    }

    getBackButton(): Locator {
        return this.page.locator('[data-test="back-to-products"]');
    }

    getAddToCartButton(): Locator {
        return this.page.locator('[data-test="add-to-cart"], [data-test="remove"]');
    }
}
