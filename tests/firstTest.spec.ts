import {test} from "@playwright/test"

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