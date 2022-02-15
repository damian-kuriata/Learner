export default class PhraseInputDialog {
  constructor (htmlElements, handlers, originalText="", translatedText="") {
    // htmlElements = [{"elementName": element}]
    this.originalText = originalText;
    this.translatedText = translatedText;

    if (!htmlElements || !handlers) {
      return;
    }

    //HTML
    this.container = htmlElements["container"];
    this.originalTextInput = htmlElements["originalTextInput"];
    this.translatedTextInput = htmlElements["translatedTextInput"];
    this.confirmButton = htmlElements["confirmButton"];
    this.closeButton = htmlElements["closeButton"];
    this.cancelButton = htmlElements["cancelButton"];

    // Handlers
    // Directly connect external handlers to elements.
    this.originalTextInput.onChange = handlers["originalTextInput"];
    this.translatedTextInput.onChange = handlers["translatedTextInput"];
    this.confirmButton.onClick = handlers["confirmButton"];
    this.closeButton.onClick = handlers["closeButton"];
    this.cancelButton.onClick = handlers["cancelButton"];
  }

  // TODO: Write method.
  setInputValues () {
    // Note that once values are set, parent does not receive an event.
    if (all) {
      this.originalTextInput.value = "";
      this.translatedTextInput.value = "";
    } else {
      names.forEach(name => this[name].value = "");
    }
  }

  hide () {
    this.container.classList.add("hidden");
  }

  show () {
    this.container.classList.remove("hidden")
  }
}
