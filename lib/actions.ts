import {By, WebDriver} from "selenium-webdriver";
import {allure} from "allure-mocha/runtime";
import config from "../config";
import MainPage from '../pages/main.page';


export async function clickAndWaitForNewTab(
    selector: string,
    tabName: string,
    driver: WebDriver,
    waitTime: number = 10000,
) {
    let titleName, windowDescriptor, idChromeTab;
    windowDescriptor = await driver.getAllWindowHandles();
    await driver.findElement(By.xpath(selector)).click();
    await driver.wait(
        async () => {
            let handles = await driver.getAllWindowHandles()
            return handles.length > windowDescriptor.length;
        },
        waitTime
    );
    (await driver.getAllWindowHandles()).forEach(handle => {
        if (!windowDescriptor.includes(handle)) {
            idChromeTab = handle;
        }
    });
    await driver.switchTo().window(idChromeTab);
    await driver.wait(
        async () => {
            titleName = await driver.getTitle();
            return tabName.includes(titleName);
        },
        waitTime
    );
}

export async function click(locator, driver: WebDriver, timeout = 5000) {
    let element = await driver.findElement(By.xpath(locator))
    await driver.executeScript("arguments[0].scrollIntoView(true);", element);
    await driver.wait(function () {
        return driver.findElement(By.xpath(locator)).then(function (element) {
            return element.click().then(function () {
                return true;
            }, function () {
                return false;
            })
        }, function () {
            return false;
        });
    }, timeout, 'Timeout waiting for ' + locator.value);
}

export async function acceptCookies(driver: WebDriver){
    await driver.get(config.baseUrl);
    await this.click(MainPage.acceptCookiesButton());
}

export async function addAllureScreenshot(driver: WebDriver) {
    const screenshot = driver.takeScreenshot();
    const screenshotName = `Screenshot - ${generateRandomNumber(6)}`;
    const imageFile = new Buffer(await screenshot, 'base64');
    allure.attachment(screenshotName, imageFile, 'image/png');
}

export function generateRandomNumber(length) {
    return Math.floor(Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1));
}