import {expect, Locator, Page} from "@playwright/test";
import {Button} from "../atoms/Button";
import {SERVICE_URL} from "../../config/env-data";
import { LoginModal } from "../organisms/LoginModal";
import {Input} from "../atoms/Input";
import {Select} from "../atoms/Select";

export class LoanPage {
    readonly page: Page;
    readonly url: string = SERVICE_URL
    readonly amountInput: Input;
    readonly periodSelect: Select;
    readonly applyNowBtn: Button;
    readonly applyForLoanFirstBtn: Button;
    readonly applyForLoanSecondBtn: Button;
    readonly loginModal: LoginModal;
    readonly errorMessage: Locator;
    readonly monthlyPayment: Locator;

    constructor(page: Page) {
        this.page = page;
        this.amountInput = new Input(page.getByTestId('id-small-loan-calculator-field-amount'));
        this.periodSelect = new Select(page.getByTestId('ib-small-loan-calculator-field-period'));
        this.applyNowBtn = new Button(page.getByTestId('id-small-loan-calculator-field-apply'));
        this.applyForLoanFirstBtn = new Button(page.getByTestId('id-image-element-button-image-1'));
        this.applyForLoanSecondBtn = new Button(page.getByTestId('id-image-element-button-image-2'));
        this.loginModal = new LoginModal(page)
        this.errorMessage = page.getByTestId('id-small-loan-calculator-field-error');
        this.monthlyPayment = page.getByTestId('ib-small-loan-calculator-field-monthlyPayment');
    }

    async open() {
        await this.page.goto(this.url)
    }

    async checkVisibility(): Promise<void> {
        await this.amountInput.checkInputVisible()
        await this.periodSelect.checkSelectVisible()
        await this.applyNowBtn.checkBtnVisible()
        await this.applyForLoanFirstBtn.checkBtnVisible()
        await this.applyForLoanSecondBtn.checkBtnVisible()
    }

    async calculatePayment(amount: string, period: string): Promise<void> {
        await this.amountInput.inputFill(amount);
        await this.periodSelect.selectOption(period);
        await this.applyNowBtn.click();
        await this.loginModal.checkAllComponents()
    }

    async fillAmountInput(amount: string): Promise<void> {
        await this.amountInput.inputFill(amount)
        await this.page.waitForTimeout(2000)
    }

    async checkErrorMessage(visible: boolean): Promise<void> {
        await expect(this.errorMessage).toBeVisible({visible})
    }

    async checkMonthlyPayment(amount: string): Promise<void> {
        expect((await this.monthlyPayment.innerText()).split(' ')[0]).toBe(amount);
    }
}