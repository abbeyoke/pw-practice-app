import { Page, Locator } from '@playwright/test';

/**
 * Header component that can be reused across multiple pages
 * This demonstrates the component-based approach for shared UI elements
 */
export class HeaderComponent {
  private page: Page;

  // Navigation menu locators using role-based selectors
  readonly formsMenu: Locator;
  readonly chartsMenu: Locator;
  readonly tablesMenu: Locator;
  readonly dashboardTitle: Locator;
  readonly userMenu: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Using role-based and user-facing locators (Playwright best practice)
    this.formsMenu = page.getByRole('link', { name: 'Forms' });
    this.chartsMenu = page.getByRole('link', { name: 'Charts' });
    this.tablesMenu = page.getByRole('link', { name: 'Tables' });
    this.dashboardTitle = page.getByTitle('Iot Dashboard');
    this.userMenu = page.getByRole('button', { name: 'User Menu' });
    this.logoutButton = page.getByRole('button', { name: 'Logout' });
  }

  /**
   * Navigate to Forms section
   */
  async navigateToForms() {
    await this.formsMenu.click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Navigate to Charts section
   */
  async navigateToCharts() {
    await this.chartsMenu.click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Navigate to Tables section
   */
  async navigateToTables() {
    await this.tablesMenu.click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Check if header is visible
   */
  async isHeaderVisible(): Promise<boolean> {
    return await this.dashboardTitle.isVisible();
  }

  /**
   * Get dashboard title text
   */
  async getDashboardTitle(): Promise<string> {
    return await this.dashboardTitle.textContent() || '';
  }

  /**
   * Open user menu
   */
  async openUserMenu() {
    await this.userMenu.click();
  }

  /**
   * Logout from the application
   */
  async logout() {
    await this.openUserMenu();
    await this.logoutButton.click();
  }

  /**
   * Check if user is logged in
   */
  async isUserLoggedIn(): Promise<boolean> {
    return await this.userMenu.isVisible();
  }
}