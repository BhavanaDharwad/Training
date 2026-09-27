import { test as base, expect, Page } from '@playwright/test';
import { ChangePasswordModal } from './pages/change-password-modal';
import { LoginPage } from './pages/login-page';
import { User } from './user';

type Fixtures = {
    page: Page;
    loginPage: LoginPage;
    loginAs: (user: User) => Promise<void>;
};

export const test = base.extend<Fixtures>({
    page: async ({ page }, use) => {
        const changePasswordModal = new ChangePasswordModal(page);

        await page.addLocatorHandler(
            changePasswordModal.getModal(),
            async () => {
                await changePasswordModal.dismiss();
            }
        );

        await use(page);
    },

    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    loginAs: async ({ loginPage }, use) => {
        await use(async (user: User) => {
            await loginPage.visit();
            await loginPage.login(user);
        });
    },
});

export { expect };
