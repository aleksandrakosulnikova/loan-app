import { test, expect } from '@playwright/test';
import {LoanPage} from "../pom/pages/LoanPage";
import {LoginModal} from "../pom/organisms/LoginModal";
import { PASSWORD, USERNAME } from "../config/env-data";
import {FinalPage} from "../pom/pages/FinalPage";
import {SuccessModal} from "../pom/organisms/SuccessModal";

test.describe('Loan app', () => {
    test('Critical path', async ({ page }) => {
        const loanPage = new LoanPage(page);
        const loginModal = new LoginModal(page)
        const finalPage = new FinalPage(page);
        const successModal = new SuccessModal(page);
        await loanPage.open()
        await loanPage.calculatePayment('500', '24')
        await loginModal.signIn(USERNAME, PASSWORD);
        await finalPage.fillYourInformation('English')
        await successModal.checkSuccessModalVisible()
        await successModal.closeSuccessModal()
        await loanPage.checkVisibility()
        })

    test('Error message test', async ({ page }) => {
        const loanPage = new LoanPage(page);
        await loanPage.open()
        await loanPage.fillAmountInput('1')
        await loanPage.checkErrorMessage(true)
        await loanPage.fillAmountInput('500')
        await loanPage.checkErrorMessage(false)
    })

    test('Loan page components visibility', async ({ page }) => {
        const loanPage = new LoanPage(page)
        await loanPage.open()
        await loanPage.checkVisibility()
    })

    test('Calculator: error 500 without response body', async ({ page }) => {
        const loanPage = new LoanPage(page);
        const routeToMock = '**/api/loan-calc**'

        await page.route(routeToMock, async route => {
            await route.fulfill({status: 500})
        })

        const responsePromise = page.waitForResponse(routeToMock)
        await loanPage.open()
        await loanPage.calculatePayment('500', '24')

        const response = await responsePromise
        expect(response.status()).toBe(500)
        await loanPage.checkErrorMessage(true)
    })

    test('Calculator: status 200 without response body', async ({ page }) => {
        const loanPage = new LoanPage(page);
        const routeToMock = '**/api/loan-calc**'

        await page.route(routeToMock, async route => {
            await route.fulfill({status: 200})
        })

        const responsePromise = page.waitForResponse(routeToMock)
        await loanPage.open()
        await loanPage.calculatePayment('500', '24')

        const response = await responsePromise
        expect(response.status()).toBe(200)
        await loanPage.checkMonthlyPayment('undefined');
    })

    test('Calculator: 200 OK - wrong key in response body', async ({ page }) => {
        const loanPage = new LoanPage(page);
        const routeToMock = '**/api/loan-calc**'
        const wrongKey = 1000

        await page.route(routeToMock, async route => {
            await route.fulfill({status: 200, json: {wrongKey}, contentType: "application/json"});
        })

        const responsePromise = page.waitForResponse(routeToMock)
        await loanPage.open()
        await loanPage.calculatePayment('500', '24')

        const response = await responsePromise
        expect(response.status()).toBe(200)
        await loanPage.checkMonthlyPayment('undefined');
    })
})