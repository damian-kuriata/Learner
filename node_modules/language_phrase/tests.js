import Phrase from "./phrase.js";
console.log("Hello test");
let phrase = new Phrase("orig,other", "tran", null, -1);
let phrase2 = new Phrase("orig2","tran2", null, 0);
let phrase3 = new Phrase("orig3", "tran3", null, "test");
let phrase4 = new Phrase("orig4", "tran4", null, "test");
Phrase.saveToStorage(phrase);
Phrase.saveToStorage(phrase2);
Phrase.saveToStorage(phrase3);
Phrase.saveToStorage(phrase4);

for (let o of Phrase.loadFromStorage()) {console.log(o);}