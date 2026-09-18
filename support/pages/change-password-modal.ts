import { Page, Locator } from '@playwright/test';

export class ChangePasswordModal {
    constructor(private page: Page) {}

    // TODO: confirm exact selector against the live site.
    // Placeholder uses role-based locators since the real markup/data-test attrs are unconfirmed.
    getModal(): Locator {
        return this.page.getByRole('dialog').filter({ hasText: /change your password/i });
    }

    getOkButton(): Locator {
        return this.getModal().getByRole('button', { name: /ok/i });
    }

    async dismiss(): Promise<void> {
        await this.getOkButton().click();
    }
}
