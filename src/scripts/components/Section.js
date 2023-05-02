export class Section{
  constructor({ renderer }, container) {
    this._renderer = renderer;
    this._container = container;
  }
  addItem(items) {
    this._container.prepend(items);
  }

  renderItems(element) {
    element.reverse().forEach((item) => this._renderer(item)
    );
  }
}