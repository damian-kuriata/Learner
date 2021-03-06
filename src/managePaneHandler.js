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
    this.newGroup = "test";
    this.phraseEdited = null;
    this.searchTerm = "";

    this.container = managePane;
     // Because methods are later passed as callbacks, their this is out of
     // Range, so at first we have to set it to as fixed value.
    this.onNewOriginalTextChange = this.onNewOriginalTextChange.bind(this);
    this.onNewTranslatedTextChange = this.onNewTranslatedTextChange.bind(this);
    this.onGroupChange = this.onGroupChange.bind(this);
    this.onPhraseEdit = this.onPhraseEdit.bind(this);
    this.onPhraseDelete = this.onPhraseDelete.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
    this.onClose = this.onClose.bind(this);

    const handlers = {
      "originalTextInput": this.onNewOriginalTextChange,
      "translatedTextInput": this.onNewTranslatedTextChange,
      "groupInput": this.onGroupChange,
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
      this.clearAllPhrases();
    });

    this.phrasesFileForm = document.querySelector("#file-form");
    this.phrasesFileForm.addEventListener("submit", async (ev) => {
      ev.preventDefault();
      const file = document.querySelector("#phrases-file").files[0];
      // File has not been selected? Pick the last selected file.
      if (!file) {
        const lastFilename = JSON.parse(localStorage.getItem(ManagePaneHandler.localStorageTag))["lastFilename"];
        if (!lastFilename) {
          alert("Select file to open!");
          return;
        } else {
          alert("Last file opened: ", last)
        }
      }
      await this.uploadFromFile(file);
    });

    this.downloadButton = document.querySelector("#download-button");
    this.downloadButton.addEventListener("click", () => {
      this.exportToFile();
    });
  }

  clearAllPhrases () {
    // Delete all phrases.
    const all = Phrase.loadFromStorage(true);
    for (let one of all) {
      Phrase.removeFromStorage(one.id);
    }
    this.phraseList.refresh([]);
  }

  async uploadFromFile (file) {
    let loadedPhrases = [];
    try {
      loadedPhrases = await loadPhrasesFromFile(file);
      // Save to storage.
      for (const phrase of loadedPhrases) {
        Phrase.saveToStorage(phrase);
      }
      this.phraseList.refresh(Phrase.loadFromStorage());
    } catch (error) {
      alert("Problem has been encountered: ", error.toString());
      console.log(error);
    }
  }

  exportToFile () {
    convertToTxtFormat(Phrase.loadFromStorage()).then((txt) => {
      const href =
          "data:text/plain;charset=utf-8," + encodeURIComponent(txt);
      let downloadLink = document.createElement("a");
      downloadLink.setAttribute("href", href);
      downloadLink.setAttribute("download", "downloaded-phrases.txt");
      downloadLink.click();
    }).catch((err) => {
      alert("Unexpected error: ", err.toString());
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
    this.newGroup = phrase.group;
    this.phraseInputDialog.show();
    this.phraseInputDialog.setOriginalTextValue(phrase.originalText);
    this.phraseInputDialog.setTranslatedTextValue(phrase.translatedText);
    this.phraseInputDialog.setGroupValue(phrase.group);
  }

  onNewOriginalTextChange (e) {
    console.log("Orig:", e.target.value);
    this.newOriginalText = e.target.value;
  }

  onNewTranslatedTextChange (e) {
    console.log("trans: ", e.target.value);
    this.newTranslatedText = e.target.value;
  }

  onGroupChange (e) {
    this.newGroup = e.target.value;
    console.log("Group change: ", this);
  }

  onConfirm () {
    console.log("Confirm, this: ", this);
    console.log("Confirm, gtoup: ", this.newGroup);
    let toSave;
    if (this.phraseEdited) {
      toSave = new Phrase(this.newOriginalText, this.newTranslatedText,
        this.phraseEdited.id);
    } else {
      toSave = new Phrase(this.newOriginalText, this.newTranslatedText, null);
    }
    Phrase.saveToStorage(toSave);
    console.log("Save: ", toSave);
    const phrases = Phrase.loadFromStorage();
    console.log("Phrases: ", phrases);
    this.phraseList.refresh(phrases);
    this.phraseInputDialog.setTranslatedTextValue("");
    this.phraseInputDialog.setOriginalTextValue("");
    this.phraseInputDialog.setGroupValue(-1);
    this.newOriginalText = "";
    this.newTranslatedText = "";
    this.newGroup = "";
  }

  onClose () {
    this.#onInputComplete();
  }

  #onInputComplete () {
    this.phraseInputDialog.hide();
    // Important, clear internal input data.
    this.phraseInputDialog.setTranslatedTextValue("");
    this.phraseInputDialog.setOriginalTextValue("");
    this.phraseInputDialog.setGroupValue(-1);
    this.newOriginalText = "";
    this.newTranslatedText = "";
    this.newGroup = -1;
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
  if (!(phrases instanceof Array)) {
    throw new Error("Array instance must be passed");
  }

  return phrases.filter((phrase) => {
    // Convert to lower case when needed.
    if (caseSensitive) {
      phrase.originalText = phrase.originalText.toLowerCase();
      phrase.translatedText = phrase.translatedText.toLowerCase();
    }
    return phrase.originalText.startsWith(searchTerm) ||
        phrase.translatedText.startsWith(searchTerm);
  });
}

async function loadPhrasesFromFile (fileInstance) {
  const separator = ":";

  if (!(fileInstance instanceof File)) {
    throw new Error("File instance must be provided");
  }

  let phrases = [];
  let textContents = await fileInstance.text();
  // For some reason, text sometimes contains '/r' character. Remove it.
  textContents.replaceAll("\r","");
  // For each line.
  for (let line of textContents.split("\n")) {
    if (!line.includes(separator)) {
      // When line is incorrect, go to next one.
      continue;
    }
    let [beforeSep, afterSep] = line.split(separator);
    let originalText = beforeSep.trim();
    let translatedText = afterSep.trim();
    let newPhrase = new Phrase(originalText, translatedText);

    phrases.push(newPhrase);
  }
  return phrases;
}

function convertToTxtFormat (phrases, separator=":") {
  return new Promise((success, reject) => {
    try {
      let result = "";
      for (let phrase of phrases) {
        const line = phrase.originalText + separator + phrase.translatedText;
        result += line + "\n";
      }
      success(result);
    } catch (err) {
      reject(err);
    }
  });
}
