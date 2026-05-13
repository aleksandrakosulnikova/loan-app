import {Page} from "@playwright/test";
import {Button} from "../atoms/Button";
import {Input} from "../atoms/Input";

export class LoginModal {
    readonly usernameInput: Input;
    readonly passwordInput: Input;
    readonly continueButton: Button;
    readonly closeBtn: Button;

    constructor(page: Page) {
        this.usernameInput = new Input(page.getByTestId('login-popup-username-input'));
        this.passwordInput = new Input(page.getByTestId('login-popup-password-input'));
        this.continueButton = new Button(page.getByTestId('login-popup-continue-button'));
        this.closeBtn = new Button(page.getByTestId('login-popup-close-button'));
    }

    async signIn(username: string, password: string) {
        await this.usernameInput.inputFill(username)
        await this.passwordInput.inputFill(password)
        await this.continueButton.click()
    }

    async checkAllComponents(): Promise<void> {
        await this.usernameInput.checkInputVisible()
        await this.passwordInput.checkInputVisible()
        await this.continueButton.checkBtnVisible()
        await this.continueButton.checkBtnEnabled(false)
    }
}