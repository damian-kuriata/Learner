const hideableMixin = {
  hiddenClassName: "hidden",

  hide () {
    if (!(this.container instanceof Element)) {
      const msg = "In order to use hide and show, container property must be Element.";
      throw new Error(msg);
    }
    this.container.classList.add(this.hiddenClassName);
  },

  show () {
    if (!(this.container instanceof Element)) {
      const msg = "In order to use hide and show, container property must exist.";
      throw new Error(msg);
    }
    this.container.classList.remove(this.hiddenClassName);
  }
}

export default hideableMixin;
