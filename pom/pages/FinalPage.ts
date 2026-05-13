import {Page} from "@playwright/test";
import {Button} from "../atoms/Button";
import {Input} from "../atoms/Input";
import {Select} from "../atoms/Select";

export class FinalPage {
    readonly page: Page;
    readonly nameInput: Input;
    readonly languageSelect: Select;
    readonly finalBtn: Button;

    constructor(page: Page) {
        this.page = page;
        this.nameInput = new Input(page.getByTestId('final-page-full-name'));
        this.languageSelect = new Select(page.getByTestId('final-page-communication-language'));
        this.finalBtn = new Button(page.getByTestId('final-page-continue-button'));
    }

    async fillYourInformation(value: string): Promise<void> {
        await this.nameInput.checkInputVisible()
        await this.languageSelect.selectOption(value)
        await this.finalBtn.click();
    }
}