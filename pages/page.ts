export interface NewablePage<T extends Page> {
  new(): T;
}

export abstract class Page {
  private url: string;

  protected setUrl(url: string) {
    this.url = url;
  }
}
