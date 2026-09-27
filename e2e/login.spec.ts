import { test, expect } from '../support/test';
import { ChangePasswordModal } from '../support/pages/change-password-modal';
import { STANDARD_USER, LOCKED_OUT_USER, PROBLEM_USER, PERFORMANCE_GLITCH_USER, ERROR_USER, VISUAL_USER } from '../support/user';

test.describe('Login Page', () => {
    test.use({ storageState: { cookies: [], origins: [] } });

    test.beforeEach(async ({ loginPage }) => {
        await loginPage.visit();
    });

    test('should login with standard user', async ({ page, loginPage }) => {
        await loginPage.login(STANDARD_USER);
        await expect(new ChangePasswordModal(page).getModal()).toBeHidden();
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });

    test('should login with locked out user', async ({ page, loginPage }) => {
        await loginPage.login(LOCKED_OUT_USER);
        await expect(loginPage.getErrorButton()).toBeVisible();
        await expect(loginPage.getErrorCloseIcon()).toBeVisible();
        await expect(loginPage.getErrorMessage()).toContainText('Epic sadface: Sorry, this user has been locked out.');
        await loginPage.getErrorMessage().isVisible();
        await page.waitForTimeout(2000);
        
    });
});
