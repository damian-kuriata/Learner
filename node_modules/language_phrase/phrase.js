import { v4 as uuid } from "uuid";

function replaceCharacters (text) {
  // Array of objects in format {toReplace, replacer}
  const rules = [
    // Polish letters
    {"ą":"a"},
    {"ę":"e"},
    {"ź":"z"},
    {"ż":"z"},
    {"ć":"c"},
    {"ń":"n"},
    {"ł":"l"},
    {"ó":"o"},
    {"ś":"s"},
    // German letters
    {"ä":"ae"},
    {"ö":"oe"},
    {"ü":"ue"},
    {"ß":"ss"},
    // Other characters
    {".":""}
  ];

  rules.forEach(rule => {
    const [toReplace, replacer] = Object.keys(rule);
    text = text.replaceAll(toReplace, replacer);
  });

  return text;
}
export default  class Phrase {
  constructor(originalText, translatedText, id = null) {
    this.originalText = originalText;
    this.translatedText = translatedText;
    this.id = id ?? uuid().toString().substr(0, 5);
  }

  checkTranslation(translation, direction) {
    translation = translation.toLowerCase().trim();
    translation = replaceCharacters(translation);
    if (direction !== "to" && direction !== "from") {
      throw new Error("Wrong direction");
    }
    let tmp = this;
    // Replace german letters
    tmp.translatedText = tmp.translatedText.toLowerCase().trim();
    tmp.translatedText = replaceCharacters(tmp.translatedText);

    tmp.originalText = tmp.originalText.toLowerCase().trim();
    tmp.originalText = replaceCharacters(tmp.originalText);

    if (direction === "to") {
      return translation === tmp.originalText;
    } else {
      return translation === tmp.translatedText;
    }
  }

  static localStorageTag = "learner_data";

  static loadFromStorage(all=true, phraseId=null) {
    let data = JSON.parse(localStorage.getItem(Phrase.localStorageTag));
    if (!data || data.length === 0) {
      // When data does not yet exist (script fruns for first time for example)
      return [];
    }

    let phrases = data;
    if ((phrases instanceof Array) === false) {
      // Only instances of Array can be retrieved.
      throw new Error("Data must be array!");
    }
    let allPhrases = phrases.map(phraseData => {
      return new Phrase(phraseData.originalText,
        phraseData.translatedText, phraseData.id);
      });
    if (all) {
      // Get all phrases from storage. Note that "phraseId" param. is ignored
      return allPhrases;
    }
    if (phraseId) {
      // Load particular phrase with id from memory.
      return allPhrases.find(phrase =>{ return phrase.id === phraseId});
    }

    // When phraseId is false, just  get random phrase in range [0, max - 1]
    const max = allPhrases.length, min = 0;
    let randomIndex = Math.floor(Math.random() * (max - min) + min);;

    // Make sure prevIndex is different from randomIndex.
    /*
    do {
      randomIndex = Math.floor(Math.random() * (max - min) + min);
    } while (Phrase.loadFromStorage.prevIndex === randomIndex);

    Phrase.loadFromStorage.prevIndex = randomIndex;*/
    return allPhrases[randomIndex];
  }

  /* This function saves phrase instance to local storage.
    When given phrase already exists in local storage, its replaced. */
  static saveToStorage(phraseInstance) {
    if (!(phraseInstance instanceof Phrase)) {
      throw new Error("Instance of Phrase required!");
    }
    let currentPhrases = Phrase.loadFromStorage();
    let phraseExists = false;
    for (let idx = 0; idx < currentPhrases.length; idx++) {
      if (currentPhrases[idx].id === phraseInstance.id) {
        // If phrase already exists, replace it.
        currentPhrases[idx].originalText = phraseInstance.originalText;
        currentPhrases[idx].translatedText = phraseInstance.translatedText;
        phraseExists = true;
      }
    }
    // When phrase does not yet exist, create new one.
    if (!phraseExists) {
      currentPhrases.push(phraseInstance);
    }

    // Update local storage.
    let serialized = JSON.stringify(currentPhrases);
    localStorage.setItem(Phrase.localStorageTag, serialized);
  }
  static removeFromStorage(phraseId) {
    // Removes phrase with given id, throws an error when does not exist.
    let phrases = Phrase.loadFromStorage();
    let indexToRemove = phrases.findIndex(ph => ph.id === phraseId);
    if (indexToRemove === -1) {
      // -1 means that id was not found
      throw new Error("Phrase not found");
    }
    phrases.splice(indexToRemove, 1);
    // Refresh local storage
    localStorage.setItem(Phrase.localStorageTag, JSON.stringify(phrases));
  }
}
