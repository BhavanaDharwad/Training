import {Page, Locator} from '@playwright/test';

export type SortOption = 'az' | 'za' | 'lohi' | 'hilo';

export class InventoryPage {
    constructor(private page: Page) {}

    async visit(): Promise<void> {
        await this.page.goto('https://www.saucedemo.com/inventory.html');
    }

    getInventoryList(): Locator {
        return this.page.locator('[data-test="inventory-list"]');
    }

    getInventoryItem(): Locator {
        return this.page.locator('[data-test="inventory-item"]');
    }

    getInventoryItemImage(): Locator {
        return this.page.locator('[data-test="inventory-item"] img');
    }

    getInventoryItemName(): Locator {
        return this.page.locator('[data-test="inventory-item-name"]');
    }

    getInventoryItemDescription(): Locator {
        return this.page.locator('[data-test="inventory-item-desc"]');
    }

    getInventoryItemPrice(): Locator {
        return this.page.locator('[data-test="inventory-item-price"]');
    }

    getAddToCart(): Locator {
        return this.page.locator('[data-test="inventory-item-description"] button');
    }

    getInventoryItemButton(): Locator {
        return this.page.locator('[data-test="inventory-item"] button');
    }

    getSortDropdown(): Locator {
        return this.page.locator('[data-test="product-sort-container"]');
    }

    getCartBadge(): Locator {
        return this.page.locator('[data-test="shopping-cart-badge"]');
    }

    getCartLink(): Locator {
        return this.page.locator('[data-test="shopping-cart-link"]');
    }

    async sortBy(option: SortOption): Promise<void> {
        await this.getSortDropdown().selectOption(option);
    }

    async getProductNames(): Promise<string[]> {
        return this.getInventoryItemName().allTextContents();
    }

    async getProductPrices(): Promise<string[]> {
        return this.getInventoryItemPrice().allTextContents();
    }

    async getProductImageSrcs(): Promise<(string | null)[]> {
        return this.getInventoryItemImage().evaluateAll((imgs) =>
            imgs.map((img) => img.getAttribute('src'))
        );
    }

    async openProductByName(index: number): Promise<void> {
        await this.getInventoryItemName().nth(index).click();
    }

    async openProductByImage(index: number): Promise<void> {
        await this.getInventoryItemImage().nth(index).click();
    }
}