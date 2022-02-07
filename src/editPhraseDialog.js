export default class EditPhraseDialog {
  constructor (originalText, translatedText) {
    this.container = document.querySelector("#editPhraseDialog");
    this.originalTextInput = document.querySelector("#editOriginalInput");
    this.translatedTextInput = document.querySelector("#editTranslatedInput");
    this.editCloseButton = document.querySelector("#editCloseButton");
    this.editConfirmButton = document.querySelector("#editConfirmButton");

    // Set default input values
    this.originalTextInput.value = originalText;
    this.translatedTextInput.value = translatedText;
  }

  onOriginalTextInputChange (callback) {
    const current = this.originalTextInput.value;
    this.originalTextInput.addEventListener("input", () => callback(current));
  }

  onTranslatedTextInputChange (callback) {
    const current = this.translatedTextInput.value;
    this.translatedTextInput.addEventListener("input", () => callback(current));
  }

  setVisible (visible=true) {
    if (visible) {
      this.container.classList.add("displayAbsolute");
      this.container.classList.remove("nodisplay");
    } else {
      this.container.classList.remove("displayAbsolute");
      this.container.classList.add("nodisplay");
    }
  }

  onClose (callback) {
    this.editCloseButton.addEventListener("click", callback);
  }

  onConfirm (callback) {
    this.editConfirmButton.addEventListener("click", callback);
  }
}
