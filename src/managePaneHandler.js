import Phrase from "language_phrase";
import PhraseInputDialog from "./phraseInputDialog";

class PhraseList {
  constructor(listElement) {
    this.listElement = listElement;
    this.refresh(Phrase.loadFromStorage());
  }

  refresh(phrases) {
    this.phrases = phrases;
    // At first remove previous phrases.
    while (this.listElement.firstChild) {
      this.listElement.removeChild(this.listElement.firstChild);
    }

    this.phrases.forEach((phrase, idx) => {
      // Update HTML document.
      let phraseItem = document.createElement("li");
      const phraseID = phrase.id;
      phraseItem.setAttribute("id", "phrase" + phraseID);
      phraseItem.innerHTML = `
        <div>
          <span style="font-weight: bold">${idx + 1}. </span>
          <span>${phrase.originalText}</span>
        </div>
      `;
      // Append edit and delete buttons.
      const editButton = document.createElement("button");
      editButton.classList.add("editButton");
      editButton.setAttribute("id", "edit" + phraseID);
      editButton.addEventListener("click", () => {
        console.log("edit");
      });
      editButton.textContent = "Edit";

      const deleteButton = document.createElement("button");
      deleteButton.classList.add("deleteButton");
      deleteButton.setAttribute("id", "delete" + phraseID);
      deleteButton.addEventListener("click", () => {
        // This method will be called only when exists.
        // Likely this method will be assigned outside of an object.
        if (this.onPhraseDelete) {
          const id = deleteButton.getAttribute("id").slice(6); // deleteid
          console.log("Trying to delete: ", id);
          this.onPhraseDelete(id);
        }
      });
      deleteButton.textContent = "X";
      deleteButton.setAttribute("aria-label", "Delete phrase");

      phraseItem.appendChild(editButton);
      phraseItem.appendChild(deleteButton);
      this.listElement.appendChild(phraseItem);
    });
  }
}

export default class ManagePaneHandler {
  constructor (managePane) {
    this.newOriginalText = "";
    this.newTranslatedText = "";

    this.pane = managePane;
     // Because methods are later passed as callbacks, their this is out of
     // Range, so at first we have to set it to as fixed value.
    this.onNewOriginalTextChange = this.onNewOriginalTextChange.bind(this);
    this.onNewTranslatedTextChange = this.onNewTranslatedTextChange.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
    this.onClose = this.onClose.bind(this);

    this.newPhraseDialog = new PhraseInputDialog();
    this.newPhraseDialog.hide();
    this.newPhraseDialog.onOriginalTextInputChange(this.onNewOriginalTextChange);
    this.newPhraseDialog.onTranslatedTextInputChange(this.onNewTranslatedTextChange);
    this.newPhraseDialog.onClose(this.onClose);
    this.newPhraseDialog.onConfirm(this.onConfirm);

    this.phraseList = new PhraseList(document.querySelector("#phrasesList"));
    this.phraseList.onPhraseDelete = (id) => {
      Phrase.removeFromStorage(id);
      this.phraseList.refresh(Phrase.loadFromStorage());
    };

    this.newButton = document.querySelector("#managePane > button");
    this.newButton.addEventListener("click", () => {
      this.newPhraseDialog.show();
    });
  }

  onNewOriginalTextChange (value) {
    console.log(value);
    this.newOriginalText = value;
  }

  onNewTranslatedTextChange (value) {
    this.newTranslatedText = value;
  }

  onConfirm () {
    const newPhrase = new Phrase(this.newOriginalText, this.newTranslatedTex);
    Phrase.saveToStorage(newPhrase);
    this.phraseList.refresh(Phrase.loadFromStorage());
    this.newOrignalText = "",
    this.newTranslatedText = "";
  }

  onClose () {
    this.newOriginalText = "";
    this.newTranslatedText = "";
  }

  show () {
    this.pane.classList.remove("inactivePane");
    this.phraseList.refresh(Phrase.loadFromStorage());
  }

  hide () {
    this.pane.classList.add("inactivePane");
  }
}
