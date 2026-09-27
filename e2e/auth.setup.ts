import { test as setup } from '@playwright/test';
import { LoginPage } from '../support/pages/login-page';
import { STANDARD_USER } from '../support/user';
import { STANDARD_USER_AUTH_FILE } from '../support/auth';

setup('authenticate as standard_user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.visit();
    await loginPage.login(STANDARD_USER);
    await page.waitForURL('**/inventory.html');
    await page.context().storageState({ path: STANDARD_USER_AUTH_FILE });
});
