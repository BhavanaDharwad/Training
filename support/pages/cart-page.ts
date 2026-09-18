import {Page, Locator} from '@playwright/test';

export class CartPage {
    constructor(private page: Page) {}

    async visit(): Promise<void> {
        await this.page.goto('https://www.saucedemo.com/cart.html');
    }

    getCartItem(): Locator {
        return this.page.locator('[data-test="inventory-item"]');
    }

    getCartItemName(): Locator {
        return this.page.locator('[data-test="inventory-item-name"]');
    }

    getCartItemPrice(): Locator {
        return this.page.locator('[data-test="inventory-item-price"]');
    }

    getCartItemQuantity(): Locator {
        return this.page.locator('[data-test="item-quantity"]');
    }

    getRemoveButton(): Locator {
        return this.page.locator('[data-test="inventory-item"] button');
    }

    async removeItem(index: number): Promise<void> {
        await this.getRemoveButton().nth(index).click();
    }
}
