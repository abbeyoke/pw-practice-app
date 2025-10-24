import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { FormComponent } from './components/FormComponent';
import { HeaderComponent } from './components/HeaderComponent';

/**
 * Login page object following Page Object Model best practices
 * Contains locators and actions specific to the login screen
 */
export class LoginPage extends BasePage {
  // Page-specific locators using role-based selectors
  readonly forgotPasswordLink: Locator;
  readonly createAccountLink: Locator;
  readonly loginTitle: Locator;

  // Reusable components
  readonly form: FormComponent;
  readonly header: HeaderComponent;

  constructor(page: Page) {
    super(page);
    
    // Initialize components
    this.form = new FormComponent(page);
    this.header = new HeaderComponent(page);
    
    // Page-specific locators using user-facing selectors
    this.forgotPasswordLink = page.getByRole('link', { name: 'Forgot Password' });
    this.createAccountLink = page.getByRole('link', { name: 'Create Account' });
    this.loginTitle = page.getByRole('heading', { name: 'Sign In' });
  }

  /**
   * Navigate to login page
   */
  async navigateToLogin() {
    await this.goto('http://localhost:4200/');
    await this.header.navigateToForms();
    await this.page.getByText('Form Layouts').click();
    await this.waitForPageLoad();
  }

  /**
   * Perform login action using the form component
   */
  async signIn(email: string, password: string) {
    await this.form.submitFormWithCredentials(email, password);
    await this.waitForNetworkIdle();
  }

  /**
   * Sign in with remember me option
   */
  async signInWithRememberMe(email: string, password: string) {
    await this.form.submitFormWithRememberMe(email, password);
    await this.waitForNetworkIdle();
  }

  /**
   * Check if login was successful
   */
  async isSignInSuccessful(): Promise<boolean> {
    // Check for successful login indicators
    return await this.header.isUserLoggedIn() || 
           await this.page.getByText('Dashboard').isVisible();
  }

  /**
   * Get error message from form component
   */
  async getErrorMessage(): Promise<string> {
    return await this.form.getErrorMessage();
  }

  /**
   * Check if there's an error message
   */
  async hasErrorMessage(): Promise<boolean> {
    return await this.form.hasErrorMessage();
  }

  /**
   * Clear login form
   */
  async clearForm() {
    await this.form.clearForm();
  }

  /**
   * Navigate to forgot password
   */
  async navigateToForgotPassword() {
    await this.forgotPasswordLink.click();
  }

  /**
   * Navigate to create account
   */
  async navigateToCreateAccount() {
    await this.createAccountLink.click();
  }

  /**
   * Wait for login page to be ready
   */
  async waitForLoginPageReady() {
    await this.form.waitForFormReady();
    await this.loginTitle.waitFor({ state: 'visible' });
  }

  /**
   * Get login page title
   */
  async getLoginTitle(): Promise<string> {
    return await this.loginTitle.textContent() || '';
  }
}