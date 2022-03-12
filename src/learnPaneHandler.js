import Phrase from "language_phrase";
import Hideable from "./HideableMixin";

export default class LearnPaneHandler extends Hideable {
  constructor(learnPane) {
    super();
    // Important, hide() and show() methods are inherited, and they require
    // property named "container" to work.
    this.container = learnPane;
    this.currentPhrase = null;
    this.phrasesToOmit = [];
    this.phraseScores = {};
    this.maxPhraseScores = 5;
    this.translationDirection = null;
    this.translatedPhrase = document.querySelector("#translated-phrase");
    this.learnPhraseInput = document.querySelector("#learn-phrase-input");
    this.resultText = document.querySelector("#result-text");
    this.checkButton =
      document.querySelector("#check-btn");
    this.scoreCounter = document.querySelector("#score-counter");
    this.scoreCounter.textContent = "0";

    this.checkButton.addEventListener("click", () => {
      if (this.currentPhrase) {
        this.checkInput();
      }
    });
    // Enter key support.
    this.learnPhraseInput.addEventListener("keyup", (ev) => {
      if (this.currentPhrase && ev.keyCode === 13) {
        this.checkInput();
        ev.preventDefault();
      }
    });

    this.nextButton = document.querySelector("#next-btn");
    this.nextButton.addEventListener("click", () => {
      this.processOnePhrase();
    });

    this.omitButton = document.querySelector("#omit-btn");
    this.omitButton.addEventListener("click", () => {
      if (!this.currentPhrase) {
        return;
      }
      const allAvailable = Phrase.loadFromStorage();
      if (this.phrasesToOmit.length >= allAvailable.length - 1) {
        alert("You cannot omit the only phrase!");
      } else {
        this.phrasesToOmit.push(this.currentPhrase);
        this.processOnePhrase();
      }
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
    const allAvailable = Phrase.loadFromStorage();
    // Array instance is returned in case of empty data.
    if (this.currentPhrase instanceof Array) {
      this.translatedPhrase.textContent = "At first add phrases!";
      this.currentPhrase = null;
      return;
    }

    // Check if this phrase should be omitted. If so, call self again.
    console.log(this.currentPhrase);
    const toOmit =
      this.phrasesToOmit.findIndex(ph => ph.id === this.currentPhrase.id) !== -1;
    if (toOmit) {
      this.processOnePhrase();
    }
    if (!this.phraseScores[this.currentPhrase.id]) {
      this.phraseScores[this.currentPhrase.id] = 0;
    }
    this.scoreCounter.textContent = this.phraseScores[this.currentPhrase.id];
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
    // Create new field if necessary

    this.phraseScores[this.currentPhrase.id]++;
    if (this.phraseScores[this.currentPhrase.id] === this.maxPhraseScores) {
      this.phrasesToOmit.push(this.currentPhrase);
    }
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
