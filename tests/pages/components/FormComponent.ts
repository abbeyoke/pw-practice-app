import { Page, Locator } from '@playwright/test';

/**
 * Reusable form component for common form interactions
 * This can be used across different pages that have forms
 */
export class FormComponent {
  private page: Page;

  // Common form locators using role-based selectors
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly rememberMeCheckbox: Locator;
  readonly errorMessage: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Using more specific locators to avoid strict mode violations
    this.emailInput = page.locator('nb-card').filter({hasText: "Using the grid"}).getByRole('textbox', {name: 'Email'});
    this.passwordInput = page.getByRole('textbox', { name: 'Password' }).first();
    this.submitButton = page.getByRole('button', { name: 'Sign in' }).first();
    this.rememberMeCheckbox = page.locator('nb-checkbox').first();
    this.errorMessage = page.locator('.error-message, .alert-danger');
    this.successMessage = page.locator('.success-message, .alert-success');
  }

  /**
   * Fill email field
   */
  async fillEmail(email: string) {
    await this.emailInput.fill(email);
  }

  /**
   * Fill password field
   */
  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  /**
   * Submit the form
   */
  async submitForm() {
    await this.submitButton.click();
  }

  /**
   * Complete form submission with email and password
   */
  async submitFormWithCredentials(email: string, password: string) {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.submitForm();
  }

  /**
   * Submit form with remember me option
   */
  async submitFormWithRememberMe(email: string, password: string) {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.rememberMeCheckbox.click();
    await this.submitForm();
  }

  /**
   * Clear all form fields
   */
  async clearForm() {
    await this.emailInput.clear();
    await this.passwordInput.clear();
  }

  /**
   * Check if form is visible
   */
  async isFormVisible(): Promise<boolean> {
    return await this.emailInput.isVisible() && await this.passwordInput.isVisible();
  }

  /**
   * Get email field value
   */
  async getEmailValue(): Promise<string> {
    return await this.emailInput.inputValue();
  }

  /**
   * Get password field value (usually empty for security)
   */
  async getPasswordValue(): Promise<string> {
    return await this.passwordInput.inputValue();
  }

  /**
   * Check if remember me is checked
   */
  async isRememberMeChecked(): Promise<boolean> {
    return await this.rememberMeCheckbox.isChecked();
  }

  /**
   * Get error message text
   */
  async getErrorMessage(): Promise<string> {
    if (await this.errorMessage.isVisible()) {
      return await this.errorMessage.textContent() || '';
    }
    return '';
  }

  /**
   * Get success message text
   */
  async getSuccessMessage(): Promise<string> {
    if (await this.successMessage.isVisible()) {
      return await this.successMessage.textContent() || '';
    }
    return '';
  }

  /**
   * Check if there's an error message
   */
  async hasErrorMessage(): Promise<boolean> {
    return await this.errorMessage.isVisible();
  }

  /**
   * Check if there's a success message
   */
  async hasSuccessMessage(): Promise<boolean> {
    return await this.successMessage.isVisible();
  }

  /**
   * Wait for form to be ready
   */
  async waitForFormReady() {
    await this.emailInput.waitFor({ state: 'visible' });
    await this.passwordInput.waitFor({ state: 'visible' });
    await this.submitButton.waitFor({ state: 'visible' });
  }
}