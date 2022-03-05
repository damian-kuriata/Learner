import Phrase from "language_phrase";
import PhraseInputDialog from "./phraseInputDialog";
import Hideable from "./HideableMixin";
import Toast from "./Toast";

class PhraseList  {
  constructor(listElement, onDelete, onEdit) {
    this.listElement = listElement;
    this.onDelete = onDelete;
    this.onEdit = onEdit;
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
        ${idx + 1}.${phrase.originalText}

        </div>
      `;
      // Append edit and delete buttons.
      const editButton = document.createElement("button");
      editButton.classList.add("edit-button");
      editButton.setAttribute("id", "edit" + phraseID);
      editButton.addEventListener("click", (e) => {
        const id = e.target.getAttribute("id").slice(4); // editi<d>
        console.log("Before: ", phrase);
        this.onEdit(phrase);
      });
      editButton.textContent = "Edit";

      const deleteButton = document.createElement("button");
      deleteButton.classList.add("delete-button");
      deleteButton.setAttribute("id", "delete" + phraseID);
      deleteButton.addEventListener("click", () => {
        const id = deleteButton.getAttribute("id").slice(6); // deleteid
        console.log("Delete id: ", id);
        this.onDelete(phrase.id);
      });
      deleteButton.textContent = "X";
      deleteButton.setAttribute("aria-label", "Delete phrase");

      phraseItem.appendChild(editButton);
      phraseItem.appendChild(deleteButton);
      this.listElement.appendChild(phraseItem);
    });
  }
}

export default class ManagePaneHandler extends Hideable {
  constructor (managePane) {
    super();
    this.newOriginalText = "";
    this.newTranslatedText = "";
    this.phraseEdited = null;
    this.searchTerm = "";

    this.container = managePane;
     // Because methods are later passed as callbacks, their this is out of
     // Range, so at first we have to set it to as fixed value.
    this.onNewOriginalTextChange = this.onNewOriginalTextChange.bind(this);
    this.onNewTranslatedTextChange = this.onNewTranslatedTextChange.bind(this);
    this.onPhraseEdit = this.onPhraseEdit.bind(this);
    this.onPhraseDelete = this.onPhraseDelete.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
    this.onClose = this.onClose.bind(this);

    const handlers = {
      "originalTextInput": this.onNewOriginalTextChange,
      "translatedTextInput": this.onNewTranslatedTextChange,
      "closeButton": this.onClose,
      "confirmButton": this.onConfirm,
      // Same as close.
      "cancelButton": this.onClose
    };

    this.phraseList = new PhraseList(document.querySelector(".phrases-list"),
      this.onPhraseDelete, this.onPhraseEdit);

    this.phraseInputDialog = new PhraseInputDialog(handlers);

    this.newButton = document.querySelector("#new-button");
    this.newButton.addEventListener("click", () => {
      this.phraseInputDialog.show();
      // Once the dialog is shown, button must be disabled to prevent
      // Multiple opened dialogs.
      this.newButton.disabled = true;
    });

    this.clearAllButton = document.querySelector("#clear-all-button");
    this.clearAllButton.addEventListener("click", () => {
      // Delete all phrases.
      const all = Phrase.loadFromStorage(true);
      for (let one of all) {
        Phrase.removeFromStorage(one.id);
      }
      this.phraseList.refresh([]);
    });
  }

  onPhraseDelete (id) {
    Phrase.removeFromStorage(id);
    const  phrases = Phrase.loadFromStorage();
    this.phraseList.refresh(phrases);
  }

  // Fired when edit phrase button is clicked
  onPhraseEdit (phrase) {
    this.phraseEdited = phrase;
    console.log("Phrae in edit: ", phrase);
    this.newOriginalText = phrase.originalText;
    this.newTranslatedText = phrase.translatedText;
    this.phraseInputDialog.show();
    this.phraseInputDialog.setOriginalTextValue(phrase.originalText);
    this.phraseInputDialog.setTranslatedTextValue(phrase.translatedText);
  }

  onNewOriginalTextChange (e) {
    console.log("Orig:", e.target.value);
    this.newOriginalText = e.target.value;
  }

  onNewTranslatedTextChange (e) {
    console.log("trans: ", e.target.value);
    this.newTranslatedText = e.target.value;
  }

  onConfirm () {
    console.log(this.newOriginalText);
    console.log(this.newOriginalText, this.newTranslatedText);
    let toSave;
    if (this.phraseEdited) {
      toSave = new Phrase(this.newOriginalText, this.newTranslatedText,
        this.phraseEdited.id);
    } else {
      toSave = new Phrase(this.newOriginalText, this.newTranslatedText);
    }
    console.log("To save: ", toSave);
    Phrase.saveToStorage(toSave);
    const  phrases = Phrase.loadFromStorage();
    this.phraseList.refresh(phrases);
    this.phraseInputDialog.setTranslatedTextValue("");
    this.phraseInputDialog.setOriginalTextValue("");
    this.newOriginalText = "";
    this.newTranslatedText = "";
    //this.#onInputComplete();
  }

  onClose () {
    this.#onInputComplete();
  }

  #onInputComplete () {
    this.phraseInputDialog.hide();
    // Important, clear internal input data.
    this.phraseInputDialog.setTranslatedTextValue("");
    this.phraseInputDialog.setOriginalTextValue("");
    this.newOriginalText = "";
    this.newTranslatedText = "";
    this.newButton.disabled = false;
    this.phraseEdited = null;
  }

  /* -- Override methods from Hideable */
  show (...params) {
    super.show(params);

    // Search term has been passed?
    if (params[0]) {
      this.searchTerm = params[0];
      // Force list refresh.
      const  phrases = Phrase.loadFromStorage();
      console.log(params[0]);
      this.phraseList.refresh( filterPhrases(phrases, this.searchTerm) );
    }
  }
}

function filterPhrases (phrases, searchTerm, caseSensitive=false) {
  // Get all phrases beginning with searchTerm.
  if (phrases instanceof Array === false) {
    throw new Error("Array instance must be passed");
  }
  const res =  phrases.filter((phrase) => {
    // Convert to lower case when needed.
    if (caseSensitive) {
      phrase.originalText = phrase.originalText.toLowerCase();
      phrase.translatedText = phrase.translatedText.toLowerCase();
    }
    if (phrase.originalText.startsWith(searchTerm) ||
        phrase.translatedText.startsWith(searchTerm)) {
          return true;
        }
        return false;
  });

  console.log(res);
  return res;
}
