import Phrase from "language_phrase";
import ManagePaneHandler from "./managePaneHandler";

class LearnPaneHandler {
  constructor(learnPane) {
    this.pane = learnPane;
    this.shouldLoadNext = false;
    this.currentPhrase = null;
    this.translationDirection;
    this.translatedPhrase = document.querySelector("#translatedPhrase");
    this.learnPhraseInput = document.querySelector("#learnPhraseInput");
    this.resultText = document.querySelector("#resultText");
    this.checkButton =
      document.querySelector("#checkBtn");
    this.checkButton.addEventListener("click", () => {
      this.checkInput();
    });
    this.nextButton = document.querySelector("#nextButton");
    this.nextButton.addEventListener("click", () => {
      this.processOnePhrase();
    });
    /*
    document.body.addEventListener("click", () => {
        console.log("anywhere");
      if (this.shouldLoadNext) {
        console.log("anywhere");
        this.startLearning();
        this.shouldLoadNext = false;
      }
    });
    */
  }

  /* This method obtains phrase from storage and updates relevant fields. */
  processOnePhrase() {
    this.shouldLoadNext = false;
    this.nextButton.classList.add("nodisplay");
    this.learnPhraseInput.value = "";
    this.resultText.textContent = "";
    ///this.checkButton.disabled = false;
    this.translationDirection = Math.floor(Math.random() * (1 - 0 + 1)) + 0;
    this.translationDirection = this.translationDirection === 0? "to":"from";
    // Obtain next phrase random.
    this.currentPhrase = Phrase.loadFromStorage(false);
    // Empty array means that no phrases exist.
    console.log("Current: ", this.currentPhrase);
    if (this.currentPhrase === []) {
      this.resultText.textContent = "At first add phrases!";
      this.currentPhrase = null;
      return;
    }
    if (this.translationDirection === "to") {
      this.translatedPhrase.textContent = this.currentPhrase.translatedText;
    } else {
      this.translatedPhrase.textContent = this.currentPhrase.originalText;
    }
  }

  stopLearning() {
    currentPhrase = null;
  }

  /* Obtains value from input and calls appropriate method depending on
     value was correct or not.
  */
  checkInput () {
    let userTranslation = this.learnPhraseInput.value;
    let correct =
      this.currentPhrase.checkTranslation(userTranslation,
        this.translationDirection);
    if (correct) {
      this.#onCorrectInput();
    } else {
      this.#onIncorrectInput();
    }
  }

  #onCorrectInput () {
    this.resultText.textContent = "Correct";
    this.resultText.classList.add("feedbackCorrect");
    setTimeout(this.processOnePhrase, 2000);
  }

  #onIncorrectInput () {
    this.resultText.textContent = "Wrong, correct answer: ";
    if (this.translationDirection === "to") {
      this.resultText.textContent += this.currentPhrase.originalText;
    } else {
      this.resultText.textContent += this.currentPhrase.translatedText;
    }
    this.resultText.classList.add("feedbackTryAgain");
    this.nextButton.classList.remove("nodisplay");
    this.nextButton.classList.add("displayBlock");
    this.shouldLoadNext = true;
  }

  show () {
    this.pane.classList.remove("inactivePane");
  }

  hide () {
    this.pane.classList.add("inactivePane");
  }
}
let learnButton = document.querySelector("#learnBtn");
let manageButton = document.querySelector("#manageBtn");
let checkButton = document.querySelector("#checkBtn");
let learnPane = document.querySelector("#learnPane");
let managepane = document.querySelector("#managePane");

let learning = new LearnPaneHandler(learnPane);
let manage = new ManagePaneHandler(managePane);

learnButton.addEventListener("click", () => {
  learning.show();
  manage.hide();
  learnButton.classList.add("activeNavBtn");
  manageButton.classList.remove("activeNavBtn");

  learning.processOnePhrase();
});

manageButton.addEventListener("click", () => {
  manage.show();
  learning.hide();
  manageButton.classList.add("activeNavBtn");
  learnButton.classList.remove("activeNavBtn");
});

learning.processOnePhrase();
