import {Page} from './page';

class ArticleCoinPage extends Page {

  constructor() {
    super();
  }

  titleArticlePage(): string {
    return `//h1[@class='hkb-article__title']`
  }
}

export default new ArticleCoinPage();