import {Page} from './page';
import config from "../config";

class MainPage extends Page {

    constructor() {
        super();
        this.setUrl(`${config.baseUrl}/`);
    }

    acceptCookiesButton(): string {
        return `//a[@id="wt-cli-accept-all-btn"]`
    }

    getBlockchainCarouselItem(item: string): string {
        return `//div[@class='blockchain-carousel__canvas']/div[@class='blockchain-carousel__item has-tooltip ']//img[@alt='${item}']`
    }

    getBlockchainCarouselLink(item: string): string {
        return `${this.getBlockchainCarouselItem(item)}//ancestor::node()[1]`
    }

    installXDEFIButton(): string {
        return `//div[@class='site-header__utility']//div//a`
    }
}

export default new MainPage();