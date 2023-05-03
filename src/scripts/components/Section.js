export class Section{
  constructor({ renderer }, container) {
    this._renderer = renderer;
    this._container = container;
  }
  addItem(element) {
    this._container.prepend(element);
  }

  renderItems(items) {
    items.reverse().forEach((item) => this._renderer(item)
    );
  }
}