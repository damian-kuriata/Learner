export default class Hideable {
  constructor () {
    if (this.constructor === Hideable) {
      throw new Error("Cannot instantiate abstract class");
    }
    this.hiddenClassName = "hidden";
  }

  hide (...params) {
    if (!(this.container instanceof Element)) {
      const msg = "In order to use hide and show, container property must be Element.";
      throw new Error(msg);
    }
    this.container.classList.add(this.hiddenClassName);
  }

  show (...params) {
    if (!(this.container instanceof Element)) {
      const msg = "In order to use hide and show, container property must exist.";
      throw new Error(msg);
    }
    this.container.classList.remove(this.hiddenClassName);
  }
}
