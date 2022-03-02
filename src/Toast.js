export default class Toast {
  #text;

  constructor (text, autoShow=true, timeoutMillis=10000) {

    this.container = document.querySelector("#toast");
    console.log(this.container);
    this.#text = text;
    this.container.textContent = text;
    this.shown = false;
    if (autoShow) {
      this.show();
    }
    this.timeout = timeoutMillis;

    // Because it will be called by external function.

  }

  show () {
    if (this.shown) {
      // Must wait till disappears.
      return;
    }
    this.shown = true;
    this.container.classList.add("toast-shown");
    console.log("show");
    setTimeout(this.onTimeout.bind(this), 10000);
  }

  onTimeout () {
    console.log("timeout");
    this.container.classList.remove("toast-shown", this.timeout);
    this.shown = false;
  }

  set text (val) {
    this.#text = val;
    this.container.textContent = val;
  }

  get text () {
    return this.#text;
  }
}
