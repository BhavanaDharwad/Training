import {Page, Locator} from '@playwright/test';

export class CART_TEST {
    constructor(private page: Page) {}

    async visit(): Promise<void>{
        await this.page.goto('/');
    }

    getItems(): Locator {
        return this.page.locator('[data-test="inventory-item"]');
    }

    getItemName(): Locator {
        return this.page.locator('[data-test="inventory-item-name"]')
    }

    getContinueShoppingBtn(): Locator {
        return this.page.locator('[data-test="continue-shopping"]');
    }

    getRemoveBtn(): Locator {
        return this.page.locator('[data-test="remove-sauce-labs-backpack"]');
    }

    getPrice(): Locator {
        return this.page.locator('[data-test="inventory-item-price"]');
    }

    getCheckoutBtn(): Locator {
        return this.page.locator('[data-test="checkout"]');
    }
}
