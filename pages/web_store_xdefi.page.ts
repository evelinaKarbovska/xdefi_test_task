import {Page} from './page';

class WebStoreXdefiPage extends Page {

  constructor() {
    super();
  }

  titleChromeWebStorePage(): string {
    return `.e-f-w-Va > h1`
  }
}

export default new WebStoreXdefiPage();