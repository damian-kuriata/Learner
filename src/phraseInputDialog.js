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
    this.originalTextInput.value = originalText;
    this.translatedTextInput = htmlElements["translatedTextInput"];
    this.translatedTextInput.value = translatedText;
    this.confirmButton = htmlElements["confirmButton"];
    this.closeButton = htmlElements["closeButton"];
    this.cancelButton = htmlElements["cancelButton"];

    // Handlers
    try {
      // Directly connect external handlers to elements.
      this.originalTextInput.onchange = handlers["originalTextInput"];
      this.translatedTextInput.onchange = handlers["translatedTextInput"];
      this.confirmButton.onclick = handlers["confirmButton"];
      this.closeButton.onclick = handlers["closeButton"];
      this.cancelButton.onclick = handlers["cancelButton"];
    } catch (err) {
      // An exception may be thrown when accessing property that has not been
      // Initialized. Ignore it.
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
    this.translatedTextInput.value = value;
  }
}
