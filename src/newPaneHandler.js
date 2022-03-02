import Phrase from "language_phrase";
import PhraseInputDialog from "./phraseInputDialog";
import hideableMixin from "./hideableMixin";

export default class NewPaneHandler {
  #phraseInputDialog;

  constructor (pane) {
    this.container = pane;
    this.originalText = "";
    this.translatedText = "";

    const handlers = {
      "originalTextInput": (ev) => {this.originalText = ev.target.value},
      "translatedTextInput": (ev) => {this.translatedText = ev.target.value},
      "confirmButton": this.handleConfirmButton,
      "closeButton": this.handleCloseButton,
      "cancelButton": this.handleCancelButton
    };

    this.#phraseInputDialog = new PhraseInputDialog(handlers);
    Object.assign(this.#phraseInputDialog, hideableMixin);
    //this.#phraseInputDialog.show();
  }

  handleConfirmButton (ev) {
    console.log(this.originalText, this.translatedText);
  }
}
