import { test as base, expect, Page } from '@playwright/test';
import { ChangePasswordModal } from './pages/change-password-modal';

export const test = base.extend<{ page: Page }>({
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
});

export { expect };
