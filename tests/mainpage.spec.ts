import {blockchainCarouselItems} from "../fixtures/mainpage";
import {blockchainItemTitles} from "../fixtures/article_coins";
import ArticleCoinPage from '../pages/article_coin.page';
import MainPage from '../pages/main.page';
import WebStoreXdefiPage from '../pages/web_store_xdefi.page';
import {Builder, By, WebDriver} from "selenium-webdriver";
import {expect} from "chai";
import config from "../config";
import {extensionTabName, webStoreChromeExtensionXdefiUrl, xdefiWebStoreTitle} from "../fixtures/web_store_xdefi";
import {allure} from "allure-mocha/runtime";
import {acceptCookies, addAllureScreenshot, click, clickAndWaitForNewTab} from "../lib/actions";


let driver: WebDriver;

describe('describe', function () {

    before(async () => {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.manage().setTimeouts({implicit: 10000});
        await acceptCookies(driver);
    });

    beforeEach(async () => {
        await driver.get(config.baseUrl);
    })

    after(async () => {
        await driver.quit()
    })

    let buttons = Object.keys(blockchainCarouselItems);
    for (const blockchainObj of buttons) {
        let blockchain = blockchainCarouselItems[blockchainObj];
        it(`Check ${blockchain.name} button on carousel of supported blockchains`, async () => {
            allure.logStep(`Check ${blockchain.name} button`);
            await addAllureScreenshot(driver);
            let selector = MainPage.getBlockchainCarouselLink(blockchain.name)
            allure.logStep(`Check ${blockchain.name} link`)
            await expect(await driver.findElement(By.xpath(selector))
                .getAttribute('href')).to.be.equal(blockchain.link);
            allure.logStep(`Check ${blockchain.name} icon link`)
            await expect(await driver.findElement(By.xpath(MainPage.getBlockchainCarouselItem(blockchain.name)))
                .getAttribute('src')).to.be.equal(blockchain.iconLink);
            allure.logStep(`Click on ${blockchain.name} button`)
            await click(selector, driver)
            allure.logStep(`Check ${blockchain.name} article url`)
            await expect(await driver.getCurrentUrl()).to.be.equal(blockchain.link);
            allure.logStep(`Check ${blockchain.name} article title`)
            await addAllureScreenshot(driver)
            await expect(
                await driver.findElement(By.xpath(ArticleCoinPage.titleArticlePage())).getText(),
                `Article title should be equal to ${blockchainItemTitles.get(blockchain.name)}`,
            ).to.be.equal(blockchainItemTitles.get(blockchain.name));
        })
    }

    it('Check if user can navigate to extension page on chrome store', async () => {
        allure.logStep(`Wait for new tab visible after click`);
        await clickAndWaitForNewTab(MainPage.installXDEFIButton(), extensionTabName, driver);
        allure.logStep(`Check new url`);
        await expect(await driver.getCurrentUrl()).to.be.equal(webStoreChromeExtensionXdefiUrl);
        allure.logStep(`Check title on chrome store page`);
        await expect(await driver.findElement(By.css(WebStoreXdefiPage.titleChromeWebStorePage())).getText()).to.be.equal(xdefiWebStoreTitle);
        await addAllureScreenshot(driver)
    })
});


