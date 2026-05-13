import {expect, Locator} from "@playwright/test";

export class Select {
    readonly selectLocator: Locator;

    constructor(selectLocator: Locator) {
        this.selectLocator = selectLocator;
    }

    async selectOption(value: string): Promise<void> {
        await this.selectLocator.selectOption(value);
    }

    async checkSelectVisible(): Promise<void> {
        await expect(this.selectLocator).toBeVisible();
    }
}