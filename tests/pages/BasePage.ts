import { Page, Locator } from '@playwright/test';

/**
 * Base page class that provides common functionality for all page objects
 * This follows the Page Object Model best practices for Playwright
 */
export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to a specific URL
   */
  async goto(url: string) {
    await this.page.goto(url);
  }

  /**
   * Wait for page to be fully loaded
   */
  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Get page title
   */
  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Take a screenshot with timestamp
   */
  async takeScreenshot(name: string) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    await this.page.screenshot({ 
      path: `screenshots/${name}-${timestamp}.png`,
      fullPage: true 
    });
  }

  /**
   * Wait for element to be hidden
   */
  async waitForElementHidden(locator: Locator, timeout = 5000) {
    await locator.waitFor({ state: 'hidden', timeout });
  }

  /**
   * Check if an element is visible
   */
  async isElementVisible(locator: Locator): Promise<boolean> {
    return await locator.isVisible();
  }

  /**
   * Check if an element is enabled
   */
  async isElementEnabled(locator: Locator): Promise<boolean> {
    return await locator.isEnabled();
  }

  /**
   * Get element text content
   */
  async getElementText(locator: Locator): Promise<string> {
    return await locator.textContent() || '';
  }

  /**
   * Scroll element into view
   */
  async scrollIntoView(locator: Locator) {
    await locator.scrollIntoViewIfNeeded();
  }

  /**
   * Wait for network to be idle (useful after form submissions)
   */
  async waitForNetworkIdle() {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Check if element is present (returns boolean)
   * @param timeout - Waits up to X seconds for element to appear (default: 10 seconds)
   * @returns true if element appears within timeout, false if timeout exceeded
   */
  async isElementPresent(locator: Locator, timeout = 10000): Promise<boolean> {
    try {
      // Wait up to timeout seconds for element to appear
      await locator.waitFor({ state: 'visible', timeout });
      return true; // Element appeared within timeout
    } catch (error) {
      // Timeout exceeded or element not found
      return false;
    }
  }

  /**
   * Assert element is present (throws error if not found)
   * @param timeout - Waits up to X seconds for element to appear (default: 10 seconds)
   * @throws Error with locator details if element not found within timeout
   */
  async assertElementPresent(locator: Locator, timeout = 10000): Promise<void> {
    try {
      // Wait up to timeout seconds for element to appear
      await locator.waitFor({ state: 'visible', timeout });
    } catch (error) {
      // Throw descriptive error with locator details
      throw new Error(`Element not found within ${timeout}ms: ${locator.toString()}`);
    }
  }

  /**
   * Wait for element to be present (throws error if not found)
   * Waits for element to appear with timeout, throws error if not found
   * @throws Error with locator details if element not found within timeout
   */
  async waitForElementPresent(locator: Locator, timeout = 10000): Promise<void> {
    try {
      await locator.waitFor({ state: 'visible', timeout });
    } catch (error) {
      throw new Error(`Element not found within ${timeout}ms: ${locator.toString()}`);
    }
  }

  async waitForElementAndClick(locator: Locator, timeout = 10000): Promise<void> {
    await this.waitForElementPresent(locator, timeout);
    await locator.click();
  }

  /**
   * Check if element is present and clickable (returns boolean)
   * @param timeout - Waits up to X seconds for element to be clickable (default: 10 seconds)
   * @returns true if element becomes clickable within timeout, false if timeout exceeded
   */
  async isElementClickable(locator: Locator, timeout = 10000): Promise<boolean> {
    try {
      // Wait up to timeout seconds for element to be visible and enabled
      await locator.waitFor({ state: 'visible', timeout });
      // Check if it's also enabled (clickable)
      return await locator.isEnabled();
    } catch (error) {
      // Timeout exceeded or element not found
      return false;
    }
  }

  /**
   * Assert element is clickable (throws error if not found or not clickable)
   * @param timeout - Waits up to X seconds for element to be clickable (default: 10 seconds)
   * @throws Error with locator details if element not found or not clickable within timeout
   */
  async assertElementClickable(locator: Locator, timeout = 10000): Promise<void> {
    try {
      // Wait up to timeout seconds for element to be visible
      await locator.waitFor({ state: 'visible', timeout });
      // Check if it's also enabled (clickable)
      const isEnabled = await locator.isEnabled();
      if (!isEnabled) {
        throw new Error(`Element found but not clickable: ${locator.toString()}`);
      }
    } catch (error) {
      // Throw descriptive error with locator details
      throw new Error(`Element not clickable within ${timeout}ms: ${locator.toString()}`);
    }
  }

  /**
   * Wait for element to be clickable
   */
  async waitForElementClickable(locator: Locator, timeout = 10000): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
    await locator.waitFor({ state: 'attached', timeout });
  }
}