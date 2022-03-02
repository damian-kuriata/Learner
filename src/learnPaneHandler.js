import Phrase from "language_phrase";

export default class LearnPaneHandler {
  constructor(learnPane) {
    // Important, hide() and show() methods are inherited, and they require
    // property named "container" to work.
    this.container = learnPane;
    this.currentPhrase = null;
    this.translationDirection;
    this.translatedPhrase = document.querySelector("#translated-phrase");
    this.learnPhraseInput = document.querySelector("#learn-phrase-input");
    this.resultText = document.querySelector("#result-text");
    this.checkButton =
      document.querySelector("#check-btn");

    this.checkButton.addEventListener("click", () => {
      if (this.currentPhrase) {
        this.checkInput();
      }
    });
    this.nextButton = document.querySelector("#next-btn");
    this.nextButton.addEventListener("click", () => {
      this.processOnePhrase();
    });
  }

  /* This method obtains phrase from storage and updates relevant fields. */
  processOnePhrase() {
    this.learnPhraseInput.value = "";
    this.resultText.textContent = "";
    this.translationDirection = Math.floor(Math.random() * (1 - 0 + 1)) + 0;
    this.translationDirection = this.translationDirection === 0? "to":"from";
    // Obtain next phrase random.
    this.currentPhrase = Phrase.loadFromStorage(false);
    // Array instance is returned in case of empty data.
    if (this.currentPhrase instanceof Array) {
      this.translatedPhrase.textContent = "At first add phrases!";
      this.currentPhrase = null;
      return;
    }
    if (this.translationDirection === "to") {
      this.translatedPhrase.textContent =
        this.currentPhrase.translatedText;
    } else {
      this.translatedPhrase.textContent =
        this.currentPhrase.originalText;
    }
  }

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
    this.processOnePhrase();
  }

  #onIncorrectInput () {
    this.resultText.textContent = "Wrong, correct answer: ";
    if (this.translationDirection === "to") {
      this.resultText.textContent += this.currentPhrase.originalText;
    } else {
      this.resultText.textContent += this.currentPhrase.translatedText;
    }
    this.resultText.classList.add("feedback-incorrect");
  }
}
