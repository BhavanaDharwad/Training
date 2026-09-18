import {Page, Locator} from '@playwright/test';

export class LoginPage {
    constructor(private page: Page) {}

    async visit(): Promise<void> {
        await this.page.goto('/');
    }

    getUserName(): Locator {
        //return this.page.locator('[data-test="username"]');
        return this.page.getByPlaceholder('username');
    }

    getPassword(): Locator {
        return this.page.locator('[data-test="password"]');
    }

    getLoginButton(): Locator {
        return this.page.locator('[data-test="login-button"]');
    }

    getErrorButton(): Locator {
        return this.page.locator('[data-test="error-button"]');
    }

    getErrorMessage(): Locator {
        return this.page.locator('[data-test="error"]');
    }   

    getErrorCloseIcon(): Locator {
        return this.page.locator('[data-icon="xmark"]');
    }

    async login(user: { username: string; password: string }): Promise<void> {
        await this.getUserName().fill(user.username);
        await this.getPassword().fill(user.password);
        await this.getLoginButton().click();
    }

}