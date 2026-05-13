import {expect, Locator, Page} from "@playwright/test";
import {Button} from "../atoms/Button";

export class SuccessModal {
    readonly container: Locator
    readonly popupTitle: Locator
    readonly popupBtn: Button

    constructor(page: Page) {
        this.container = page.locator('.popup-container')
        this.popupTitle = this.container.getByText('Success!');
        this.popupBtn = new Button(this.container.getByTestId('final-page-success-ok-button'))
    }

    async checkSuccessModalVisible(): Promise<void> {
        await expect(this.popupTitle).toBeVisible();
        await this.popupBtn.checkBtnVisible()
    }

    async closeSuccessModal(): Promise<void> {
        await this.popupBtn.click()
    }
}