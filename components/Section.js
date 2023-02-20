export default class Section {
  constructor({ items, renderer }, selector) {
    this._items = items;
    this._renderer = renderer;
    this._selector = selector;
  }

  addItem(item) {
    this._selector.append(this._renderer(item));
  }

  renderer() {
    this._items.forEach((item) => {
      this.addItem(item);
    });
  }
}