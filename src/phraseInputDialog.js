export default class PhraseInputDialog {
  constructor ()
  constructor (originalText="", translatedText="") {
    this.container = document.querySelector(".phraseInputDialog");
    this.originalTextInput = document.querySelector("#originalTextInput");
    this.translatedTextInput = document.querySelector("#translatedTextInput");
    this.closeButton = document.querySelector("#editCloseButton");
    this.confirmButton = document.querySelector("#editConfirmButton");

    // Set default input values
    this.originalTextInput.value = originalText;
    this.translatedTextInput.value = translatedText;
  }

  onOriginalTextInputChange (callback) {
    this.originalTextInput.addEventListener("input", () => callback(this.originalTextInput.value));
  }

  onTranslatedTextInputChange (callback) {
    this.translatedTextInput.addEventListener("input", () => callback( this.translatedTextInput.value));
  }

  onClose (callback, autoClose=true, autoClear=true) {
    // TODO: Errors here.
    if (callback) {
      this.closeButton.addEventListener("click", () => {
        //const [callback, autoClose, autoClear] = parentParams;
        console.log("auto close:", autoClose, autoClear);
        if (autoClose) {
          this.hide();
          console.log("this hide");
        }
        if (autoClear) {
          this.clearInputData();
        }
        callback();
      });
    }
  }

  onConfirm (callback, autoClose=true, autoClear=true) {
    if (callback) {
        this.confirmButton.addEventListener("click", () => {
          if (autoClose) {
            this.hide();
          }
          if (autoClear) {
            this.clearInputData();
          }
          callback();
        });
    }
  }

  show () {
    this.container.classList.add("displayAbsolute");
    this.container.classList.remove("nodisplay");
  }

  hide () {
    console.log("Call hide");
    this.container.classList.add("nodisplay");
    this.container.classList.remove("displayAbsolute");
  }

  clearInputData (inputName=null) {
    // Note that this function does not trigger onChange callbacks,
    // So values on parent component must be set manually.
    if (!inputName) {
      // Clear all inputs
      this.originalTextInput.value = "";
      this.translatedTextInput.value = "";
    } else if (inputName === "original") {
      this.originalTextInput.value = "";
    } else if (inputName === "translated") {
      this.translatedTextInput = "";
    } else {
      throw new Error("Unknown input name");
    }
  }
}
