# Playwright Test Automation Project

## Overview

This project implements a comprehensive Playwright test automation suite using the **Page Object Model (POM)** pattern. It demonstrates best practices for organizing locators, creating reusable components, and maintaining scalable test automation.

## Project Structure

```
tests/
├── pages/                          # Page Object classes
│   ├── BasePage.ts                 # Common functionality for all pages
│   ├── LoginPage.ts               # Login screen interactions
│   └── components/                # Reusable UI components
│       ├── HeaderComponent.ts    # Navigation and header elements
│       └── FormComponent.ts       # Common form interactions
├── prTest.spec.ts                 # Main test file
└── README.md                      # This documentation
```

## Key Features

### 🎯 **Page Object Model Implementation**
- **One class per screen** - Each page/screen has its own dedicated class
- **Locators + actions together** - All page-specific logic encapsulated
- **High-level test methods** - Tests call business actions, not raw locators

### 🚀 **Component-Based Architecture**
- **Reusable components** - Shared UI elements (header, forms) as separate classes
- **DRY principle** - No code duplication across pages
- **Modular design** - Easy to maintain and extend

### 🎨 **Role-Based Locators**
- **User-facing selectors** - `getByRole()`, `getByLabel()`, `getByPlaceholder()`
- **Stable and resilient** - Less likely to break with UI changes
- **Accessibility-focused** - Tests what users actually interact with

## File Descriptions

### Core Page Objects

#### `BasePage.ts`
- **Purpose**: Common functionality shared across all pages
- **Key Methods**:
  - `goto(url)` - Navigate to URLs
  - `waitForPageLoad()` - Wait for page to be fully loaded
  - `takeScreenshot(name)` - Capture screenshots with timestamps
  - `waitForElement(locator)` - Wait for elements with custom timeouts

#### `LoginPage.ts`
- **Purpose**: Handle all login screen interactions
- **Key Methods**:
  - `signIn(email, password)` - Complete login flow
  - `signInWithRememberMe()` - Login with remember me option
  - `navigateToLogin()` - Navigate to login page
  - `isSignInSuccessful()` - Verify successful login


### Component Classes

#### `HeaderComponent.ts`
- **Purpose**: Navigation and header elements
- **Key Methods**:
  - `navigateToForms()` - Navigate to forms
  - `navigateToCharts()` - Navigate to charts
  - `logout()` - User logout functionality
  - `isUserLoggedIn()` - Check login status

#### `FormComponent.ts`
- **Purpose**: Common form interactions
- **Key Methods**:
  - `submitFormWithCredentials(email, password)` - Complete form submission
  - `submitFormWithRememberMe()` - Form with remember me
  - `clearForm()` - Clear form fields
  - `getErrorMessage()` - Get error messages

## Test Files

### `prTest.spec.ts`
- **Purpose**: Main test file demonstrating the framework
- **Test Structure**:
  - Navigation tests
  - Form interaction tests
  - Login flow tests
  - Component integration tests


## Dependencies

### Core Dependencies
- **@playwright/test** - Main testing framework
- **TypeScript** - Type safety and better development experience

### Project Configuration
- **playwright.config.ts** - Playwright configuration
- **tsconfig.json** - TypeScript configuration

## Best Practices Implemented

### 1. **Locator Strategy**
```typescript
// ✅ User-facing locators (preferred)
page.getByRole('textbox', { name: 'Email' })
page.getByRole('button', { name: 'Sign in' })

// ❌ Fragile CSS selectors (avoided)
page.locator('#inputEmail')
page.locator('.login-btn')
```

### 2. **Page Object Pattern**
```typescript
// ✅ High-level actions in tests
test("login test", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.signIn('test@test.com', 'password');
});

// ❌ Raw locators in tests (avoided)
test("login test", async ({ page }) => {
  await page.getByRole('textbox', { name: 'Email' }).fill('test@test.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('password');
  await page.getByRole('button', { name: 'Sign in' }).click();
});
```

### 3. **Component Reusability**
```typescript
// ✅ Shared components across pages
class LoginPage {
  readonly form: FormComponent;      // Reusable form logic
  readonly header: HeaderComponent;  // Reusable navigation
}
```

## Running Tests

### Prerequisites
1. Install dependencies: `npm install`
2. Start the application: `npm start` (on localhost:4200)
3. Run tests: `npx playwright test`

### Test Execution
```bash
# Run all tests
npx playwright test

# Run specific test file
npx playwright test prTest.spec.ts

# Run with UI mode
npx playwright test --ui

# Generate test report
npx playwright show-report
```

### Trace and Debugging
```bash
# Run tests with trace enabled (for debugging)
npx playwright test --trace on

# View trace files
npx playwright show-trace test-results/*/trace.zip

# Run specific test with trace
npx playwright test prTest.spec.ts --trace on

# Debug mode with trace
npx playwright test --debug --trace on
```

## Benefits of This Architecture

### 🎯 **Maintainability**
- UI changes only require updates in one place
- Each screen is self-contained
- Easy to find and update specific functionality

### 🔄 **Reusability**
- Common actions shared across tests
- Components reused across pages
- High-level methods reduce code duplication

### 📖 **Readability**
- Tests read like user stories
- Business logic is clear and focused
- No technical implementation details in tests

### 🛡️ **Reliability**
- Role-based locators are more stable
- User-facing selectors break less often
- Automatic waiting reduces flaky tests

### 📈 **Scalability**
- Easy to add new screens and functionality
- Component pattern supports complex applications
- Clear separation of concerns

## Getting Started

1. **Explore the structure** - Start with `BasePage.ts` to understand common functionality
2. **Check page objects** - Look at `LoginPage.ts` for examples
3. **Review components** - Examine `HeaderComponent.ts` and `FormComponent.ts`
4. **Run the tests** - Execute `prTest.spec.ts` to see the framework in action
5. **Add new pages** - Follow the established patterns for new functionality

This project demonstrates a production-ready test automation framework that scales with your application and follows Playwright best practices.
