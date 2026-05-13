import {expect, Locator} from "@playwright/test";

export class Input {
    readonly inpLocator: Locator;

    constructor(inpLocator: Locator) {
        this.inpLocator = inpLocator;
    }

    async inputFill(value: string): Promise<void> {
        await this.inpLocator.fill(value);
    }

    async checkInputVisible(): Promise<void> {
        await expect(this.inpLocator).toBeVisible();
    }
}