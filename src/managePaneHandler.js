import Phrase from "language_phrase";
import EditPhraseDialog from "./editPhraseDialog";

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
          <span style="font-weight: bold">${idx}. </span>
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
    this.pane = managePane;
    this.phraseList = new PhraseList(document.querySelector("#phrasesList"));
    this.phraseList.onPhraseDelete = (id) => {
      Phrase.removeFromStorage(id);
      this.phraseList.refresh(Phrase.loadFromStorage());
    };
    this.newButton = document.querySelector("#managePane > button");
    this.newButton.addEventListener("click", () => {
      // Do something in future...
      console.log("New");
    })
    //this.editPhraseDialog = new EditPhraseDialog();
  }

  show () {
    this.pane.classList.remove("inactivePane");
    console.log("Storage: ", Phrase.loadFromStorage());
    this.phraseList.refresh(Phrase.loadFromStorage());
  }

  hide () {
    this.pane.classList.add("inactivePane");
  }
}
