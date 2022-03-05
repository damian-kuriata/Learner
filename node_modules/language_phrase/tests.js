import Phrase from "./phrase.js";

let phrase = new Phrase("orig", "tran");
Phrase.saveToStorage(phrase);
Phrase.loadFromStorage();