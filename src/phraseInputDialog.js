import hideableMixin from "./HideableMixin";

export default class PhraseInputDialog {
  #handlers;
  #inEdit;

  constructor (handlers, originalText="", translatedText="") {
    this.originalText = originalText;
    this.translatedText = translatedText;
    this.#handlers = handlers;
    this.#inEdit = false;


    if (!handlers) {
      return;
    }

    //HTML
    this.container = document.querySelector("#phrase-input-dialog");
    this.originalTextInput = document.querySelector("#original-text-input");
    this.translatedTextInput = document.querySelector("#translated-text-input");
    this.confirmButton = document.querySelector(".dialog-confirm-btn");
    this.cancelButton = document.querySelector(".dialog-cancel-btn");
    this.closeButton = document.querySelector(".dialog-close-btn");
    this.originalTextInput.value = originalText;
    this.translatedTextInput.value = translatedText;

    for (let handlerName in handlers) {
      if (!this[handlerName]) continue;
      if (this[handlerName] instanceof HTMLButtonElement) {
        this[handlerName].onclick = handlers[handlerName];
      } else {
        this[handlerName].onchange = handlers[handlerName];
        console.log(this[handlerName]);
      }
    }
  }

  setOriginalTextValue (value) {
    if (!this.originalTextInput) {
      throw new Error("No text input present");
    }
    this.originalText = value;
    this.originalTextInput.value = value;
  }

  setTranslatedTextValue (value) {
    if (!this.translatedTextInput) {
      throw new Error("No text input present");
    }
    this.translatedText = value;
    this.translatedTextInput.value = value
  }

  destroy () {
    for (let elemName in this) {
      // Container does not have event handlers attached.
      if (elemName === "container") {
        continue;
      }
      let ev;
      if (elemName.endsWith("Input")) {
        ev = "change";
      } else if (elemName.endsWith("Button")) {
        ev = "click";
      }
      this[elemName].removeEventListener(ev, this.#handlers[elemName]);
    }
  }

  set inEdit (val) {
    this.#inEdit = val;
  }

  get inEdit () {
    return this.#inEdit;
  }
}
