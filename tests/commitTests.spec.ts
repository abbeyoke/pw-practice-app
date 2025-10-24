import {test, expect} from "@playwright/test"
import { first } from "rxjs-compat/operator/first"
import { LoginPage } from "./pages/LoginPage"

test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/')
})

test.describe("first suite", () =>{
    test.beforeEach(async({page}) => {
        await page.getByText('Forms').click()
    })
    test("first test", async ({page}) =>{
        await page.getByText('Form Layouts').click()
    })

    test("second test", async ({page}) =>{
        await page.getByText('DatePicker').click()
    })
})

test.describe("second suite", () =>{
    test.beforeEach(async({page}) => {
        var is_present = await page.getByText('Charts', {exact:true}).isVisible()
        await page.getByText('Charts', {exact:true}).click()
    })

    test("third test", async ({page}) =>{
        await page.getByText('eCharts', {exact:true}).click()
    })

    test("forth test", ({page}) =>{

    })
})

test.describe("third suite", () =>{
    test.beforeEach(async({page}) => {
        var is_present = await page.getByText('Forms').isVisible()
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
    })

    test("fifth test", async ({page}) =>{
        // by Tag Name
        await page.locator('input').first().isVisible()

        // by ID
        await page.locator("#inputEmail").isVisible()
        
        // by class
        await page.locator(".shape-rectangle").first().isVisible()

        // by class value
        await page.locator("[class='input-full-width size-medium status-basic shape-rectangle nb-transition']").isVisible()
        
        // by attribute
        await page.locator("[placeholder='Email']").isVisible()
        
        // combine different selectors
        await page.locator("input[placeholder='Email'].shape-rectangle").isVisible()
        
        // by xpath (Not recommended)
        await page.locator("//*[@id='inputEmail1']").isVisible()
        
        // by partial text match
        await page.locator(':text("Using")').isVisible()
        
        // by exact text match
        await page.locator(':text-is("Using the Grid")').isVisible() 
    })

    test("sixth test", async ({page}) => {
        await page.getByRole('textbox', {name: "Email"}).first().click()
        await page.getByRole('button', {name: "Sign in"}).first().click()

        await page.getByLabel('Email').nth(0).click()

        await page.getByPlaceholder('Jane Doe').click()

        await page.getByText('Using the Grid').click()

        await page.getByTitle('Iot Dashboard').click()

        // await page.getByTestId('SignIn').click()
    })

    test("seventh test", async ({page}) => {
        await page.locator('nb-card nb-radio :text-is("Option 1")').click()
        await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()
        
        await page.locator('nb-card').getByRole('button', {name: "Sign in"}).first().click()

        await page.locator('nb-card').nth(3).getByRole('button').click()
    })

    test("eighth test", async ({page}) => {
        await page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"}).click()
        await page.locator('nb-card', {has: page.locator('#inputEmail')}).getByRole('textbox', {name: "Email"}).click()
        
        await page.locator('nb-card').filter({hasText: "Basic Form"}).getByRole('textbox', {name: "Email"}).click()
        await page.locator('nb-card').filter({has: page.locator('.status-danger')})
            .getByRole('textbox', {name: "Password"}).click()
        
        await page.locator('nb-card').filter({has: page.locator('nb-checkbox')})
            .filter({hasText: "Sign in"})
            .getByRole('textbox', {name: "Email"}).click()
        
        await page.locator(':text-is("Using the Grid")').locator('..')
            .getByRole('textbox', {name: "Email"}).click()
    })

    test("nineth test", async ({page}) => {
        const basicForm = page.locator('nb-card').filter({hasText: "Basic Form"})
        const emailField = basicForm.getByRole('textbox', {name: "Email"})

        await emailField.fill('test@test.com')
        await basicForm.getByRole('textbox', {name: "Password"}).fill('welcome')
        await basicForm.locator('nb-checkbox').click()
        await basicForm.getByRole('button').click()

        await expect(emailField).toHaveValue('test@test.com')
        await page.locator('nb-card').filter({hasText: "Using the grid"}).getByRole('textbox', {name: 'Email'}).fill('testing')
    })

    test("login test", async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigateToLogin()
        await loginPage.signIn('test@test.com', 'password');
    });
})